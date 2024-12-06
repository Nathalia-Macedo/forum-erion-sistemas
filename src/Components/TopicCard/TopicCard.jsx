// import React, { useState, useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ThumbsUp, MessageCircle } from 'lucide-react';
// import { ForumContext } from '../../Context/Dados';

// const TopicCard = ({ topic }) => {
//   const navigate = useNavigate();
//   const { criarCurtida, deletarCurtida, user } = useContext(ForumContext);
//   const [isLiked, setIsLiked] = useState(false);
//   const [likeCount, setLikeCount] = useState(topic.curtidas?.length || 0);

//   useEffect(() => {
//     setIsLiked(topic.curtidas?.some(curtida => curtida.curtidoPor.idUsuario === user?.idUsuario) || false);
//     setLikeCount(topic.curtidas?.length || 0);
//   }, [topic, user]);

//   const formatDate = (dateString) => {
//     const [datePart, timePart] = dateString.split(' ');
//     const [day, month, year] = datePart.split('/');
//     const [hour, minute, second] = timePart.split(':');
    
//     const date = new Date(year, month - 1, day, hour, minute, second);
    
//     return date.toLocaleDateString('pt-BR', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const handleCardClick = () => {
//     navigate(`/topic/${topic.idTopico}`);
//   };

//   const handleLikeClick = async (e) => {
//     e.stopPropagation();
//     try {
//       let success;
//       if (isLiked) {
//         success = await deletarCurtida(topic.idTopico);
//         if (success) {
//           setIsLiked(false);
//           setLikeCount(prevCount => prevCount - 1);
//         }
//       } else {
//         success = await criarCurtida(topic.idTopico);
//         if (success) {
//           setIsLiked(true);
//           setLikeCount(prevCount => prevCount + 1);
//         }
//       }
//     } catch (error) {
//       console.error('Erro ao gerenciar curtida:', error);
//       // You might want to show an error message to the user here
//     }
//   };

//   return (
//     <div 
//       className="bg-white rounded-lg p-5 shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:-translate-y-1 cursor-pointer flex flex-col"
//       onClick={handleCardClick}
//     >
//       <h3 className="text-xl font-semibold mb-2 text-gray-800">{topic.titulo}</h3>
//       <p className="text-sm text-gray-600 mb-3">
//         Por: {topic.criadoPor.nome} • {formatDate(topic.criadoEm)}
//       </p>
//       <p className="text-base text-gray-700 mb-4 line-clamp-3">{topic.descricao}</p>
      
//       <div className="mt-auto flex justify-between items-center">
//         <button 
//           className="flex items-center gap-2 bg-transparent border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 transition-colors duration-200"
//           onClick={(e) => {
//             e.stopPropagation();
//             handleCardClick();
//           }}
//         >
//           <MessageCircle size={16} className="flex-shrink-0" />
//           <span>Responder ({topic.respostas?.length || 0})</span>
//         </button>
        
//         <button 
//           className={`flex items-center gap-1 px-3 py-2 rounded-full transition-colors duration-200 ${
//             isLiked 
//               ? 'bg-blue-600 text-white hover:bg-blue-700' 
//               : 'bg-transparent text-gray-600 hover:bg-gray-100'
//           }`}
//           onClick={handleLikeClick}
//         >
//           <ThumbsUp size={16} />
//           <span>{likeCount}</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TopicCard;

import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThumbsUp, MessageCircle, User, Calendar } from 'lucide-react';
import { ForumContext } from '../../Context/Dados';

const TopicCard = ({ topic }) => {
  const navigate = useNavigate();
  const { criarCurtida, deletarCurtida, user } = useContext(ForumContext);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(topic.curtidas?.length || 0);

  useEffect(() => {
    setIsLiked(topic.curtidas?.some(curtida => curtida.curtidoPor.idUsuario === user?.idUsuario) || false);
    setLikeCount(topic.curtidas?.length || 0);
  }, [topic, user]);

  const formatDate = (dateString) => {
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('/');
    const [hour, minute, second] = timePart.split(':');
    
    const date = new Date(year, month - 1, day, hour, minute, second);
    
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCardClick = () => {
    navigate(`/topic/${topic.idTopico}`);
  };

  const handleLikeClick = async (e) => {
    e.stopPropagation();
    try {
      let success;
      if (isLiked) {
        success = await deletarCurtida(topic.idTopico);
        if (success) {
          setIsLiked(false);
          setLikeCount(prevCount => prevCount - 1);
        }
      } else {
        success = await criarCurtida(topic.idTopico);
        if (success) {
          setIsLiked(true);
          setLikeCount(prevCount => prevCount + 1);
        }
      }
    } catch (error) {
      console.error('Erro ao gerenciar curtida:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div 
      className="bg-white rounded-lg p-5 shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:-translate-y-1 cursor-pointer flex flex-col"
      onClick={handleCardClick}
    >
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{topic.titulo}</h3>
      <div className="flex items-center text-sm text-gray-600 mb-3">
        <User size={16} className="mr-1" />
        <span className="mr-2">{topic.criadoPor.nome}</span>
        <Calendar size={16} className="mr-1" />
        <span>{formatDate(topic.criadoEm)}</span>
      </div>
      <p className="text-base text-gray-700 mb-4 line-clamp-3">{topic.descricao}</p>
      
      <div className="mt-auto flex justify-between items-center">
        <button 
          className="flex items-center gap-2 bg-transparent border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 transition-colors duration-200"
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
        >
          <MessageCircle size={16} className="flex-shrink-0" />
          <span>Responder ({topic.respostas?.length || 0})</span>
        </button>
        
        <button 
          className={`flex items-center gap-1 px-3 py-2 rounded-full transition-colors duration-200 ${
            isLiked 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-transparent text-gray-600 hover:bg-gray-100'
          }`}
          onClick={handleLikeClick}
        >
          <ThumbsUp size={16} />
          <span>{likeCount}</span>
        </button>
      </div>
    </div>
  );
};

export default TopicCard;

