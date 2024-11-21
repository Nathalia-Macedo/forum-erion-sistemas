// import React, { useState, useContext } from 'react';
// import { User, Search, LogOut, Plus } from 'lucide-react';
// import { Link, useLocation, useParams } from 'react-router-dom';
// import './Header.css';
// import NewCategoryModal from '../AddCategory/AddCategory';
// import NewTopicModal from '../AddTopic/AddTopic';
// import { ForumContext } from '../../Context/Dados';
// import { useNavigate } from 'react-router-dom';

// const Header = () => {
//   const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
//   const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
//   const { logout, categories } = useContext(ForumContext);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { categoryId } = useParams();

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const handleCloseTopicModal = () => {
//     setIsTopicModalOpen(false);
//   };

//   const handleCloseCategoryModal = () => {
//     setIsCategoryModalOpen(false);
//   };

//   const getHeaderText = () => {
//     if (location.pathname === '/home') {
//       return 'Categorias em <span class="highlight">alta</span>:';
//     } else if (location.pathname.startsWith('/category/')) {
//       const category = categories.find(cat => cat.idCategoria === categoryId);
//       return category ? `Tópicos da categoria <span class="highlight">${category.titulo}</span>:` : 'Tópicos da categoria:';
//     }
//     return '';
//   };

//   return (
//     <div className="header-container">
//       <header className="forum-header">
//         <h1>ERION SISTEMAS</h1>
//         <div className='icons'>
//           <User style={{color:"white"}}/>
//           <Search style={{color:"white"}}/>
//           <LogOut onClick={handleLogout} style={{color:"white"}}/>
//         </div>
//       </header>

//       <div className="search-container">
//         <input type="text" placeholder="O que você está procurando?" className="search-input" />
//       </div>

//       <div className="categories-header">
//         <h2 dangerouslySetInnerHTML={{ __html: getHeaderText() }}></h2>
//         <div className="button-group">
//           <button className="create-button" onClick={() => setIsTopicModalOpen(true)}>
//             <Plus/>Criar novo tópico
//           </button>
//           <button className="create-button" onClick={() => setIsCategoryModalOpen(true)}>
//             <Plus/>Criar nova Categoria
//           </button>
//         </div>
//       </div>

//       <NewTopicModal 
//         isOpen={isTopicModalOpen} 
//         onClose={handleCloseTopicModal} 
//       />
//       <NewCategoryModal 
//         isOpen={isCategoryModalOpen} 
//         onClose={handleCloseCategoryModal} 
//       />
//     </div>
//   );
// };

// export default Header;
import React, { useState, useContext } from 'react';
import { User, Search, LogOut, Plus, ArrowLeft } from 'lucide-react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import './Header.css';
import NewCategoryModal from '../AddCategory/AddCategory';
import NewTopicModal from '../AddTopic/AddTopic';
import { ForumContext } from '../../Context/Dados';

const Header = () => {
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const { logout, categories } = useContext(ForumContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { categoryId } = useParams();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCloseTopicModal = () => {
    setIsTopicModalOpen(false);
  };

  const handleCloseCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };

  const handleBack = () => {
    navigate('/home');
  };

  const getHeaderText = () => {
    if (location.pathname === '/home') {
      return 'Categorias em <span class="highlight">alta</span>:';
    } else if (location.pathname.startsWith('/category/')) {
      const category = categories.find(cat => cat.idCategoria === categoryId);
      return category ? `Tópicos da categoria <span class="highlight">${category.titulo}</span>:` : 'Tópicos da categoria:';
    }
    return '';
  };

  const isTopicsPage = location.pathname.startsWith('/category/');

  return (
    <div className="header-container">
      <header className="forum-header">
        <h1>ERION SISTEMAS</h1>
        <div className='icons'>
          {isTopicsPage && (
            <ArrowLeft 
              style={{color: "white", cursor: "pointer"}} 
              onClick={handleBack}
            />
          )}
          <User style={{color:"white"}}/>
          <Search style={{color:"white"}}/>
          <LogOut onClick={handleLogout} style={{color:"white"}}/>
        </div>
      </header>

      <div className="search-container">
        <input type="text" placeholder="O que você está procurando?" className="search-input" />
      </div>

      <div className="categories-header">
        <h2 dangerouslySetInnerHTML={{ __html: getHeaderText() }}></h2>
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