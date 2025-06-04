import React from 'react';
import './CampanhaForm.css'; // Importando o CSS

const CampanhaForm = () => {
  return (
    <div className="container">
      <aside className="sidebar">
        <h1>Petroticus</h1>
        <ul>
          <li>Página Inicial</li>
          <li>Explorar Campanhas</li>
          <li>Criar Campanha</li>
        </ul>
      </aside>
      <main className="main-content">
        <h2>Crie Sua Campanha</h2>
        <form>
          <label>Título da campanha:</label>
          <input type="text" placeholder="Nome do seu projeto..." />

          <label>Descrição:</label>
          <textarea placeholder="Conte sua história..."></textarea>

          <label>Meta de arrecadação:</label>
          <input type="number" placeholder="Valor necessário..." />

          <label>Imagem/Card da campanha:</label>
          <input type="file" />

          <div className="preview">
            <p>Prévia do card</p>
          </div>

          <button type="submit">Criar campanha</button>
        </form>
      </main>
    </div>
  );
};

export default CampanhaForm;