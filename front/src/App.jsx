import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Profile from "./components/Profile";
import ProfilePage from "./components/ProfilePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterForm />}></Route>
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="*" element={<Navigate to="/register"></Navigate>} />
          <Route path="/profilepage" element={<ProfilePage/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
        
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
