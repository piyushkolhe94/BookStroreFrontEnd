import React, { useState } from 'react'
import {Container,Card,CardHeader,CardBody,Row,Col} from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Header from '../components/Header';
import axios from 'axios';

const Admin = () => {

    const [bookData,setBookData]=useState({bookName:"",authorName:"",bookQuantity:"",price:"",profilePic:"",bookDescription:""})

    function onChangeHandler (e){
        const name = e.target.name;
        const value = e.target.value;
       setBookData({...bookData,[name]:value});
    }

    function onSubmitHandle(e){
        e.preventDefault();
        axios.post(`http://localhost:8085/BooksPage/Add_Books/Admin?token=${localStorage.getItem("token")}`,bookData )
        .then((Response) => {
            console.log(Response.data);
        })
        .catch((Error)=> {console.log(Error)})
    }

  return (

         <>
     <Header/>
       <Container className="mt-4 mb-4">
         <Row>
            <Col sm={{size:6,offset:3}}>
            <Card color="dark" outline>
            <CardHeader >
               <h2> Add_Books (Admin)</h2>
            </CardHeader>
            <CardBody>

                <Form onSubmit={onSubmitHandle}>
                    <FormGroup>
                        <Label for="bookName">Enter bookName</Label>
                        <Input type="text" placeholder="Enter Here" value={bookData.bookName} name="bookName" id="bookname" onChange={onChangeHandler} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="authorName">Enter authorName </Label>
                        <Input type="text" placeholder="Enter Here" value={bookData.authorName} name="authorName" id="authorName"  onChange={onChangeHandler} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="bookQuantity">Enter bookQuantity</Label>
                        <Input type="text" placeholder="Enter Here" value={bookData.bookQuantity} name="bookQuantity" id="bookQuantity"  onChange={onChangeHandler} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="price">price</Label>
                        <Input type="text" placeholder="Enter Here" value={bookData.price} name="price" id="price" onChange={onChangeHandler} />
                    </FormGroup>
                   
                    <FormGroup>
                        <Label for="profilePic">Enter profilePic</Label>
                        <Input type="profilePic" placeholder="Enter Here" value={bookData.profilePic} name="profilePic" id="profilePic" onChange={onChangeHandler} /> 
                    </FormGroup>
                    <FormGroup>
                        <Label for="bookDescription">bookDescription</Label>
                        <Input type="text" placeholder="Enter Here" value={bookData.bookDescription} name="bookDescription" id="bookDescription"  onChange={onChangeHandler} />
                    </FormGroup>

                    <Container className="text-center">
                        <Button type="submit" color="dark">submit</Button>
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

export default Admin