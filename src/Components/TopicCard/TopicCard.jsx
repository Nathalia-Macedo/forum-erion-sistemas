
// import React, { useState } from 'react';
// import { User, ThumbsUp, MessageCircle } from 'lucide-react';
// import './TopicCard.css';

// const TopicCard = ({ topic }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('pt-BR');
//   };

//   const toggleExpand = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <div className={`topic-card ${isExpanded ? 'expanded' : ''}`} onClick={toggleExpand}>
//       <h3 className="topic-title">{topic.topico}</h3>
//       <p className="topic-author">
//         Por: {topic.criadoPor.nome} • {formatDate(topic.criadoEm)}
//       </p>
//       <p className={`topic-description ${isExpanded ? 'expanded' : ''}`}>{topic.descricao}</p>
      
//       <div className="topic-footer">
//         <button className="reply-button" onClick={(e) => e.stopPropagation()}>
//           <MessageCircle size={16} className="reply-icon" />
//           <span>Responder ({topic.respostas.length})</span>
//         </button>
        
//         <div className="like-section">
//           <button className="like-button" onClick={(e) => e.stopPropagation()}>
//             <ThumbsUp size={16} />
//             <span>5</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TopicCard;
import React, { useState } from 'react';
import { User, ThumbsUp, MessageCircle } from 'lucide-react';
import './TopicCard.css';

const TopicCard = ({ topic }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const toggleExpand = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`topic-card ${isExpanded ? 'expanded' : ''}`} onClick={toggleExpand}>
      <h3 className="topic-title">{topic.topico}</h3>
      <p className="topic-author">
        Por: {topic.criadoPor.nome} • {formatDate(topic.criadoEm)}
      </p>
      <p className={`topic-description ${isExpanded ? 'expanded' : ''}`}>{topic.descricao}</p>
      
      <div className="topic-footer">
        <button className="reply-button" onClick={(e) => e.stopPropagation()}>
          <MessageCircle size={16} className="reply-icon" />
          <span>Responder ({topic.respostas.length})</span>
        </button>
        
        <div className="like-section">
          <button className="like-button" onClick={(e) => e.stopPropagation()}>
            <ThumbsUp size={16} />
            <span>5</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopicCard;