// Header.js
import React, { useState } from 'react';
import { User, Search, LogOut, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Header.css';
import NewCategoryModal from '../AddCategory/AddCategory';
import NewTopicModal from '../AddTopic/AddTopic';
import { ForumContext } from '../../Context/Dados';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);


  const { logout } = useContext(ForumContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redireciona para a página inicial após o logout
  };

  const handleCloseTopicModal = () => {
    setIsTopicModalOpen(false);
  };

  const handleCloseCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };

  return (
    <div className="header-container">
      <header className="forum-header">
        <h1>ERION SISTEMAS</h1>
        <div className='icons'>
          <User style={{color:"white"}}/>
          <Search style={{color:"white"}}/>
          <LogOut onClick={handleLogout} style={{color:"white"}}/>
        </div>
      </header>

      <div className="search-container">
        <input type="text" placeholder="O que você está procurando?" className="search-input" />
      </div>

      <div className="categories-header">
        <h2>Categorias em <span className="highlight">alta</span>:</h2>
        <div className="button-group">
          <button className="create-button" onClick={() => setIsTopicModalOpen(true)}>
            <Plus/>Criar novo tópico
          </button>
          <button className="create-button" onClick={() => setIsCategoryModalOpen(true)}>
            <Plus/>Criar nova Categoria
          </button>
        </div>
      </div>

      <NewTopicModal 
        isOpen={isTopicModalOpen} 
        onClose={handleCloseTopicModal} 
      />
      <NewCategoryModal 
        isOpen={isCategoryModalOpen} 
        onClose={handleCloseCategoryModal} 
      />
    </div>
  );
};

export default Header;