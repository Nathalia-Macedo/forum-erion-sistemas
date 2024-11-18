// import React from 'react';
// import { Link } from 'react-router-dom'; // Importa o Link para navegação
// import './Login.css';

// function Cadastro() {
//   return (
//     <section className="container-login">
//       <div className="login-form">
//         <div className="form-content">
//           <h1 className="login-title">Cadastro</h1>
//           <p className="login-subtitle">Insira seus dados para criar uma conta</p>

//           <div className="inputs">
//             <label className="label" htmlFor="nome">Nome:</label>
//             <input type="text" id="nome" placeholder="Seu nome" className="input-field" />

//             <label className="label" htmlFor="nome">CPF:</label>
//             <input type="number" id="nome" placeholder="Seu CPF" className="input-field" />

//             <label className="label" htmlFor="email">Email:</label>
//             <input type="email" id="email" placeholder="name@example.com" className="input-field" />

//             <label className="label" htmlFor="senha">Senha:</label>
//             <input type="password" id="senha" placeholder="••••••••" className="input-field" />

//             <label className="label" htmlFor="confirmar-senha">Confirmação de Senha:</label>
//             <input type="password" id="confirmar-senha" placeholder="••••••••" className="input-field" />
//           </div>

//           <button className="login-button">Cadastrar</button>

//           <p className="login-subtitle">Já tem conta? <Link to="/" className="create-account">Faça Login</Link></p>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Cadastro;
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Adicionando useNavigate para redirecionamento após o cadastro
import './Login.css';
import { ForumContext } from '../Context/Dados';
function Cadastro() {
  const { cadastrarUsuario } = useContext(ForumContext); // Pegando a função de cadastro do contexto
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate(); // Usando o hook useNavigate para redirecionamento

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificando se as senhas são iguais
    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem');
      return;
    }

    try {
      const data = await cadastrarUsuario(nome, cpf, email, senha);
      if (data) {
        navigate('/home'); // Redirecionando para a página inicial após cadastro bem-sucedido
      }
    } catch (error) {
      setErro('Erro ao cadastrar usuário');
    }
  };

  return (
    <section className="container-login">
      <div className="login-form">
        <div className="form-content">
          <h1 className="login-title">Cadastro</h1>
          <p className="login-subtitle">Insira seus dados para criar uma conta</p>

          {erro && <p className="error-message">{erro}</p>} {/* Exibe a mensagem de erro */}

          <div className="inputs">
            <label className="label" htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome"
              className="input-field"
            />

            <label className="label" htmlFor="cpf">CPF:</label>
            <input
              type="text"
              id="cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="Seu CPF"
              className="input-field"
            />

            <label className="label" htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="input-field"
            />

            <label className="label" htmlFor="senha">Senha:</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              className="input-field"
            />

            <label className="label" htmlFor="confirmar-senha">Confirmação de Senha:</label>
            <input
              type="password"
              id="confirmar-senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              placeholder="••••••••"
              className="input-field"
            />
          </div>

          <button className="login-button" onClick={handleSubmit}>Cadastrar</button>

          <p className="login-subtitle">Já tem conta? <Link to="/" className="create-account">Faça Login</Link></p>
        </div>
      </div>
    </section>
  );
}

export default Cadastro;
