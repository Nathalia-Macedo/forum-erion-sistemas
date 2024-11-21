// import React from 'react'
// import { User } from 'lucide-react'
// import PropTypes from 'prop-types'


// const CategoryCard = ({ category, postCount }) => {
//   return (
//     <div className="category-card rounded-lg border bg-card text-card-foreground shadow-sm">
//       <div className="category-info p-4">
//         <h3 className="text-lg font-semibold">{category.titulo}</h3>
//         <p className="text-sm text-muted-foreground mt-1">{category.descricao}</p>
//         <span className="post-count text-xs text-muted-foreground mt-2 inline-block">
//           {postCount} posts
//         </span>
//       </div>
//       <div className="latest-post border-t p-4 flex items-center">
//         <div className="user-avatar mr-3">
//           <User size={24} className="text-muted-foreground" aria-hidden="true" />
//         </div>
//         <div className="post-info">
//           <p className="post-title text-sm font-medium">{category.subTitulo}</p>
//           <p className="post-meta text-xs text-muted-foreground">
//             Por: {category.criadoPor.nome}
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// CategoryCard.propTypes = {
//   category: PropTypes.shape({
//     idCategoria: PropTypes.string.isRequired,
//     titulo: PropTypes.string.isRequired,
//     subTitulo: PropTypes.string.isRequired,
//     descricao: PropTypes.string.isRequired,
//     criadoPor: PropTypes.shape({
//       idUsuario: PropTypes.string.isRequired,
//       nome: PropTypes.string.isRequired,
//       email: PropTypes.string.isRequired,
//       role: PropTypes.string.isRequired,
//       foto: PropTypes.string
//     }).isRequired
//   }).isRequired,
//   postCount: PropTypes.number.isRequired
// }

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
        <span className="post-count">{category.postCount} posts</span>
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