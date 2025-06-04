import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import SignupForm from './cadastro';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<SignupForm />} />
    </Routes>
  );
}

export default AppRoutes;