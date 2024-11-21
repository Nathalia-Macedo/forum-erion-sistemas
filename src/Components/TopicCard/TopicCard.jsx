// // TopicCard.js
// import React, { useState } from 'react';
// import './TopicCard.css';

// const TopicCard = ({ topico, descricao, criadoPor, respostas }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const toggleExpand = () => {
//     setIsExpanded(!isExpanded);
//   };

//   // Ensure criadoPor exists before accessing its properties
//   const authorName = criadoPor?.nome || 'Usuário Anônimo';
  
//   // Handle null respostas by converting to empty array
//   const responseCount = Array.isArray(respostas) ? respostas.length : 0;

//   return (
//     <div className={`topic-card ${isExpanded ? 'expanded' : ''}`} onClick={toggleExpand}>
//       <h2 className="topic-title">{topico}</h2>
//       <p className="topic-author">Por: {authorName}</p>
//       <p className={`topic-description ${isExpanded ? 'expanded' : ''}`}>{descricao}</p>
//       <div className="topic-footer">
//         <button className="reply-button" onClick={(e) => e.stopPropagation()}>
//           Responder ({responseCount})
//         </button>
//         <div className="like-section">
//           <button className="like-button" onClick={(e) => e.stopPropagation()}>
//             <svg 
//               xmlns="http://www.w3.org/2000/svg" 
//               width="16" 
//               height="16" 
//               viewBox="0 0 24 24" 
//               fill="none" 
//               stroke="currentColor" 
//               strokeWidth="2"
//               strokeLinecap="round" 
//               strokeLinejoin="round"
//             >
//               <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
//             </svg>
//             <span>5</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TopicCard;
import React from 'react';
import { User } from 'lucide-react';
import './TopicCard.css'; // You'll need to create this CSS file

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