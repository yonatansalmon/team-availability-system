import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import StatusScreen from './components/StatusScreen';
import Signup from './components/Signup';
import NavBar from './components/Navbar';
import './App.css';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Login />} />
        <Route
          path='/status'
          element={
            <PrivateRoute>
              <StatusScreen />{' '}
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
