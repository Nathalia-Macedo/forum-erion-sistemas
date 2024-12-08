import React, { useState, useEffect } from 'react';
import { ThumbsUp, MessageCircle, User, Calendar } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const TopicCard = ({ topic }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false); 
  const [likeCount, setLikeCount] = useState(topic.curtidas?.length || 0); 

  const handleCardClick = () => {
    navigate(`/topic/${topic.idTopico}`);
  };

  const handleLikeClick = async (e) => {
    e.preventDefault();
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
    }
  };

  useEffect(() => {
  }, []);

  const formatDate = (dateString) => {
    const [datePart] = dateString.split(' ');
    return datePart;
  };


  return (
    <div 
      className="bg-white rounded-lg p-5 shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:-translate-y-1 flex flex-col cursor-pointer"
      onClick={handleCardClick}
    >
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{topic.titulo}</h3>
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <User size={16} className="mr-1" />
          <Link 
            to={`/user/${topic.criadoPor.idUsuario}`}
            className="mr-2 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {topic.criadoPor.nome}
          </Link>
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

const criarCurtida = async (topicId) => {
  console.log('Creating like for topic:', topicId);
  return new Promise(resolve => setTimeout(() => resolve(true), 500)); 
};

const deletarCurtida = async (topicId) => {
  console.log('Deleting like for topic:', topicId);
  return new Promise(resolve => setTimeout(() => resolve(true), 500)); 
};


