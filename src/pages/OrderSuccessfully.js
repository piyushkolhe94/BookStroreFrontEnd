import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import "./OrderSuccess.css";
import { Table } from 'reactstrap';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

function OrderSuccessfully() {

    const [data,setData]=useState({firstName:"",lastName:"",email:"",password:"",phoneNo:"",pinCode:"",locality:"",address:"",city:"",landMark:"",addressType:"",cartModel:{}})
    const navigate = useNavigate();

    const redirectedToHomePage=(e) =>{
        e.preventDefault();
        navigate ("/Home");
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

  return (
    <>
        <Header/>

        <div className='container'>
        <h1>Order Placed Successfully</h1>
        </div>
       <div className='table'>
       <Table bordered>
  <thead>
    <tr>
      <th>
        Email
      </th>
      <th>
        Contact us
      </th>
      <th>
        Address
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        {data.email}
      </td>
      <td>
        {data.phoneNo}
      </td>
      <td>
        {data.address}<span>,</span>{data.landMark}
      </td>
    </tr>
  </tbody>
</Table>
 </div>

   

        <button className='continue_btn' onClick={redirectedToHomePage}>Continue Shopping</button>
    



    </>
  )
}

export default OrderSuccessfully