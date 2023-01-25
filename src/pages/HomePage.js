import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Button, Card, CardActions, CardContent, CardMedia} from '@mui/material';
import { Col,Row } from 'reactstrap';
import Pagination from '../components/Pagination';
import Img1 from '../Image/Img1.jpg';

const HomePage = () => {
  
  const [books, setBooks] = useState([]);
  const [login, setLogin] = useState(false);
  const [showPerPage, setShowPerPage] = useState(5);
  const [pagination, setPagination] = useState({ start:0, end:showPerPage})
  const [search, setSearch]= useState("");
  

  const onPaginationChange =(start,end)=>{
    setPagination({start:start,end:end})
  }
 
  useEffect(() =>{

    fetchBooks();
    console.log(books);

    if (localStorage.getItem("token") === null) {
      setLogin(false)
      console.log(localStorage.getItem("token"))
    } else {
      setLogin(true)
      console.log(localStorage.getItem("token"))
    }
  }, [])

 

  const fetchBooks = () =>{
    axios.get("http://localhost:8085/BooksPage/Show All Books Data")
    .then((Response) => {
      setBooks(Response.data.obj)
      console.log(Response.data.obj)
    
    }, [books])

    
  }
    const addtoCart =(bookId)=>{
      if(login){
      console.log(bookId);
      axios.post(`http://localhost:8085/CartPage/AddToCart?bookId=${bookId}&token=${localStorage.getItem("token")}`)
      .then((Response) => {
        console.log(Response.data.message);
        console.log(Response);
      })
      .catch((Error) => {
        console.log(Error.Response.data);
        console.log(Error);
      });
      } 
      else {
       console.log("Please Login to buy Book.");
      }

    }
    const sortHandler=(e)=>{
      if(e.target.value==='as'){
        const sortlist =[...books].sort((a,b)=>a.price>b.price ? 1:-1)
        console.log("as",sortlist)
        setBooks(sortlist)
      }
      if(e.target.value==='ds'){
        const sortlist =[...books].sort((a,b)=>a.price<b.price ? 1:-1)
        console.log("ds",sortlist)
        setBooks(sortlist)
      }
 }

  return (

    <>
    <Header/>
    <h1 className="heading">Sort By</h1>
          <select onChange={sortHandler}>
            <option >please choice</option>
            <option value="as">low to high</option>
            <option value="ds">high to low</option>
          </select>
 <hr/>
    <input type="text" id='myInput' placeholder="Search for Book.." title="Type in a name" onChange={(event) => {setSearch(event.target.value)}}/>

        <div className='containerbody'>
        <div className='container'>
          <div className='cardcontainer'>
          <Row>
            {
                books.length>0 ? books.filter(book => {
                  if (search === " ") {
                    return book;
                  } else if (book.bookName.toLowerCase().includes(search) || book.authorName.toLowerCase().includes(search) ){
                    return book;
                  }
                }).slice(pagination.start,pagination.end).map((book) => {
                return (
                  <Col key={book.bookId} md={3} style={{marginTop:"10px", marginBottom:"10px"}}>
                  <Card className='card' sx={{ maxWidth: 300 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={Img1}
                      alt="Image Not Available"
                      sx={{ objectFit: "contain" }}
                    ></CardMedia>

                    {book.bookQuantity === 0 &&
                      <h1 className='content'>Out of Stock</h1>
                    }

                    <CardContent className="cardcontent">
                      <label className='cardtitle'>
                        {book.bookName}
                      </label><br />

                      <label className='authorname'>
                        by {book.authorName}
                      </label><br />

                      <label className='cardtitle'>
                        Rs. {book.price}
                      </label>
                    </CardContent>
                    
                    <CardActions>
                    <Button onClick={() => addtoCart(book.bookId)} size="small" variant="contained">Add To Cart</Button>
                      <Button  variant="outlined" size="small">WishList</Button>
                    </CardActions>
                  </Card>
                  </Col>
                )
              }): "No books Available"
            }
            </Row>
          </div>
          <div className='pagination'>
          <Pagination showPerPages={showPerPage} onPagination={onPaginationChange} totalPage={books.length}/>
          </div>
        </div>
      </div>
     
    
    
    </>
  )

}


export default HomePage;