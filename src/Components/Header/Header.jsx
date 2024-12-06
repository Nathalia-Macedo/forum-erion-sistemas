import React, { useState, useContext, useEffect, useRef } from 'react';
import { User, Search, LogOut, Plus, ArrowLeft } from 'lucide-react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
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

  const handleUser = () => {
    navigate('/user')
  }

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
      return 'Categorias em <span class="text-[#00C853]">alta</span>:';
    } else if (location.pathname.startsWith('/category/')) {
      const category = categories.find(cat => cat.idCategoria === categoryId);
      return category ? `Tópicos da categoria <span class="text-[#00C853]">${category.titulo}</span>:` : 'Tópicos da categoria:';
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
    <div className="bg-[#0A0E45] p-5">
      <header className="flex justify-between items-center mb-5">
        <h1 className="text-white text-2xl font-semibold">ERION SISTEMAS</h1>
        <div className="flex space-x-4">
          {isTopicsPage && (
            <ArrowLeft 
              className="text-white cursor-pointer"
              onClick={handleBack}
            />
          )}
          <User onClick={handleUser} className="text-white cursor-pointer"/>
          <Search className="text-white cursor-pointer"/>
          <LogOut onClick={handleLogout} className="text-white cursor-pointer"/>
        </div>
      </header>

      <div className="relative mb-5" ref={searchRef}>
        <input 
          type="text" 
          placeholder="O que você está procurando?" 
          className="w-full p-2 rounded-md text-sm focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleSearchFocus}
        />
        {isSearchFocused && searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-md max-h-[300px] overflow-y-auto z-10">
            {searchResults.map((result, index) => (
              <div 
                key={index} 
                className="p-2 cursor-pointer hover:bg-gray-100 border-b border-gray-200 last:border-b-0"
                onClick={() => handleSearchItemClick(result)}
              >
                <p className="text-xs text-gray-600">{result.type}</p>
                <p className="font-bold">{result.titulo || result.nome}</p>
                {result.type === 'Tópico' && (
                  <p className="text-sm text-gray-700">{result.descricao.substring(0, 100)}...</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5">
        <h2 className="text-white text-lg font-medium mb-2 sm:mb-0" dangerouslySetInnerHTML={{ __html: getHeaderText() }}></h2>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button 
            className="flex items-center justify-center gap-1 bg-[#0A0E45] text-white border border-white rounded-md px-3 py-2 text-sm font-medium hover:bg-white hover:text-[#0A0E45] transition-colors"
            onClick={() => setIsTopicModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Criar novo tópico
          </button>
          <button 
            className="flex items-center justify-center gap-1 bg-[#0A0E45] text-white border border-white rounded-md px-3 py-2 text-sm font-medium hover:bg-white hover:text-[#0A0E45] transition-colors"
            onClick={() => setIsCategoryModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Criar nova Categoria
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

