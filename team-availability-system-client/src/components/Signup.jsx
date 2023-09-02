import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [userInfo, setUserInfo] = useState({ userName: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleUserInfo = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (userInfo.password !== userInfo.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        userName: userInfo.userName,
        password: userInfo.password,
        email: userInfo.email,
        status: 'Working',
      });

      if (response.data.ok) {
        navigate('/');
      }
    } catch (error) {
      console.error('There was an error during the signup', error);
      setError(error.response.data.message || error.message)
    }
  };

  return (
    <div className='Container SignupContainer'>
      <h1 className='SignUpTitle'>Sign Up</h1>
      <div className='FormContainer'>
        <Form onSubmit={handleSignup}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label className='font-weight-light'>Name</Form.Label>
            <div className='inputData'>
              <Form.Control required type='text' placeholder='User Name' name='userName' onChange={handleUserInfo} value={userInfo.userName} />
            </div>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label className='font-weight-light'>Email address</Form.Label>
            <div className='inputData'>
              <Form.Control required type='email' placeholder='Email' name='email' onChange={handleUserInfo} value={userInfo.email} />
            </div>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label className='font-weight-light'>Password</Form.Label>
            <div className='inputData'>
              <Form.Control
                type='password'
                placeholder='Password'
                autoComplete='on'
                value={userInfo.password}
                onChange={handleUserInfo}
                name='password'
                required
              />
            </div>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label className='font-weight-light'>Repeat Password</Form.Label>
            <div className='inputData'>
              <Form.Control
                type='password'
                placeholder='Repeat Password'
                autoComplete='on'
                value={userInfo.confirmPassword}
                onChange={handleUserInfo}
                name='confirmPassword'
                required
              />
            </div>
          </Form.Group>
          {error && <h6 className='Error'>{error}</h6>}

          <div className='d-flex flex-row-reverse'>
            <Button variant='primary' type='submit' className=''>
              Sign Up
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
