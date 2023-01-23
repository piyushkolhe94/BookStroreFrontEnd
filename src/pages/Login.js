import axios from 'axios';
import React, { Component } from 'react';
import Header from '../components/Header';
import { Link} from 'react-router-dom';
import withRouter from '../components/withRouter';


class Login extends Component {
          constructor(props){
          super(props);
          
          this.state = {
            password: "",
            loggedIn: false,
            email:"",
            
          }
         
         
          
 } 
      onChange =(e) =>{
        this.setState({
            email : e.target.value,
        })
    }
          handlePassword = (e) => {
          this.setState({
            password : e.target.value
        })
  }

      submitForm = (e) =>{
       e.preventDefault();
       console.log("in submit");
       console.log(this.state)
       if(this.state.email === "" || this.state.password === ""){
        alert("Please provide login details.")
       }
        else {
        axios.post("http://localhost:8085/UserPage/Login",this.state)
       .then((Response) =>{console.log(Response);
        localStorage.setItem("token",Response.data.obj[0]);
        console.log(localStorage.getItem("token"));
        console.log(Response.data.obj[1]);
        if(Response.data.obj[1] === "Admin"){
          this.props.nav("/Admin")
       }
        else{

          this.props.nav("/Home");
          
        }
       })
       .catch((Error) => console.log(Error.data));
     
      }
    }

    render() {
               return (
                <>
                 <Header/>
                        <div>
                            <h1>Login</h1>
                               <form onSubmit={this.submitForm}>
                               <input type="text" placeholder="email" name='email' value={this.state.email} onChange={this.onChange}></input>
                               <br/>
                               <input type="password" placeholder="password" name='password' value={this.state.password} onChange={this.handlePassword}></input>
                               <br/>
                               <button type="submit" >Submit</button>
                               <br/>

                            </form>
                            <Link to="/Signup"> click for register</Link>
                            
                    
                        </div>
                        </>
                    );
                
              
              }
            }
        
    

export default withRouter(Login);