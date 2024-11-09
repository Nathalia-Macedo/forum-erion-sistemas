import React from 'react';
import { Link } from 'react-router-dom'; // Importa o Link para navegação
import './Login.css';

function Login() {
  return (
    <section className="container-login">
      <div className="login-form">
        <div className="form-content">
          <h1 className="login-title">Login</h1>
          <p className="login-subtitle">Insira suas credenciais para acessar sua conta</p>
          <div className='inputs'>
            <label className="label" htmlFor="email">Email:</label>
            <input type="email" id="email" placeholder="name@example.com" className="input-field" />

            <label className="label" htmlFor="password">Senha:</label>
            <input type="password" id="password" placeholder="••••••••" className="input-field" />
          </div>
          <a href="#" className="forgot-password">Esqueceu sua senha?</a>
         
          <button className="login-button">Login</button>
          
          {/* Usando Link para navegação */}
          <Link to="/cadastro" className="create-account">CRIAR CONTA</Link>
        </div>
      </div>
    </section>
  );
}

export default Login;
