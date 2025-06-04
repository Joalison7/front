import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h1>Perfil</h1>
      <ul>
        <li><Link to="/dashboard">Página Inicial</Link></li>
        <li><Link to="/explorar">Explorar Campanhas</Link></li>
        <li><Link to="/campanha">Criar Campanha</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;