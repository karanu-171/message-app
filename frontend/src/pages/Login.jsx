import React, { useState, useContext } from 'react'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import { useLoginUserMutation } from "../services/appApi";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from '../context/appContext';
import './Login.css'

function Login(){

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { socket } = useContext(AppContext)
  const [loginUser, { isLoading, error }] = useLoginUserMutation();


  const handleLogin = (e) =>{
    e.preventDefault()
    // login logic
     loginUser({ email, password }).then(({ data }) => {
       if (data) {
           // socket work
           socket.emit("new-user");
           // navigate to the chat
           navigate("/chat");
      }
   })
  }

  return (
    <Container>
    <Row>
    <Col md={5} className='login__bg'></Col>
    <Col md={7} className='d-flex align-items-center justify-content-center flex-direction-column'>
    <Form style={{width: '80%', maxWidth: 500}} onSubmit={handleLogin}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
    {error && <p className='alert alert-danger'>{error.data}</p>}
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=> setEmail(e.target.value)} required/>
    <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} required/>
        </Form.Group>
        <Button variant="primary" type="submit">
        {isLoading ? <Spinner animation='grow' /> : "Login"}
        </Button>
        <div className='py-4'>
          <p>Don't have an account ? <Link to='/signup'>SignUp</Link> 
          </p>
        </div>
        </Form>
        </Col>
        </Row>
        </Container>
  )
}

export default Login
