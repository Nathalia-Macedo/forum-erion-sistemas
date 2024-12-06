// import React, { useState } from 'react';
// import { X, Eye, EyeOff } from 'lucide-react';

// const PasswordChangeModal = ({ isOpen, onClose, onSubmit }) => {
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (newPassword !== confirmPassword) {
//       setError('As senhas não coincidem');
//       return;
//     }

//     if (newPassword.length < 6) {
//       setError('A nova senha deve ter pelo menos 6 caracteres');
//       return;
//     }

//     try {
//       await onSubmit(currentPassword, newPassword);
//       onClose();
//       // Reset form
//       setCurrentPassword('');
//       setNewPassword('');
//       setConfirmPassword('');
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//         >
//           <X size={24} />
//         </button>

//         <h2 className="text-2xl font-bold mb-4">Alterar Senha</h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {error && (
//             <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
//               {error}
//             </div>
//           )}

//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700">
//               Senha Atual
//             </label>
//             <div className="relative">
//               <input
//                 type={showCurrentPassword ? "text" : "password"}
//                 value={currentPassword}
//                 onChange={(e) => setCurrentPassword(e.target.value)}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowCurrentPassword(!showCurrentPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//               >
//                 {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//               </button>
//             </div>
//           </div>

//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700">
//               Nova Senha
//             </label>
//             <div className="relative">
//               <input
//                 type={showNewPassword ? "text" : "password"}
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowNewPassword(!showNewPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//               >
//                 {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//               </button>
//             </div>
//           </div>

//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700">
//               Confirmar Nova Senha
//             </label>
//             <div className="relative">
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//               >
//                 {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//               </button>
//             </div>
//           </div>

//           <div className="flex justify-end space-x-2 pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
//             >
//               Cancelar
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
//             >
//               Salvar
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PasswordChangeModal;

import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';

const PasswordChangeModal = ({ isOpen, onClose, onSubmit, userName, userId }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (newPassword.length < 6) {
      setError('A nova senha deve ter pelo menos 6 caracteres');
      return;
    }

    try {
      await onSubmit(userId, currentPassword, newPassword);
      onClose();
      // Reset form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-4">Alterar Senha para {userName}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Senha Atual
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Nova Senha
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Confirmar Nova Senha
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordChangeModal;

