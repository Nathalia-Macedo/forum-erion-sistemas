import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ForumContext } from '../Context/Dados';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { loginUser, user } = useContext(ForumContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const userData = await loginUser(email, senha);
      let token = localStorage.getItem("authToken");
      if (token) {
        navigate('/home');
      } else {
        setError('Email ou senha inválidos');
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };

  return (
    <section className="container-login">
      <div className="login-form">
        <form onSubmit={handleLogin} className="form-content">
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
              onKeyPress={handleKeyPress}
            />

            <label className="label" htmlFor="password">Senha:</label>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••" 
              className="input-field" 
              value={senha} 
              onChange={(e) => setSenha(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <a href="#" className="forgot-password">Esqueceu sua senha?</a>
          <button 
            type="submit" 
            className="login-button" 
            disabled={isLoading}
          >
            {isLoading ? 'Carregando...' : 'Login'}
          </button>

          {error && <p className="error-message">{error}</p>}

          <Link to="/cadastro" className="create-account">CRIAR CONTA</Link>
        </form>
      </div>
    </section>
  );
}

export default Login;

