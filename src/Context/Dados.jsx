import React, { createContext, useState } from 'react';

export const ForumContext = createContext();

export const ForumProvider = ({ children }) => {
  const [categories, setCategories] = useState([
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
  ]);

  return (
    <ForumContext.Provider value={{ categories, setCategories }}>
      {children}
    </ForumContext.Provider>
  );
};