// import React, { useState, useContext } from 'react';
// import { ForumContext } from '../../Context/Dados';
// import { toast } from 'react-toastify';

// function NewCategoryModal({ isOpen, onClose, onCategoryCreated }) {
//   const [title, setTitle] = useState('');
//   const [subtitle, setSubtitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const { criarCategoria, user } = useContext(ForumContext);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user) {
//       console.error('Usuário não está autenticado');
//       toast.error('Usuário não está autenticado');
//       return;
//     }
//     setIsLoading(true);
//     try {
//       const novaCategoria = await criarCategoria(title, subtitle, description);
//       console.log('Categoria criada com sucesso', novaCategoria);
//       toast.success('Categoria criada com sucesso!');
//       setIsLoading(false);
//       handleClose();
//       if (onCategoryCreated) {
//         onCategoryCreated(novaCategoria);
//       }
//     } catch (error) {
//       console.error('Erro ao criar categoria:', error);
//       toast.error('Erro ao criar categoria');
//       setIsLoading(false);
//     }
//   };

//   const handleClose = () => {
//     setTitle('');
//     setSubtitle('');
//     setDescription('');
//     onClose();
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit(e);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-[#0A0E45] rounded-lg p-6 w-11/12 max-w-lg">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold text-white">Adicionar nova categoria</h2>
//           <button 
//             onClick={handleClose} 
//             className="text-white hover:text-gray-300 transition-colors"
//             disabled={isLoading}
//           >
//             &#x2715;
//           </button>
//         </div>
        
//         <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
//           <div className="mb-5">
//             <label htmlFor="title" className="block mb-2 text-sm font-medium text-white">Título:</label>
//             <input
//               id="title"
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//               disabled={isLoading}
//               className="w-full p-3 rounded-lg text-sm text-black"
//             />
//           </div>
//           <div className="mb-5">
//             <label htmlFor="subtitle" className="block mb-2 text-sm font-medium text-white">Subtítulo:</label>
//             <input
//               id="subtitle"
//               type="text"
//               value={subtitle}
//               onChange={(e) => setSubtitle(e.target.value)}
//               required
//               disabled={isLoading}
//               className="w-full p-3 rounded-lg text-sm text-black"
//             />
//           </div>
//           <div className="mb-5">
//             <label htmlFor="description" className="block mb-2 text-sm font-medium text-white">Descrição:</label>
//             <textarea
//               id="description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//               disabled={isLoading}
//               className="w-full p-3 rounded-lg text-sm text-black h-36 resize-y"
//             />
//           </div>
//           <button 
//             type="submit" 
//             className="w-full bg-[#00C853] text-white rounded-lg py-3 text-base font-medium hover:bg-[#00a847] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//             disabled={isLoading}
//           >
//             {isLoading ? 'Carregando...' : 'Postar categoria'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default NewCategoryModal;


import React, { useState, useContext } from 'react';
import { ForumContext } from '../../Context/Dados';
import { toast } from 'react-toastify';

function NewCategoryModal({ isOpen, onClose, onCategoryCreated }) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { criarCategoria, user } = useContext(ForumContext);

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Título é obrigatório';
    if (!subtitle.trim()) newErrors.subtitle = 'Subtítulo é obrigatório';
    if (!description.trim()) newErrors.description = 'Descrição é obrigatória';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!user) {
      console.error('Usuário não está autenticado');
      toast.error('Usuário não está autenticado');
      return;
    }
    setIsLoading(true);
    try {
      const novaCategoria = await criarCategoria(title, subtitle, description);
      console.log('Categoria criada com sucesso', novaCategoria);
      toast.success('Categoria criada com sucesso!');
      setIsLoading(false);
      handleClose();
      if (onCategoryCreated) {
        onCategoryCreated(novaCategoria);
      }
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      toast.error('Erro ao criar categoria');
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setTitle('');
    setSubtitle('');
    setDescription('');
    setErrors({});
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#0A0E45] rounded-lg p-6 w-11/12 max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">Adicionar nova categoria</h2>
          <button 
            onClick={handleClose} 
            className="text-white hover:text-gray-300 transition-colors"
            disabled={isLoading}
          >
            &#x2715;
          </button>
        </div>
        
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
          <div className="mb-5">
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-white">Título:</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={isLoading}
              className="w-full p-3 rounded-lg text-sm text-black"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>
          <div className="mb-5">
            <label htmlFor="subtitle" className="block mb-2 text-sm font-medium text-white">Subtítulo:</label>
            <input
              id="subtitle"
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              required
              disabled={isLoading}
              className="w-full p-3 rounded-lg text-sm text-black"
            />
            {errors.subtitle && <p className="text-red-500 text-xs mt-1">{errors.subtitle}</p>}
          </div>
          <div className="mb-5">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-white">Descrição:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              disabled={isLoading}
              className="w-full p-3 rounded-lg text-sm text-black h-36 resize-y"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>
          <button 
            type="submit" 
            className="w-full bg-[#00C853] text-white rounded-lg py-3 text-base font-medium hover:bg-[#00a847] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Carregando...' : 'Postar categoria'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewCategoryModal;

