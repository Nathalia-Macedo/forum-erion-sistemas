import React, { useState, useContext, useEffect } from 'react';
import { X } from 'lucide-react';
import { ForumContext } from '../../Context/Dados';
import { toast } from 'react-toastify';

const EditCategoryModal = ({ isOpen, onClose, category }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { editarCategoria } = useContext(ForumContext);

  useEffect(() => {
    if (category) {
      setTitle(category.titulo);
      setSubtitle(category.subTitulo);
      setDescription(category.descricao);
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await editarCategoria(category.idCategoria, title, subtitle, description);
      toast.success('Categoria editada com sucesso!');
      onClose();
    } catch (error) {
      console.error('Erro ao editar categoria:', error);
      toast.error(error.message || 'Erro ao editar categoria');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#0A0E45] rounded-lg p-6 w-11/12 max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">Editar categoria</h2>
          <button 
            onClick={onClose} 
            className="text-white hover:text-gray-300 transition-colors"
            disabled={isLoading}
          >
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
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
          </div>
          <button 
            type="submit" 
            className="w-full bg-[#00C853] text-white rounded-lg py-3 text-base font-medium hover:bg-[#00a847] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Salvando...' : 'Salvar alterações'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditCategoryModal;

