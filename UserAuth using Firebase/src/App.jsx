import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from './components/NavBar';
import Login from './components/Login';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<NavBar />} />
      </Routes>
    </>
  );
}
