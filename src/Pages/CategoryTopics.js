import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NewCategoryModal from '../Components/AddCategory/AddCategory';
import NewTopicModal from '../Components/AddTopic/AddTopic';
import CategoryCard from '../Components/CategoryCard/CategoryCard';
import TopicCard from '../Components/TopicCard/TopicCard';
import { ForumContext } from '../Context/Dados';
import Header from '../Components/Header/Header';

const CategoryTopics = () => {
  const { categoryId } = useParams();
  const { categories, topicos, fetchTopicos } = useContext(ForumContext);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryTopics, setCategoryTopics] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    fetchTopicos();
  }, []);

  useEffect(() => {
    if (topicos.length > 0 && categoryId) {
      const filteredTopics = topicos.filter(topic => topic.categoria.idCategoria === categoryId);
      setCategoryTopics(filteredTopics);
    }
    const category = categories.find(cat => cat.idCategoria === categoryId);
    setCurrentCategory(category);
  }, [categoryId, topicos, categories]);

  return (
    <div className="min-h-screen bg-[#0A0E45] p-5 font-['Poppins',sans-serif]">
      <Header />
      <div className="mt-8 space-y-4">
        {categoryTopics.map((topic) => (
          <TopicCard key={topic.idTopico} topic={topic} />
        ))}
      </div>

      <NewTopicModal 
        isOpen={isTopicModalOpen} 
        onClose={() => setIsTopicModalOpen(false)}
        categoryId={categoryId}
      />

      <NewCategoryModal 
        isOpen={isCategoryModalOpen} 
        onClose={() => setIsCategoryModalOpen(false)} 
      />
    </div>
  );
};

export default CategoryTopics;

