
// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ThumbsUp, MessageCircle } from 'lucide-react';
// import { ForumContext } from '../../Context/Dados';
// import './TopicCard.css';

// const TopicCard = ({ topic }) => {
//   const navigate = useNavigate();
//   const { criarCurtida } = useContext(ForumContext);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('pt-BR');
//   };

//   const handleCardClick = () => {
//     navigate(`/topic/${topic.idTopico}`);
//   };

//   const handleLikeClick = async (e) => {
//     e.stopPropagation(); // Prevent card click when clicking like button
//     try {
//       await criarCurtida(topic.idTopico);
//     } catch (error) {
//       console.error('Erro ao curtir tópico:', error);
//     }
//   };

//   // Get the number of likes, default to 0 if curtidas is undefined or empty
//   const likeCount = topic.curtidas?.length || 0;

//   return (
//     <div className="topic-card" onClick={handleCardClick}>
//       <h3 className="topic-title">{topic.titulo}</h3>
//       <p className="topic-author">
//         Por: {topic.criadoPor.nome} • {formatDate(topic.criadoEm)}
//       </p>
//       <p className="topic-description">{topic.descricao}</p>
      
//       <div className="topic-footer">
//         <button className="reply-button" onClick={(e) => e.stopPropagation()}>
//           <MessageCircle size={16} className="reply-icon" />
//           <span>Responder ({topic.respostas?.length || 0})</span>
//         </button>
        
//         <div className="like-section">
//           <button className="like-button" onClick={handleLikeClick}>
//             <ThumbsUp size={16} />
//             <span>{likeCount}</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TopicCard;

import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThumbsUp, MessageCircle } from 'lucide-react';
import { ForumContext } from '../../Context/Dados';
import './TopicCard.css';

const TopicCard = ({ topic }) => {
  const navigate = useNavigate();
  const { criarCurtida, user } = useContext(ForumContext);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(topic.curtidas?.length || 0);

  useEffect(() => {
    // Check if the current user has already liked this topic
    setIsLiked(topic.curtidas?.some(curtida => curtida.curtidoPor.idUsuario === user?.idUsuario) || false);
    setLikeCount(topic.curtidas?.length || 0);
  }, [topic, user]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const handleCardClick = () => {
    navigate(`/topic/${topic.idTopico}`);
  };

  const handleLikeClick = async (e) => {
    e.stopPropagation();
    try {
      const success = await criarCurtida(topic.idTopico);
      if (success) {
        setIsLiked(true);
        setLikeCount(prevCount => prevCount + 1);
      }
    } catch (error) {
      console.error('Erro ao curtir tópico:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className="topic-card" onClick={handleCardClick}>
      <h3 className="topic-title">{topic.titulo}</h3>
      <p className="topic-author">
        Por: {topic.criadoPor.nome} • {formatDate(topic.criadoEm)}
      </p>
      <p className="topic-description">{topic.descricao}</p>
      
      <div className="topic-footer">
        <button className="reply-button" onClick={(e) => e.stopPropagation()}>
          <MessageCircle size={16} className="reply-icon" />
          <span>Responder ({topic.respostas?.length || 0})</span>
        </button>
        
        <div className="like-section">
          <button 
            className={`like-button ${isLiked ? 'liked' : ''}`} 
            onClick={handleLikeClick}
            disabled={isLiked}
          >
            <ThumbsUp size={16} />
            <span>{likeCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopicCard;

