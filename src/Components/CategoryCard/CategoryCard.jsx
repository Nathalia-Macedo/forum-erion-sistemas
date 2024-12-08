import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/category/${category.idCategoria}`);
  };

  return (
    <div 
      className="bg-white rounded-lg p-5 flex flex-col sm:flex-row justify-between items-start mb-4 cursor-pointer hover:shadow-md transition-shadow duration-200"
      onClick={handleCardClick}
    >
      <div className="category-info w-full sm:w-2/3 mb-4 sm:mb-0">
        <h3 className="text-[#0A0E45] text-lg font-semibold mb-1">{category.titulo}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{category.descricao}</p>
        <span className="text-[#00C853] text-sm font-medium">{category.postCount || 0} posts</span>
      </div>
      <div className="latest-post flex items-center gap-3 w-full sm:w-1/3">
        <div className="user-avatar w-10 h-10 bg-gray-100 rounded-full flex justify-center items-center text-gray-500">
          <User size={24} />
        </div>
        <div className="post-info overflow-hidden">
          <p className="post-title text-sm font-medium text-gray-700 mb-1 truncate">{category.subTitulo}</p>
          <p className="post-meta text-xs text-gray-500 truncate">
            Por: {category.criadoPor.nome}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;

