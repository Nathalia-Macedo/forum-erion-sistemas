// ForumPage.js
import React, { useContext, useEffect } from 'react';
import { ForumContext } from '../Context/Dados';
import TopicCard from '../Components/TopicCard/TopicCard';
import './TopicPage.css';
import Header from '../Components/Header/Header';

const ForumPage = () => {
  const { topicos, fetchTopicos } = useContext(ForumContext);

  useEffect(() => {
    fetchTopicos();
  }, []);

  return (
    <>
    
    
    
    <Header/>
      <main className="forum-content">
        <div className="topics-grid">
          {topicos.map(topico => (
            <TopicCard
              key={topico.idTopico}
              {...topico}
            />
          ))}
        </div>
      </main>
    
    </>
    
  );
};

export default ForumPage;