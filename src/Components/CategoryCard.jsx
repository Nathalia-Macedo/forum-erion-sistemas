import React from 'react';
import { User } from 'lucide-react';
import './CategoryCard.css';

const CategoryCard = ({ category }) => {
  return (
    <div className="category-card">
      <div className="category-info">
        <h3>{category.title}</h3>
        <p>{category.description}</p>
        <span className="post-count">{category.posts} posts</span>
      </div>
      <div className="latest-post">
        <div className="user-avatar">
          <User size={24} />
        </div>
        <div className="post-info">
          <p className="post-title">{category.latestPost.title}</p>
          <p className="post-meta">
            Por: {category.latestPost.author}, {category.latestPost.timeAgo}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;