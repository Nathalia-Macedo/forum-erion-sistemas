// import React, { useState, useContext, useEffect } from 'react';
// import { User, Search, LogOut, Plus, ArrowLeft } from 'lucide-react';
// import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
// import './Header.css';
// import NewCategoryModal from '../AddCategory/AddCategory';
// import NewTopicModal from '../AddTopic/AddTopic';
// import { ForumContext } from '../../Context/Dados';

// const Header = () => {
//   const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
//   const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const { logout, categories, searchAll } = useContext(ForumContext);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { categoryId } = useParams();

//   useEffect(() => {
//     if (searchTerm) {
//       const results = searchAll(searchTerm);
//       setSearchResults(results);
//     } else {
//       setSearchResults([]);
//     }
//   }, [searchTerm, searchAll]);

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

//   const handleBack = () => {
//     navigate('/home');
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

//   const isTopicsPage = location.pathname.startsWith('/category/');

//   return (
//     <div className="header-container">
//       <header className="forum-header">
//         <h1>ERION SISTEMAS</h1>
//         <div className='icons'>
//           {isTopicsPage && (
//             <ArrowLeft 
//               style={{color: "white", cursor: "pointer"}} 
//               onClick={handleBack}
//             />
//           )}
//           <User style={{color:"white"}}/>
//           <Search style={{color:"white"}}/>
//           <LogOut onClick={handleLogout} style={{color:"white"}}/>
//         </div>
//       </header>

//       <div className="search-container">
//         <input 
//           type="text" 
//           placeholder="O que você está procurando?" 
//           className="search-input" 
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {searchResults.length > 0 && (
//         <div className="search-results">
//           {searchResults.map((result, index) => (
//             <div key={index} className="search-result-item">
//               <p>{result.type}: {result.title || result.nome}</p>
//               {result.type === 'Tópico' && (
//                 <Link to={`/topic/${result.idTopico}`}>Ver tópico</Link>
//               )}
//               {result.type === 'Categoria' && (
//                 <Link to={`/category/${result.idCategoria}`}>Ver categoria</Link>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="categories-header">
//         <h2 dangerouslySetInnerHTML={{ __html: getHeaderText() }}></h2>
//         <div className="button-group">
//           <button className="create-button" onClick={() => setIsTopicModalOpen(true)}>
//             <Plus className="plus-icon"/>Criar novo tópico
//           </button>
//           <button className="create-button" onClick={() => setIsCategoryModalOpen(true)}>
//             <Plus className="plus-icon"/>Criar nova Categoria
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

import React, { useState, useContext, useEffect, useRef } from 'react';
import { User, Search, LogOut, Plus, ArrowLeft } from 'lucide-react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import './Header.css';
import NewCategoryModal from '../AddCategory/AddCategory';
import NewTopicModal from '../AddTopic/AddTopic';
import { ForumContext } from '../../Context/Dados';

const Header = () => {
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { logout, categories, searchAll } = useContext(ForumContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { categoryId } = useParams();
  const searchRef = useRef(null);

  useEffect(() => {
    if (searchTerm) {
      const results = searchAll(searchTerm);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, searchAll]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchItemClick = (result) => {
    setSearchTerm('');
    setIsSearchFocused(false);
    if (result.type === 'Tópico') {
      navigate(`/topic/${result.idTopico}`);
    } else if (result.type === 'Categoria') {
      navigate(`/category/${result.idCategoria}`);
    }
  };

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

      <div className="search-container" ref={searchRef}>
        <input 
          type="text" 
          placeholder="O que você está procurando?" 
          className="search-input" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleSearchFocus}
        />
        {isSearchFocused && searchResults.length > 0 && (
          <div className="search-results-menu">
            {searchResults.map((result, index) => (
              <div 
                key={index} 
                className="search-result-item"
                onClick={() => handleSearchItemClick(result)}
              >
                <p className="result-type">{result.type}</p>
                <p className="result-title">{result.titulo || result.nome}</p>
                {result.type === 'Tópico' && (
                  <p className="result-preview">{result.descricao.substring(0, 100)}...</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="categories-header">
        <h2 dangerouslySetInnerHTML={{ __html: getHeaderText() }}></h2>
        <div className="button-group">
          <button className="create-button" onClick={() => setIsTopicModalOpen(true)}>
            <Plus className="plus-icon"/>Criar novo tópico
          </button>
          <button className="create-button" onClick={() => setIsCategoryModalOpen(true)}>
            <Plus className="plus-icon"/>Criar nova Categoria
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


