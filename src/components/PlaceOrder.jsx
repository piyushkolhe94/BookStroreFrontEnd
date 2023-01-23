import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Container,Card,CardHeader,CardBody,Row,Col} from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Header from './Header';
import "./OrderPlace.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Accordion, AccordionSummary,Typography } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import { ExpandMore } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {

    const [data,setData]=useState({firstName:"",lastName:"",email:"",password:"",phoneNo:"",pinCode:"",locality:"",address:"",city:"",landMark:"",addressType:"",cartModel:{}})
    const [cartBooks, setCartBooks] = useState([])
    const [totalCartAmount, setTotalCartAmount] = useState(0);
    const [totalCartQty, setTotalCartQty] = useState(0);
    let navigate = useNavigate();

    useEffect(() => {
        getUserData();
        fetchCartData();
        fetchTotalCartBooksPriceAndQty();

      }, [])
  
      const getUserData = () => {
        axios.get(`http://localhost:8085/UserPage/Get_Data/user?token=${localStorage.getItem("token")}`)
        .then((Response) => {
          console.log(Response.data.obj)
         setData(Response.data.obj);
        })
        .catch((Error) => {
          console.log(Error.Response.data)
        })
      }

      const onSubmitData =(e) =>{
        e.preventDefault();
        placeOrder(data);
        console.log("Order Placed");

      }
  
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

      const fetchTotalCartBooksPriceAndQty = () => {
        axios.get(`http://localhost:8085/CartPage/Get_Total-Cart_Amount-Qty?token=${localStorage.getItem("token")}`)
        .then((Response)=> {
            console.log(Response.data.obj);
            setTotalCartAmount(Response.data.obj[0]);
            setTotalCartQty(Response.data.obj[1]);
        })
        .catch((Error) => {
            console.log(Error.Response.data)
        })
    }

    const placeOrder = (value) => {
        axios.post(`http://localhost:8085/OrderPage/placeOrder?token=${localStorage.getItem("token")}`,value)
        .then((Response) => {
            console.log(Response.data.message);
            console.log(Response.data)
            setTimeout(() => { navigate("/Home"); }, 10000);
          })
          .catch((Error) => {
            console.log(Error.Response.data);
        });
    }

  return (
    <>
         <Header/>
        <h1>Cart Items</h1>
        <div>
            <div className='orderContainer'>
                <Accordion sx={{ width: '70%', justifyContent: 'center' }}>
                    <AccordionSummary
                        expandIcon={<ExpandMore/>}
                        aria-controls="panel1a-content"
                        id='panel1a-header'
                        sx={{ height: '80px', marginLeft: '5%', marginRight: '5%' }}
                    >
                        <Typography variant='h4' gutterBottom><b>Order Summary</b></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="containerData">
                        <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={1}><h2>Book Name</h2></TableCell>
                                <TableCell colSpan={1} align="left"><h2>Authore Name</h2></TableCell>
                                <TableCell colSpan={1} align="center"><h2>Quantity</h2></TableCell>
                                <TableCell colSpan={1} align="center"><h2>Price</h2></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {cartBooks.length>0 ? cartBooks.map((book) => {
                                return (
                                    <TableRow key={book.cartBookId}>
                                        <TableCell colSpan={1}>{book.books.bookName}</TableCell>
                                        <TableCell colSpan={1} align="left">{book.books.authorName}</TableCell>
                                        <TableCell colSpan={1} align="center">{book.quantity}</TableCell>
                                        <TableCell colSpan={1} align="center">{(book.totalPrice)}</TableCell>
                                    </TableRow>
                                )
                                }): "no Books"
                            }

                            <TableRow/>
                            <TableRow>
                                <TableCell colSpan={2}><h2>Total</h2></TableCell>
                                <TableCell align="center"><h2>{totalCartQty}</h2></TableCell>
                                <TableCell  align="center"><h2>{(totalCartAmount)}</h2></TableCell>
                            </TableRow>
                        </TableBody>
                        </Table>
                        </TableContainer> 
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
            </div>
        <hr/>
 
         <Container className="mt-4 mb-4  container">
         <Row>
            <Col>
            <Card  >
            <CardHeader >
               <h3>  Customer Details </h3>
            </CardHeader>
            <CardBody className="cardbody">

            <Form>
                    <FormGroup>
                        <Label for="firstName">Enter firstName</Label>
                        <Input type="text" placeholder="Enter Here" value={data.firstName} name="firstName" id="firstname" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastName">Enter lastName </Label>
                        <Input type="text" placeholder="Enter Here" value={data.lastName} name="lastName" id="lastname"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="phoneNo">Enter PhoneNumber</Label>
                        <Input type="text" placeholder="Enter Here" value={data.phoneNo} name="phoneNo" id="phoneNumber"/> 
                    </FormGroup>
                    <FormGroup>
                        <Label for="locality">Enter locality</Label>
                        <Input type="locality" placeholder="Enter Here" value={data.locality} name="locality" id="locality" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="address">Enter Address</Label>
                        <Input type="address" placeholder="Enter Here" value={data.address} name="address" id="address"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="addresstype">Enter AddressType</Label>
                        <Input type="text" placeholder="Enter Here" value={data.addressType} name="addressType" id="addresstype"/>
                    </FormGroup>
                   
                    <FormGroup>
                        <Label for="landMark">Enter landmark</Label>
                        <Input type="text" placeholder="Enter Here" value={data.landMark} name="landMark" id="landMark" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="city">Enter City</Label>
                        <Input type="text" placeholder="Enter Here" value={data.city} name="city" id="city"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="pinCode">Enter PinCode</Label>
                        <Input type="text" placeholder="Enter Here" value={data.pinCode} name="pinCode" id="pinCode"/> 
                    </FormGroup>
                    
                    <Container className="text-center">
                        <Button type="submit" color="dark" onClick={onSubmitData}>Order Placed</Button>
                    </Container>
                    <Container>
                   </Container>
                </Form>
              
            </CardBody>
        </Card>
            </Col>
         </Row>
         
       </Container>
    </>
  )
}

export default PlaceOrder