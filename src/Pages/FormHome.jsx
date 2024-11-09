import React from 'react';
import './ForumHome.css';
import { Plus, User, Search } from 'lucide-react';
import { LogOut } from 'lucide-react';
const ForumHome = () => {
  const categories = [
    {
      title: "Programming",
      description: "Discuss programming languages and techniques",
      posts: 150,
      latestPost: {
        title: "Aprendendo o conceito de API",
        author: "Nathalia Macedo",
        timeAgo: "Há 7 horas"
      }
    },
    {
      title: "Design",
      description: "Share and critique design work",
      posts: 89,
      latestPost: {
        title: "Conhecendo o Figma",
        author: "Nathalia Macedo",
        timeAgo: "Há 7 horas"
      }
    },
    {
      title: "Off-topic",
      description: "General discussion and community chat",
      posts: 203,
      latestPost: {
        title: "Um freela de repente...",
        author: "Nathalia Macedo",
        timeAgo: "Há 7 horas"
      }
    }
  ];

  return (
    <div className="forum-container">
      <header className="forum-header">
        <h1>ERION SISTEMAS</h1>
        <div className='icons'>
            <User style={{color:"white"}}/>
            <Search  style={{color:"white"}}/>
            <LogOut style={{color:"white"}}/>
        </div>
      </header>

      <div className="search-container">
        <input type="text" placeholder="O que você está procurando?" className="search-input" />
      </div>

      <div className="categories-header">
        <h2>Categorias em <span className="highlight">alta</span>:</h2>
        <div className="button-group">
          <button className="create-button"> <Plus/>Criar novo tópico</button>
          <button className="create-button"> <Plus/> Criar nova Categoria</button>
        </div>
      </div>

      <div className="categories-list">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <div className="category-info">
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <span className="post-count">{category.posts} posts</span>
            </div>
            <div className="latest-post">
              <div className="user-avatar"></div>
              <div className="post-info">
                <p className="post-title">{category.latestPost.title}</p>
                <p className="post-meta">
                  Por: {category.latestPost.author}, {category.latestPost.timeAgo}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumHome;