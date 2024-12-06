// import React, { useState, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Login.css';
// import { ForumContext } from '../Context/Dados';

// function Cadastro() {
//   const { cadastrarUsuario } = useContext(ForumContext);
//   const [nome, setNome] = useState('');
//   const [cpf, setCpf] = useState('');
//   const [email, setEmail] = useState('');
//   const [senha, setSenha] = useState('');
//   const [confirmarSenha, setConfirmarSenha] = useState('');
//   const [erro, setErro] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (senha !== confirmarSenha) {
//       setErro('As senhas não coincidem');
//       return;
//     }

//     try {
//       const data = await cadastrarUsuario(nome, cpf, email, senha);
//       if (data) {
//         navigate('/home');
//       }
//     } catch (error) {
//       setErro('Erro ao cadastrar usuário');
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSubmit(e);
//     }
//   };

//   return (
//     <section className="container-login">
//       <div className="login-form">
//         <form onSubmit={handleSubmit} className="form-content">
//           <h1 className="login-title">Cadastro</h1>
//           <p className="login-subtitle">Insira seus dados para criar uma conta</p>

//           {erro && <p className="error-message">{erro}</p>}

//           <div className="inputs">
//             <label className="label" htmlFor="nome">Nome:</label>
//             <input
//               type="text"
//               id="nome"
//               value={nome}
//               onChange={(e) => setNome(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder="Seu nome"
//               className="input-field"
//             />

//             <label className="label" htmlFor="cpf">CPF:</label>
//             <input
//               type="text"
//               id="cpf"
//               value={cpf}
//               onChange={(e) => setCpf(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder="Seu CPF"
//               className="input-field"
//             />

//             <label className="label" htmlFor="email">Email:</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder="name@example.com"
//               className="input-field"
//             />

//             <label className="label" htmlFor="senha">Senha:</label>
//             <input
//               type="password"
//               id="senha"
//               value={senha}
//               onChange={(e) => setSenha(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder="••••••••"
//               className="input-field"
//             />

//             <label className="label" htmlFor="confirmar-senha">Confirmação de Senha:</label>
//             <input
//               type="password"
//               id="confirmar-senha"
//               value={confirmarSenha}
//               onChange={(e) => setConfirmarSenha(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder="••••••••"
//               className="input-field"
//             />
//           </div>

//           <button type="submit" className="login-button">Cadastrar</button>

//           <p className="login-subtitle">Já tem conta? <Link to="/" className="create-account">Faça Login</Link></p>
//         </form>
//       </div>
//     </section>
//   );
// }

// export default Cadastro;

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ForumContext } from '../Context/Dados';
import { toast } from 'react-toastify';

function Cadastro() {
  const { cadastrarUsuario } = useContext(ForumContext);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (senha !== confirmarSenha) {
      toast.error('As senhas não coincidem');
      setIsLoading(false);
      return;
    }

    try {
      const data = await cadastrarUsuario(nome, cpf, email, senha);
      if (data) {
        navigate('/account-activation-pending');
      }
    } catch (error) {
      toast.error('Erro ao cadastrar usuário: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <section className="min-h-screen bg-[#0A0E45] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Cadastro</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Insira seus dados para criar uma conta
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="nome" className="sr-only">Nome</label>
              <input
                id="nome"
                name="nome"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#00C853] focus:border-[#00C853] focus:z-10 sm:text-sm"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <div>
              <label htmlFor="cpf" className="sr-only">CPF</label>
              <input
                id="cpf"
                name="cpf"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#00C853] focus:border-[#00C853] focus:z-10 sm:text-sm"
                placeholder="CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#00C853] focus:border-[#00C853] focus:z-10 sm:text-sm"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <div>
              <label htmlFor="senha" className="sr-only">Senha</label>
              <input
                id="senha"
                name="senha"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#00C853] focus:border-[#00C853] focus:z-10 sm:text-sm"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <div>
              <label htmlFor="confirmar-senha" className="sr-only">Confirmação de Senha</label>
              <input
                id="confirmar-senha"
                name="confirmar-senha"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#00C853] focus:border-[#00C853] focus:z-10 sm:text-sm"
                placeholder="Confirmação de Senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#00C853] hover:bg-[#00A041] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00C853]"
            >
              {isLoading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <Link to="/" className="font-medium text-[#00C853] hover:text-[#00A041]">
            Já tem conta? Faça Login
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Cadastro;

