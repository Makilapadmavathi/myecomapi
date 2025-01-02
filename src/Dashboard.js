import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import './Dashboard.css'
import { useNavigate } from 'react-router-dom';
function Dashboard() {
    let navigate=useNavigate()
    let [allproducts, setallproducts] = useState([]);

    useEffect(() => {
        fetchdata();
    }, []);

    let fetchdata = async () => {
        let res = await axios.get("http://localhost:3000/api/getallproducts");
        console.log(res.data);
        setallproducts(res.data.data);
    };

    let baseURL = 'http://localhost:3000'; // Base URL for images
let handleView=(item)=>{
    navigate('/dashboard/view',{state:item})

}
    return (
        <div>
        

<div className='cardcontainer'>


            {allproducts.map(item => (
                <Card key={item._id} className='cardproduct' onClick={()=>handleView(item)}>
                    <img
                        src={`${baseURL}${item.image}`} 
                        style={{ width: "150px" }}
                        alt={item.title}
                    />
                    <p>{item.title}</p>
                    <span>{item.price}</span>
                </Card>
            ))}
            </div>
        </div>
    );
}

export default Dashboard;
