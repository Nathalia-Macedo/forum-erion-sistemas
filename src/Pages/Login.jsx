import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa o Link para navegação e useNavigate para redirecionamento
import { ForumContext } from '../Context/Dados';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [senha,setSenha] = useState('');
  const [error, setError] = useState('');
  const { loginUser, user } = useContext(ForumContext); // Obtém loginUser e user do contexto
  const navigate = useNavigate(); // Para redirecionar após login

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const userData = await loginUser(email, senha);
      let token = localStorage.getItem("authToken")
        if (token) {
        navigate('/home'); // Redireciona após o login
      } else {
        setError('Email ou senha inválidos');
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    }
  };
  


  return (
    <section className="container-login">
      <div className="login-form">
        <div className="form-content">
          <h1 className="login-title">Login</h1>
          <p className="login-subtitle">Insira suas credenciais para acessar sua conta</p>
          
            <div className="inputs">
              <label className="label" htmlFor="email">Email:</label>
              <input 
                type="email" 
                id="email" 
                placeholder="name@example.com" 
                className="input-field" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />

              <label className="label" htmlFor="password">Senha:</label>
              <input 
                type="password" 
                id="password" 
                placeholder="••••••••" 
                className="input-field" 
                value={senha} 
                onChange={(e) => setSenha(e.target.value)} 
              />
            </div>
            <a href="#" className="forgot-password">Esqueceu sua senha?</a>
            <button type="submit" onClick={handleLogin} className="login-button">Login</button>
        

          {error && <p className="error-message">{error}</p>} {/* Exibe erro se houver */}

          <Link to="/cadastro" className="create-account">CRIAR CONTA</Link>
        </div>
      </div>
    </section>
  );
}

export default Login;
