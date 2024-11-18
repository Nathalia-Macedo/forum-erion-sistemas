
// // ForumHome.jsx
// import React, { useContext, useState } from 'react';
// import './ForumHome.css';
// import NewCategoryModal from '../Components/AddCategory/AddCategory';
// import { Plus, User, Search, LogOut } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import CategoryCard from '../Components/CategoryCard/CategoryCard';
// import { ForumContext } from '../Context/Dados';
// import NewTopicModal from '../Components/AddTopic/AddTopic';
// const ForumHome = () => {
//   const { categories } = useContext(ForumContext);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <div className="forum-container">
//       <header className="forum-header">
//         <h1>ERION SISTEMAS</h1>
//         <div className='icons'>
//           <User style={{color:"white"}}/>
//           <Search style={{color:"white"}}/>
//           <Link to="/"><LogOut style={{color:"white"}}/></Link>
//         </div>
//       </header>

//       <div className="search-container">
//         <input type="text" placeholder="O que você está procurando?" className="search-input" />
//       </div>

//       <div className="categories-header">
//         <h2>Categorias em <span className="highlight">alta</span>:</h2>
//         <div className="button-group">
//           <button className="create-button" onClick={() => setIsModalOpen(true)}>
//             <Plus/>Criar novo tópico
//           </button>
//          <button className="create-button" onClick={() => setIsCategoryModalOpen(true)}>
//             <Plus/>Criar nova Categoria
//           </button>
//         </div>
//       </div>

//       <div className="categories-list">
//         {categories.map((category, index) => (
//           <CategoryCard key={index} category={category} />
//         ))}
//       </div>

//       <NewTopicModal 
//         isOpen={isModalOpen} 
//         onClose={() => setIsModalOpen(false)} 
//       />
//     </div>
//   );
// };

// export default ForumHome;

import React, { useContext, useState } from 'react';
import './ForumHome.css';
import NewCategoryModal from '../Components/AddCategory/AddCategory';
import { Plus, User, Search, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import CategoryCard from '../Components/CategoryCard/CategoryCard';
import { ForumContext } from '../Context/Dados';
import NewTopicModal from '../Components/AddTopic/AddTopic';

const ForumHome = () => {
  const { categories } = useContext(ForumContext);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  return (
    <div className="forum-container">
      <header className="forum-header">
        <h1>ERION SISTEMAS</h1>
        <div className='icons'>
          <User style={{color:"white"}}/>
          <Search style={{color:"white"}}/>
          <Link to="/"><LogOut style={{color:"white"}}/></Link>
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

      <div className="categories-list">
        {categories.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>

      <NewTopicModal 
        isOpen={isTopicModalOpen} 
        onClose={() => setIsTopicModalOpen(false)} 
      />

      <NewCategoryModal 
        isOpen={isCategoryModalOpen} 
        onClose={() => setIsCategoryModalOpen(false)} 
      />
    </div>
  );
};

export default ForumHome;