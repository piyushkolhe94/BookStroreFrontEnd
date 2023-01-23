import React, { useEffect, useState } from 'react'
import { Button, Card, CardActions, CardContent, CardMedia } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const CartBook = () => {

    const navigate = useNavigate();
    const [cartBooks, setCartBooks] = useState([])
    const [totalCartAmount, setTotalCartAmount] = useState(0);
    
    useEffect(() => {
        fetchCartData();
      }, [])
  
      const fetchCartData = () => {
        axios.get(`http://localhost:8085/CartPage/Show_Cart_Record?token=${localStorage.getItem("token")}`)
        .then((Response) => {
          console.log(Response.data.obj)
          setCartBooks(Response.data.obj);
        })
        .catch((Error) => {
          console.log(Error.Response.data)
        })
      }

      const findTotalCost = () => {
        for (let i = 0; i < cartBooks.length; i++) {
          setTotalCartAmount(totalCartAmount +  cartBooks[i].totalPrice)
        }
        console.log(totalCartAmount);
      }
  
      const increaseBookQty= (bookId) => {
        axios.put(`http://localhost:8085/CartPage/IncreaseBookQty?bookId=${bookId}&token=${localStorage.getItem("token")}`)
        .then((Response) => {
          console.log(Response.data.msg);
          fetchCartData();
        })
        .catch((Error) => {
          console.log(Error.Response.data);
      });
      }
  
      const decreaseBookQty= (bookId) => {
        axios.put(`http://localhost:8085/CartPage/DecreaseBookQty?bookId=${bookId}&token=${localStorage.getItem("token")}`)
        .then((Response) => {
          console.log(Response.data.msg);
          fetchCartData();
        })
        .catch((Error) => {
          console.log(Error.Response.data);
      });
      }
  
      const removeBookFromCart=(id) => {
        axios.delete(`http://localhost:8085/CartPage//Remove_Book_From_Cart?cartBookId=${id}&token=${localStorage.getItem("token")}`)
        .then((Response) => {
          console.log(Response.data);
          console.log(Response.data.msg);
          fetchCartData();
      })
      .catch((Error) => {
          console.log(Error);
      });

      }

  return (
    <>
        <div>
     
      <div className='cartContainer'>

        {
        cartBooks.map((cartBook) => {
          return (
            <div className='cartcontainerbody' key={cartBook.cartBookId}>
              <Card className='card' sx={{ display: 'flex', marginBottom: '1%', marginTop: '1%', width: '30%', maxHeight: '90%' }}>
                <div>
                  <CardMedia
                    component="img"
                    height="100px"
                    image={cartBook.books.profilePic}
                    alt="Image not Available"
                    sx={{ objectFit: "contain", width: '150px' }} />
                </div>
                <div className='cardContent'>
                  <CardContent className="cardcontent">
                    <label className='cardtitle'>
                        {cartBook.books.bookName}
                    </label><br />

                    <label className='authorname'>
                        {cartBook.books.authorName}
                    </label><br />

                    <label className='cardtitle'>
                        Rs. {cartBook.totalPrice}
                    </label><br />

                    <div className='countOfItems'>
                      <button onClick={() => decreaseBookQty(cartBook.books.bookId)} disabled={cartBook.quantity === 1}> - </button>
                      <input  value={cartBook.quantity} className="count" type="text" name="countOfBook" id="Name" required style={{width:"30px"}} />
                      <button onClick={() => increaseBookQty(cartBook.books.bookId)}> + </button>
                    </div>
                  </CardContent>
                </div>
                <div className='cardAction'>
                  <CardActions>
                    <Button onClick={() => removeBookFromCart(cartBook.cartBookId)} variant="outlined" startIcon={<DeleteIcon/>}>
                        Remove
                    </Button>
                  </CardActions>
                </div>
              </Card>
            </div>
          );
        })
      }
        
            
      </div>
      </div>
    
    </>
  )
}

export default CartBook