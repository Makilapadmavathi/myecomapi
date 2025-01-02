import React, { useEffect, useState } from 'react';
import './Cart.css'; // Import the custom CSS
import { Button, Col, Row } from 'react-bootstrap';
function Cart({ cart, setcart }) {
  console.log(cart);
  let [subtotal,setsubtotal]=useState("")
  useEffect(()=>{
setsubtotal(cart.reduce((a,b)=>a+b.price*b.quantity,0))
  },[cart])
    let handleremovefromcart=(_id)=>{
setcart({type:"remove",_id})
  }

  let handleincrease=(item)=>{
    setcart({type:"increase",item})
  }
  let handledecrease=(item)=>{
    setcart({type:"decrease",item})
  }
  return (
    <div className="cart-container">
        <Row>

 <Col lg='8'>

      {cart && cart.length>0 ?cart.map(item => (
        <div key={item.id} className="cart-item">
          <img src={`http://localhost:3000${item.image}`} alt={item.title} />
          <div className="cart-item-details">
            <p className="item-title">{item.title}</p>
            <p className="item-price">${item.price*item.quantity}</p>
            <p className="item-category">{item.category}</p>
            <p className="item-description">{item.description}</p>
           <p>Quantity : {item.quantity}</p>
           
           <span>  
            <Button variant='success' onClick={()=>handleincrease(item)}>+</Button>&nbsp;
            <Button variant='info' onClick={()=>handledecrease(item)}>-</Button> 
            <Button variant='danger' onClick={()=>handleremovefromcart(item._id)}>Remove from cart</Button></span>
           
          </div>
        </div>
      )) : <div style={{ textAlign: 'center',paddingTop:"150px" }}>
      <strong style={{ fontSize: '25px' }}>No items in cart</strong>
    </div>}
    </Col>
      <Col>
      <div style={{backgroundColor:"black",color:"white", height:"15rem"}}>
      <h3 style={{textAlign:"center",paddingTop:"25px"}}>Subtotal</h3>
      <p style={{paddingLeft:"25px"}}>Total: {subtotal}</p>
        </div>
  
      </Col>
    

             </Row>

    </div>
  );
}

export default Cart;
