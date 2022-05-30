import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import DragList from './Components/board/DragList';
import Boards from './Components/boards/Boards';
import Contact from './Components/contact/Contact';
import Home from './Components/home/Home';
import Login from './Components/login/Login';
import NavBar from './Components/navbar/Navbar';
import Register from './Components/register/Register';
import NotFound from './Components/NotFound/NotFound';

function App() {
  return (
    <>
    <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/board' element={<DragList/>} />
        <Route path='/boards' element={<Boards/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
