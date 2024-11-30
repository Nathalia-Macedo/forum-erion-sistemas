import React, { useState, useContext } from 'react';
import { ForumContext } from '../../Context/Dados';
import './AddCategory.css';

function NewCategoryModal({ isOpen, onClose }) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { criarCategoria, user } = useContext(ForumContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      console.error('Usuário não está autenticado');
      return;
    }
    setIsLoading(true);
    try {
      await criarCategoria(title, subtitle, description);
      console.log('Categoria criada com sucesso');
      setTitle('');
      setSubtitle('');
      setDescription('');
      setIsLoading(false);
      onClose();
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Adicionar nova categoria</h2>
          <button onClick={onClose} className="close-button" disabled={isLoading}>
            &#x2715;
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Título:</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="subtitle">Subtítulo:</label>
            <input
              id="subtitle"
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descrição:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Carregando...' : 'Postar categoria'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewCategoryModal;