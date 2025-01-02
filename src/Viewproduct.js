import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import './Viewproduct.css';
import Swal from 'sweetalert2';
function Viewproduct({cart,setcart}) {
    const location = useLocation();
    const oneproduct = location.state;
    const baseURL = 'http://localhost:3000';

    const [zoomStyle, setZoomStyle] = useState({});

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setZoomStyle({
            backgroundImage: `url(${baseURL}${oneproduct.image})`,
            backgroundPosition: `${x}% ${y}%`,
            display: 'block',
        });
    };

    const handleMouseLeave = () => {
        setZoomStyle({ display: 'none' });
    };

    let handleAddtocart=(product)=>{
        let existingproduct=cart.some(item=>item._id==product._id)
        if(!existingproduct){
            setcart({type:"addtocart",product})
            Swal.fire({
                title: "Good job!",
                text: "1 Item Added in Cart!",
                icon: "success"
              });
        }
        else{
            Swal.fire("Already added in cart");
        }

    }
    return (
        <div className="view-container">
         
            <div className="product-container">
                <Card className="product-card">
                    <h1>{oneproduct.title}</h1>
                    <div
                        className="image-container"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img
                            src={`${baseURL}${oneproduct.image}`}
                            alt={oneproduct.title}
                        />
                    </div>
                    <p className="product-category">{oneproduct.category}</p>
                    <p className="product-description">{oneproduct.description}</p>
                    <p className="product-price">Price: ${oneproduct.price}</p>
                    <Button onClick={()=>handleAddtocart(oneproduct)}>Add to Cart</Button>
                </Card>
                <div className="zoomed-image" style={zoomStyle}></div>
            </div>
        </div>
    );
}

export default Viewproduct;
