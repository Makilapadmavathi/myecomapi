import logo from './logo.svg';
import './App.css';
import Signup from './Signup';
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation, useSearchParams } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import Viewproduct from './Viewproduct';
import { useReducer, useState } from 'react';
import Cart from './Cart';
import Navbarpage from './Navbarpage';
let reducer=(state,action)=>{
  console.log(action)
switch(action.type){
  case "addtocart":
    return [...state,{...action.product,quantity:1}]
  case "remove":
    return state.filter(item=>item._id!=action._id)
  case "increase":
    return state.map(item=>item._id == action.item._id?{...item,quantity:item.quantity+1}:item)
    case "decrease":
      return state.map(item=>item._id == action.item._id?{...item,quantity:item.quantity-1}:item)
  default:
    throw new Error("Invalid case")
}
}
function Protectedroute(){
let authenticateduser=sessionStorage.getItem('isauth')=="true"
return authenticateduser?<Outlet/>:<Navigate to='/'/>
}

function App() {
  let [cart,setcart]=useReducer(reducer,[])
  let location=useLocation()
  console.log(cart)
  return (
    <div >
    
   {location.pathname !='/' && location.pathname!='/signup' && <Navbarpage/>}
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/dashboard' element={<Protectedroute/>}>
      <Route path='' element={<Dashboard/>}></Route>
      <Route path='view' element={<Viewproduct cart={cart} setcart={setcart}/>}></Route>
      <Route path='cart' element={<Cart cart={cart} setcart={setcart}/>}></Route>
      </Route>
    </Routes>
 
   
    </div>
  );
}

export default App;
