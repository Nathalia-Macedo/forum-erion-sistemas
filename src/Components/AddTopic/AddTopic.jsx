import React, { useState, useContext } from 'react';
import { X, Link, FileText, Image } from 'lucide-react';
import './AddTopic.css';
import { ForumContext } from '../../Context/Dados';

const NewTopicModal = ({ isOpen, onClose }) => {
  const { categories, criarTopico } = useContext(ForumContext);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [links, setLinks] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const allFiles = [...files, ...images];
      const arquivo = allFiles.length > 0 ? allFiles[0] : null;
      await criarTopico(formData.title, formData.category, formData.description, arquivo, links);
      setIsLoading(false);
      onClose();
    } catch (error) {
      console.error('Erro ao criar tópico:', error);
      setIsLoading(false);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleLinkToggle = () => {
    setShowLinkInput(!showLinkInput);
  };

  const handleLinkSubmit = (e) => {
    e.preventDefault();
    if (linkUrl) {
      setLinks(prev => [...prev, linkUrl]);
      setLinkUrl('');
      setShowLinkInput(false);
    }
  };

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...uploadedFiles]);
  };

  const handleImageUpload = (e) => {
    const uploadedImages = Array.from(e.target.files);
    setImages(prev => [...prev, ...uploadedImages]);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Adicionar novo tópico</h2>
          <button onClick={onClose} className="close-button">
            <X size={24} color="white" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Título:</label>
            <input
              type="text"
              id="title"
              placeholder="Título"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Categoria:</label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              disabled={isLoading}
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((category) => (
                <option key={category.idCategoria} value={category.idCategoria}>
                  {category.titulo}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Descrição:</label>
            <textarea
              id="description"
              placeholder="Descrição aqui..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              disabled={isLoading}
            />
          </div>

          <div className="attachment-icons">
            <button type="button" onClick={handleLinkToggle} disabled={isLoading}>
              <Link size={20} />
            </button>
            <label htmlFor="file-upload" className="file-upload-label">
              <FileText size={20} />
              <input
                type="file"
                id="file-upload"
                onChange={handleFileUpload}
                disabled={isLoading}
                style={{ display: 'none' }}
              />
            </label>
            <label htmlFor="image-upload" className="file-upload-label">
              <Image size={20} />
              <input
                type="file"
                id="image-upload"
                onChange={handleImageUpload}
                accept="image/*"
                disabled={isLoading}
                style={{ display: 'none' }}
              />
            </label>
          </div>

          {showLinkInput && (
            <div className="link-input-container">
              <input
                type="url"
                placeholder="Insira o URL do link"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                disabled={isLoading}
              />
              <button type="button" onClick={handleLinkSubmit} disabled={isLoading}>
                Adicionar Link
              </button>
            </div>
          )}

          {(files.length > 0 || images.length > 0 || links.length > 0) && (
            <div className="file-list">
              <h4>Arquivos e links anexados:</h4>
              <ul>
                {files.map((file, index) => (
                  <li key={`file-${index}`}>{file.name}</li>
                ))}
                {images.map((image, index) => (
                  <li key={`image-${index}`}>{image.name}</li>
                ))}
                {links.map((link, index) => (
                  <li key={`link-${index}`}>{link}</li>
                ))}
              </ul>
              <p className="file-warning">Nota: Apenas o primeiro arquivo será enviado devido a limitações da API. Todos os links serão incluídos.</p>
            </div>
          )}

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Carregando...' : 'Postar tópico'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewTopicModal;

