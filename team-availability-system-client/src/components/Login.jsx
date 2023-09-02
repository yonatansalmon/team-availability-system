import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email: email,
        password: password,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/status');
      }
    } catch (error) {
      console.error('There was an error during login', error);
      setError(error.response.data.message || error.message)
    }
  };

  return (
    <div className='Container LoginContainer'>
      <h1 className='LoginTitle'>Log In</h1>
      <div className='FormContainer'>
        <Form onSubmit={handleLogin} className='LoginForm'>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label className='font-weight-light'>
              Email address or <Link to='/signup'>Sign Up</Link>
            </Form.Label>
            <div className='inputData'>
              <Form.Control required type='email' placeholder='Enter email' onChange={(event) => setEmail(event.target.value)} value={email} />
            </div>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label className='font-weight-light'>Password</Form.Label>
            <div className='inputData'>
              <Form.Control required type='password' placeholder='Password' onChange={(event) => setPassword(event.target.value)} value={password} />
            </div>
          </Form.Group>
          {error && <h6 className='Error'>{error}</h6>}

          <div className='d-flex flex-row-reverse test'>
            <Button variant='primary' type='submit'>
              Log In
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
