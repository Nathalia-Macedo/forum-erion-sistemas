

import React, { useContext, useState, useEffect } from 'react';
import './ForumHome.css';
import NewCategoryModal from '../Components/AddCategory/AddCategory';
import { Plus } from 'lucide-react';
import CategoryCard from '../Components/CategoryCard/CategoryCard';
import { ForumContext } from '../Context/Dados';
import NewTopicModal from '../Components/AddTopic/AddTopic';
import Header from '../Components/Header/Header';

const ForumHome = () => {
  const { categories, fetchCategories } = useContext(ForumContext);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleTopicCreated = () => {
    fetchCategories();
    setIsTopicModalOpen(false);
  };

  const handleCategoryCreated = () => {
    fetchCategories();
    setIsCategoryModalOpen(false);
  };

  return (
    <div className="forum-container">
      <Header/>

      <div className="categories-list">
        {categories.map((category) => (
          <CategoryCard key={category.idCategoria} category={category} />
        ))}
      </div>

      <NewTopicModal 
        isOpen={isTopicModalOpen} 
        onClose={() => setIsTopicModalOpen(false)}
        onTopicCreated={handleTopicCreated}
      />

      <NewCategoryModal 
        isOpen={isCategoryModalOpen} 
        onClose={() => setIsCategoryModalOpen(false)}
        onCategoryCreated={handleCategoryCreated}
      />
    </div>
  );
};

export default ForumHome;