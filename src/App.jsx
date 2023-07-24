import React from 'react';
import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Testcrud from './testCrud';
import 'bootstrap/dist/css/bootstrap.min.css';





function App() {

  return (
    <>


 <BrowserRouter>
  
      <Routes> 
        <Route exact path="/" element={< Testcrud />} />
        
      </Routes>

    </BrowserRouter>
    </>
  )
}

export default App
