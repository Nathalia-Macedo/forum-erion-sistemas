import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { ForumContext } from '../Context/Dados';

function Cadastro() {
  const { cadastrarUsuario } = useContext(ForumContext);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem');
      return;
    }

    try {
      const data = await cadastrarUsuario(nome, cpf, email, senha);
      if (data) {
        navigate('/home');
      }
    } catch (error) {
      setErro('Erro ao cadastrar usuário');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <section className="container-login">
      <div className="login-form">
        <form onSubmit={handleSubmit} className="form-content">
          <h1 className="login-title">Cadastro</h1>
          <p className="login-subtitle">Insira seus dados para criar uma conta</p>

          {erro && <p className="error-message">{erro}</p>}

          <div className="inputs">
            <label className="label" htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Seu nome"
              className="input-field"
            />

            <label className="label" htmlFor="cpf">CPF:</label>
            <input
              type="text"
              id="cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Seu CPF"
              className="input-field"
            />

            <label className="label" htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="name@example.com"
              className="input-field"
            />

            <label className="label" htmlFor="senha">Senha:</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="••••••••"
              className="input-field"
            />

            <label className="label" htmlFor="confirmar-senha">Confirmação de Senha:</label>
            <input
              type="password"
              id="confirmar-senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="••••••••"
              className="input-field"
            />
          </div>

          <button type="submit" className="login-button">Cadastrar</button>

          <p className="login-subtitle">Já tem conta? <Link to="/" className="create-account">Faça Login</Link></p>
        </form>
      </div>
    </section>
  );
}

export default Cadastro;

