// import React from 'react';
// import { Link } from 'react-router-dom'; // Importa o Link para navegação
// import './Login.css';

// function Login() {
//   return (
//     <section className="container-login">
//       <div className="login-form">
//         <div className="form-content">
//           <h1 className="login-title">Login</h1>
//           <p className="login-subtitle">Insira suas credenciais para acessar sua conta</p>
//           <div className='inputs'>
//             <label className="label" htmlFor="email">Email:</label>
//             <input type="email" id="email" placeholder="name@example.com" className="input-field" />

//             <label className="label" htmlFor="password">Senha:</label>
//             <input type="password" id="password" placeholder="••••••••" className="input-field" />
//           </div>
//           <a href="#" className="forgot-password">Esqueceu sua senha?</a>
         
//            <Link to="/home" className="login-button">Login</Link>
          
//           {/* Usando Link para navegação */}
//           <Link to="/cadastro" className="create-account">CRIAR CONTA</Link>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Login;
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

  // Função para fazer login
  const handleLogin = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    try {
      await loginUser(email, senha); // Chama o loginUser do contexto

      if (user) {
        // Se o login for bem-sucedido, redireciona para /home
        navigate('/home');
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
