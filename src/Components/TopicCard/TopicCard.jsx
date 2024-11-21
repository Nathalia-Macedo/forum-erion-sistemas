import React from 'react';
import { User } from 'lucide-react';
import './TopicCard.css';

const TopicCard = ({ topic }) => {
  return (
    <div className="topic-card">
      <h3 className="topic-title">{topic.topico}</h3>
      <p className="topic-description">{topic.descricao}</p>
      <div className="topic-meta">
        <div className="user-info">
          <User size={16} />
          <span>{topic.criadoPor.nome}</span>
        </div>
        <span className="response-count">{topic.respostas.length} respostas</span>
      </div>
    </div>
  );
};

export default TopicCard;