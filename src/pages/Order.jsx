import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import './Order.css';
import {Container,Card,CardHeader,CardBody,Row,Col} from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import CartBook from '../components/CartBook';



const Order = () => {
    
    const [data,setData]=useState({firstName:"",lastName:"",email:"",password:"",phoneNo:"",pinCode:"",locality:"",address:"",city:"",landMark:"",addressType:"",cartModel:{}})

    function onChangeHandler(e){
        const name = e.target.name;
        const value = e.target.value;
       setData({...data,[name]:value});
       
      }

     useEffect(() => {
        getUserData();

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

      const updateUserData = (data) =>{
        axios.put(`http://localhost:8085/UserPage/UpdateData/user?token=${localStorage.getItem("token")}`,data)
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
        updateUserData(data);
      }

  return (
  
   <>
       <Header />
       <CartBook/>
        <hr/>
       <Container className="mt-4 mb-4  container">
         <Row>
            <Col>
            <Card  >
            <CardHeader >
               <h3>  Customer Details </h3>
            </CardHeader>
            <CardBody className="cardbody">

            <Form onSubmit={onSubmitData}>
                    <FormGroup>
                        <Label for="firstName">Enter firstName</Label>
                        <Input type="text" placeholder="Enter Here" value={data.firstName} name="firstName" id="firstname" onChange={onChangeHandler} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastName">Enter lastName </Label>
                        <Input type="text" placeholder="Enter Here" value={data.lastName} name="lastName" id="lastname"  onChange={onChangeHandler} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="phoneNo">Enter PhoneNumber</Label>
                        <Input type="text" placeholder="Enter Here" value={data.phoneNo} name="phoneNo" id="phoneNumber" onChange={onChangeHandler} /> 
                    </FormGroup>
                    <FormGroup>
                        <Label for="locality">Enter locality</Label>
                        <Input type="locality" placeholder="Enter Here" value={data.locality} name="locality" id="locality"  onChange={onChangeHandler} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="address">Enter Address</Label>
                        <Input type="address" placeholder="Enter Here" value={data.address} name="address" id="address"  onChange={onChangeHandler} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="addresstype">Enter AddressType</Label>
                        <Input type="text" placeholder="Enter Here" value={data.addressType} name="addressType" id="addresstype"  onChange={onChangeHandler} />
                    </FormGroup>
                   
                    <FormGroup>
                        <Label for="landMark">Enter landmark</Label>
                        <Input type="text" placeholder="Enter Here" value={data.landMark} name="landMark" id="landMark" onChange={onChangeHandler}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="city">Enter City</Label>
                        <Input type="text" placeholder="Enter Here" value={data.city} name="city" id="city" onChange={onChangeHandler}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="pinCode">Enter PinCode</Label>
                        <Input type="text" placeholder="Enter Here" value={data.pinCode} name="pinCode" id="pinCode" onChange={onChangeHandler} /> 
                    </FormGroup>
                    
                    <Container className="text-center">
                     <Link to ="/PlaceOrder"> <Button type="submit" color="dark">Update and Continue</Button></Link>
                        <Button type="reset" color="primary" className="ms-2">Reset</Button>
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

export default Order