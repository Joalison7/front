import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './sidebar';
import './dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-content">
        <h1>Dashboard</h1>
        <p>Bem-vindo ao seu painel!</p>
        
      </main>
    </div>
  );
};

export default Dashboard;