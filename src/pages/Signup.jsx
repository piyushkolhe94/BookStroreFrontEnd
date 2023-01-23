import React, { useState } from 'react'
import {Container,Card,CardHeader,CardBody,Row,Col} from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Link, useNavigate } from "react-router-dom";
import Header from '../components/Header';
import axios from 'axios';


function Signup() {

    const [data,setData]=useState({firstName:"",lastName:"",email:"",password:"",phoneNo:"",pinCode:"",locality:"",address:"",city:"",landMark:"",addressType:"",cartModel:{}})
    let navigate = useNavigate();
    function onChangeHandler(e){
        const name = e.target.name;
        const value = e.target.value;
       setData({...data,[name]:value});
       
      }

      function onSubmitHandle(e){
        e.preventDefault();
        console.log("submit called");
        axios.post("http://localhost:8085/UserPage/Register_New_User",data)
        .then((Response)=>{console.log(Response);
            setTimeout(() => {navigate("/Login");}, 3000);
        })
        .catch(Error => console.log(Error));
     }     
 return (
    <>
     <Header/>
       <Container className="mt-4 mb-4">
         <Row>
            <Col sm={{size:6,offset:3}}>
            <Card color="dark" outline>
            <CardHeader >
               <h2>  FILL INFO FOR REGISTRATION</h2>
            </CardHeader>
            <CardBody>

                <Form onSubmit={onSubmitHandle}>
                    <FormGroup>
                        <Label for="firstName">Enter firstName</Label>
                        <Input type="text" placeholder="Enter Here" value={data.firstName} name="firstName" id="firstname" onChange={onChangeHandler} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastName">Enter lastName </Label>
                        <Input type="text" placeholder="Enter Here" value={data.lastName} name="lastName" id="lastname"  onChange={onChangeHandler} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Enter email</Label>
                        <Input type="email" placeholder="Enter Here" value={data.email} name="email" id="email"  onChange={onChangeHandler} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Enter password</Label>
                        <Input type="password" placeholder="Enter Here" value={data.password} name="password" id="password" onChange={onChangeHandler} />
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
                        <Button type="submit" color="dark">Register</Button>
                        <Button type="reset" color="primary" className="ms-2">Reset</Button>
                    </Container>
                    <Container>
                    <Link to="/Login">Login Here</Link>
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

export default Signup