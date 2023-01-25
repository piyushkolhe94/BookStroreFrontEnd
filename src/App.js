
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
import CartBook from './components/CartBook';
import Order from './pages/Order';
import PlaceOrder from './components/PlaceOrder';
import OrderSuccessfully from './pages/OrderSuccessfully';





function App() {
  return (
    <>
     <div className="App">
     <Router>
          <Routes>
      
            <Route path="/Home" element ={<HomePage/>}/>
            <Route path="/Login" element ={<Login/>}/>
            <Route path="/Signup" element ={<Signup/>}/>
            <Route path="/Admin" element ={<Admin/>}/>
            <Route path="/Cartbook" element ={<CartBook/>}/>
            <Route exact path="/Order" element={<Order/>}/>
            <Route exact path="/PlaceOrder" element={<PlaceOrder/>}/>
            <Route exact path="/OrderSuccess" element={<OrderSuccessfully/>}/>
            
            
            
        
          
          </Routes>
     </Router>
    </div>   
    </>
  );
}

export default App;
