import React from 'react';
import { Link } from 'react-router-dom'; // Importa o Link para navegação
import './Login.css';

function Cadastro() {
  return (
    <section className="container-login">
      <div className="login-form">
        <div className="form-content">
          <h1 className="login-title">Cadastro</h1>
          <p className="login-subtitle">Insira seus dados para criar uma conta</p>

          <div className="inputs">
            <label className="label" htmlFor="nome">Nome:</label>
            <input type="text" id="nome" placeholder="Seu nome" className="input-field" />

            <label className="label" htmlFor="email">Email:</label>
            <input type="email" id="email" placeholder="name@example.com" className="input-field" />

            <label className="label" htmlFor="senha">Senha:</label>
            <input type="password" id="senha" placeholder="••••••••" className="input-field" />

            <label className="label" htmlFor="confirmar-senha">Confirmação de Senha:</label>
            <input type="password" id="confirmar-senha" placeholder="••••••••" className="input-field" />
          </div>

          <button className="login-button">Cadastrar</button>

          <p className="login-subtitle">Já tem conta? <Link to="/" className="create-account">Faça Login</Link></p>
        </div>
      </div>
    </section>
  );
}

export default Cadastro;
