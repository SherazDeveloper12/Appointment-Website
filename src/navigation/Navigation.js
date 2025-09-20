import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home';   

export default function Navigation() {
  return (
<BrowserRouter> <Routes>
        <Route path="/" element={<Home />} /> 
      </Routes> </BrowserRouter>  
  );
}