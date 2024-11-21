// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { User } from 'lucide-react';
// import './CategoryCard.css';

// const CategoryCard = ({ category }) => {
//   const navigate = useNavigate();

//   const handleCardClick = () => {
//     navigate(`/category/${category.idCategoria}`);
//   };

//   return (
//     <div className="category-card" onClick={handleCardClick}>
//       <div className="category-info">
//         <h3>{category.titulo}</h3>
//         <p>{category.descricao}</p>
//         <span className="post-count">{category.postCount} posts</span>
//       </div>
//       <div className="latest-post">
//         <div className="user-avatar">
//           <User size={24} />
//         </div>
//         <div className="post-info">
//           <p className="post-title">{category.subTitulo}</p>
//           <p className="post-meta">
//             Por: {category.criadoPor.nome}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryCard;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import './CategoryCard.css';

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/category/${category.idCategoria}`);
  };

  return (
    <div className="category-card" onClick={handleCardClick}>
      <div className="category-info">
        <h3>{category.titulo}</h3>
        <p>{category.descricao}</p>
        <span className="post-count">{category.postCount || 0} posts</span>
      </div>
      <div className="latest-post">
        <div className="user-avatar">
          <User size={24} />
        </div>
        <div className="post-info">
          <p className="post-title">{category.subTitulo}</p>
          <p className="post-meta">
            Por: {category.criadoPor.nome}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;