import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<RegisterForm/>}></Route>
      <Route path='/login' element={<LoginForm/>}></Route>
      <Route path='*' element={<Navigate to = "/register"></Navigate>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
