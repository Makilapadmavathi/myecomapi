import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { ErrorMessage, Formik } from 'formik';
import * as yup from 'yup';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
function Login() {
    const navigate = useNavigate();
    const [login, setLogin] = useState({
        username: '',
        password: '',
    });

    const schema = yup.object().shape({
        username: yup.string().required('Username is required'),
        password: yup
            .string()
            .matches(/^\d{6}$/, 'Password must be exactly 6 digits')
            .required('Password is required'),
    });

    const handleInput = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        const data = {
            username: login.username,
            password: login.password,
        };
        axios.post('http://localhost:3000/api/loginuser', data).then((res) => {
            console.log(res.data);
            localStorage.setItem("user",login.username)
            sessionStorage.setItem("isauth","true")
            Swal.fire({
                title: "Good job!",
                text: "Logged in successfully!",
                icon: "success"
              });
             
            navigate('/dashboard');
        });
    };

    return (
        <div className="maincontainer">
            <div className="container">
                <h1>Login</h1>
                <Formik
                    validationSchema={schema}
                    initialValues={login}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit, handleChange }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter username"
                                    className="input"
                                    name="username"
                                    value={login.username}
                                    onChange={(e) => {
                                        handleInput(e);
                                        handleChange(e);
                                    }}
                                />
                                <ErrorMessage
                                    component="div"
                                    className="text-danger"
                                    name="username"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    className="input"
                                    name="password"
                                    value={login.password}
                                    onChange={(e) => {
                                        handleInput(e);
                                        handleChange(e);
                                    }}
                                />
                                <ErrorMessage
                                    component="div"
                                    className="text-danger"
                                    name="password"
                                />
                            </Form.Group>

                            <div className="submitbutton">
                                <Button type="submit" variant="primary">
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <br />
                <p>
                    Not a user? Click here to&nbsp;
                    <a href="/signup">Signup</a>
                </p>
            </div>
        </div>
    );
}

export default Login;
