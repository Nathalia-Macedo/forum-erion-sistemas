import React, { useContext, useState } from 'react';
import './ForumHome.css';
import NewCategoryModal from '../Components/AddCategory/AddCategory';
import { Plus, User, Search, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import CategoryCard from '../Components/CategoryCard/CategoryCard';
import { ForumContext } from '../Context/Dados';
import NewTopicModal from '../Components/AddTopic/AddTopic';
import Header from '../Components/Header/Header';
const ForumHome = () => {
  const { categories } = useContext(ForumContext);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  return (
    <div className="forum-container">
      <Header/>

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
