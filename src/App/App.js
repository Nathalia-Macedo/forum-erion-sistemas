import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../Pages/Login';
import Cadastro from '../Pages/Cadastro';
import './App.css'; // Importa o CSS geral para o App (caso tenha)
import ForumHome from '../Pages/FormHome';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} /> {/* Login na raiz */}
          <Route path="/cadastro" element={<Cadastro />} /> {/* Cadastro em outra rota */}
          <Route path="/home" element={<ForumHome/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
