import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import * as yup from "yup";
import { ErrorMessage, Formik } from 'formik';
import './Signup.css';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
function Signup() {
    const [signup, setsignup] = useState({
        username: "", password: "", confirmpassword: "", email: "", phone: ""
    });

    const schema = yup.object().shape({
        username: yup.string().required('Username is required'),
        password: yup.string().matches(/^\d{6}$/, "Password must be exactly 6 digits").required('Password is required'),
        confirmpassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required'),
        email: yup.string().email('Invalid email format').required('Email is required'),
        phone: yup.string().matches(/^\d{10}$/, 'Phone number must be exactly 10 digits').required('Phone number is required')
    });

    const handleInput = (e) => {
        setsignup({ ...signup, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        const data = {
            username: signup.username,
            password: signup.password,
            confirmpassword: signup.confirmpassword,
            phone: signup.phone,
            email: signup.email
        };
try{
    axios.post("http://localhost:3000/api/insertsignup", data).then(res => {
        console.log(res.data);
        Swal.fire({
            title: "Good job!",
            text: "Account created succussfully!...",
            icon: "success"
          });
    }
    
);
}
        
    catch(err){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
            
    }
        
    };

    return (
        <div className="maincontainer">
          
            <div className='container'>
                <Formik
                    validationSchema={schema}
                    initialValues={signup}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit, handleChange }) => (
                        <Form onSubmit={handleSubmit}>
                            <h1>Signup</h1>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="username" className="input" name="username" value={signup.username} onChange={(e) => { handleInput(e); handleChange(e); }} />
                                <ErrorMessage component='div' className='text-danger' name='username' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="text" placeholder="xxxx" className="input" name="password" value={signup.password} onChange={(e) => { handleInput(e); handleChange(e); }} />
                                <ErrorMessage component='div' className='text-danger' name='password' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="confirmpassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="text" placeholder="xxxx" className="input" name="confirmpassword" value={signup.confirmpassword} onChange={(e) => { handleInput(e); handleChange(e); }} />
                                <ErrorMessage component='div' className='text-danger' name='confirmpassword' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="name@example.com" className="input" name="email" value={signup.email} onChange={(e) => { handleInput(e); handleChange(e); }} />
                                <ErrorMessage component='div' className='text-danger' name='email' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="phone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="phone" placeholder="Phone" className="input" name="phone" value={signup.phone} onChange={(e) => { handleInput(e); handleChange(e); }} />
                                <ErrorMessage component='div' className='text-danger' name='phone' />
                            </Form.Group>
                            <div className='submitbutton'>
                                <Button type="submit" variant='primary'>Submit</Button>
                                
                                <Link to='/'> <Button type="button" >Back</Button></Link>
                            </div>
                        </Form>
                    )}
                </Formik>
                
            </div>
        </div>
    );
}

export default Signup;
