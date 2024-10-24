

import React from 'react';

import './App.css';
import Home from "../src/features/Home/Home"
import Navigation from './features/Home/Nav/Navigation';
import { Route, Routes } from 'react-router-dom';
import Wishlist from './features/Wishlist/Wishlist';
import Bag from './features/Bag/Bag';

function App() {
  return (
    <div className="App">
   <Navigation />
   <Routes>  
    <Route path="/" element={<Home/>} />
    <Route path="/Wishlist" element={<Wishlist/>}/>
 <Route path="/Bag" element={<Bag/>}/>
 </Routes>
    </div>
  );
}

export default App;

