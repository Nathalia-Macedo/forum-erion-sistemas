
// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ForumContext } from '../../Context/Dados';
// import { toast } from 'react-toastify';
// import { Mail } from 'lucide-react';
// import SimplifiedHeader from '../../Components/SimplifiedHeader/SimplifiedHeader';

// const PasswordChangeRequest = () => {
//   const [email, setEmail] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const { solicitarAlteracaoSenha } = useContext(ForumContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       await solicitarAlteracaoSenha(email);
//       toast.success('Solicitação enviada com sucesso! Verifique seu email para próximos passos.');
//       setEmail('');
//     } catch (error) {
//       toast.error(error.message || 'Erro ao solicitar alteração de senha');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       navigate('/login');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <SimplifiedHeader />
//       <div className="flex-grow flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//         <div className="sm:mx-auto sm:w-full sm:max-w-md">
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Solicitar alteração de senha
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Digite seu email para receber as instruções
//           </p>
//         </div>

//         <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//           <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//             <form className="space-y-6" onSubmit={handleSubmit}>
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                   Email
//                 </label>
//                 <div className="mt-1 relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Mail className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     required
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     placeholder="seu@email.com"
//                     disabled={isLoading}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
//                 >
//                   {isLoading ? 'Enviando...' : 'Enviar solicitação'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PasswordChangeRequest;

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ForumContext } from '../../Context/Dados';
import { toast } from 'react-toastify';
import { Mail } from 'lucide-react';
import SimplifiedHeader from '../../Components/SimplifiedHeader/SimplifiedHeader';

const PasswordChangeRequest = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { solicitarAlteracaoSenha } = useContext(ForumContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await solicitarAlteracaoSenha(email);
      toast.success('Solicitação enviada com sucesso! Verifique seu email para próximos passos.');
      setEmail('');
      navigate('/'); // Navigate to login page after successful submission
    } catch (error) {
      toast.error(error.message || 'Erro ao solicitar alteração de senha');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <SimplifiedHeader />
      <div className="flex-grow flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Solicitar alteração de senha
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Digite seu email para receber as instruções
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="seu@email.com"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Enviando...' : 'Enviar solicitação'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordChangeRequest;

