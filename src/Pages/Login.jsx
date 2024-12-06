// import React, { useState, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { ForumContext } from '../Context/Dados';
// import './Login.css';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [senha, setSenha] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const { loginUser, user } = useContext(ForumContext);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     try {
//       const userData = await loginUser(email, senha);
//       let token = localStorage.getItem("authToken");
//       if (token) {
//         navigate('/home');
//       } else {
//         setError('Email ou senha inválidos');
//       }
//     } catch (err) {
//       setError('Erro ao fazer login. Tente novamente.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleLogin(e);
//     }
//   };

//   return (
//     <section className="container-login">
//       <div className="login-form">
//         <form onSubmit={handleLogin} className="form-content">
//           <h1 className="login-title">Login</h1>
//           <p className="login-subtitle">Insira suas credenciais para acessar sua conta</p>
          
//           <div className="inputs">
//             <label className="label" htmlFor="email">Email:</label>
//             <input 
//               type="email" 
//               id="email" 
//               placeholder="name@example.com" 
//               className="input-field" 
//               value={email} 
//               onChange={(e) => setEmail(e.target.value)}
//               onKeyPress={handleKeyPress}
//             />

//             <label className="label" htmlFor="password">Senha:</label>
//             <input 
//               type="password" 
//               id="password" 
//               placeholder="••••••••" 
//               className="input-field" 
//               value={senha} 
//               onChange={(e) => setSenha(e.target.value)}
//               onKeyPress={handleKeyPress}
//             />
//           </div>
//           <a href="#" className="forgot-password">Esqueceu sua senha?</a>
//           <button 
//             type="submit" 
//             className="login-button" 
//             disabled={isLoading}
//           >
//             {isLoading ? 'Carregando...' : 'Login'}
//           </button>

//           {error && <p className="error-message">{error}</p>}

//           <Link to="/cadastro" className="create-account">CRIAR CONTA</Link>
//         </form>
//       </div>
//     </section>
//   );
// }

// export default Login;
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ForumContext } from '../Context/Dados';

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
    <section className="flex justify-center items-center min-h-screen bg-[#0A0E45] p-5">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <form onSubmit={handleLogin} className="flex flex-col">
          <h1 className="text-2xl font-semibold text-black mb-2 text-left">Login</h1>
          <p className="text-sm text-gray-600 mb-6 text-left">Insira suas credenciais para acessar sua conta</p>
          
          <div className="flex flex-col items-start mb-4">
            <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              placeholder="name@example.com" 
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#00C853]" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>

          <div className="flex flex-col items-start mb-4">
            <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="password">Senha:</label>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••" 
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#00C853]" 
              value={senha} 
              onChange={(e) => setSenha(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>

          <a href="#" className="text-xs text-gray-500 hover:text-[#0A0E45] text-right mb-4">Esqueceu sua senha?</a>
          
          <button 
            type="submit" 
            className={`bg-[#00C853] text-white font-medium text-sm py-2 px-4 rounded-md hover:bg-[#52f596] transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Carregando...' : 'Login'}
          </button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <Link to="/cadastro" className="text-gray-500 hover:text-[#0A0E45] text-sm font-medium mt-4 text-center underline">
            CRIAR CONTA
          </Link>
        </form>
      </div>
    </section>
  );
}

export default Login;


