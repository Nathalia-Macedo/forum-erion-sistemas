// import React, { useState, useEffect, useContext } from 'react';
// import { useParams } from 'react-router-dom';
// import { ForumContext } from '../Context/Dados';
// import { FileText } from 'lucide-react';
// import './TopicDetails.css';

// const TopicDetail = () => {
//   const { idTopico } = useParams();
//   const { 
//     currentTopic, 
//     fetchTopicoById,
//     criarResposta, 
//     isLoading,
//     error
//   } = useContext(ForumContext);
//   const [descricaoResposta, setDescricaoResposta] = useState('');
//   const [localLoading, setLocalLoading] = useState(true);
//   const [localError, setLocalError] = useState(null);
//   const [localRespostas, setLocalRespostas] = useState([]);
//   const [isSubmittingResponse, setIsSubmittingResponse] = useState(false);

//   useEffect(() => {
//     const loadTopic = async () => {
//       setLocalLoading(true);
//       setLocalError(null);
//       try {
//         const topic = await fetchTopicoById(idTopico);
//         setLocalRespostas(topic.respostas || []);
//       } catch (err) {
//         setLocalError('Erro ao carregar o tópico. Por favor, tente novamente.');
//       } finally {
//         setLocalLoading(false);
//       }
//     };

//     loadTopic();
//   }, [idTopico, fetchTopicoById]);

//   const handleResponder = async (e) => {
//     e.preventDefault();
//     if (!descricaoResposta.trim()) return;
//     setIsSubmittingResponse(true);
//     try {
//       const novaResposta = await criarResposta(idTopico, descricaoResposta);
//       setLocalRespostas(prevRespostas => [...prevRespostas, novaResposta]);
//       setDescricaoResposta('');
//     } catch (error) {
//       console.error('Erro ao enviar resposta:', error);
//       setLocalError('Erro ao enviar resposta. Por favor, tente novamente.');
//     } finally {
//       setIsSubmittingResponse(false);
//     }
//   };

//   if (localLoading || isLoading) {
//     return <div className="loading">Carregando...</div>;
//   }

//   if (localError || error) {
//     return <div className="error">{localError || error}</div>;
//   }

//   if (!currentTopic) {
//     return <div className="not-found">Tópico não encontrado</div>;
//   }

//   return (
//     <div className="topic-detail-wrapper">
//       <div className="topic-detail-container">
//         <h2 className="topic-title">{currentTopic.titulo}</h2>
//         <p className="topic-description">{currentTopic.descricao}</p>
//         <div className="topic-meta">
//           <span>Por: {currentTopic.criadoPor.nome}</span>
//           <span>Data: {new Date(currentTopic.criadoEm).toLocaleDateString()}</span>
//         </div>

//         {currentTopic.anexos && currentTopic.anexos.length > 0 && (
//           <div className="attachments-section">
//             <h3>Anexos</h3>
//             <div className="attachments-list">
//               {currentTopic.anexos.map((anexo) => (
//                 <a
//                   key={anexo.idAnexo}
//                   href={anexo.anexo}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="attachment-item"
//                 >
//                   <FileText size={20} />
//                   <span>{anexo.nomeArquivo}</span>
//                 </a>
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="responses-section">
//           <h3>Respostas</h3>
//           {localRespostas.length === 0 ? (
//             <p>Nenhuma resposta ainda. Seja o primeiro a responder!</p>
//           ) : (
//             localRespostas.map((resposta, index) => (
//               <div key={resposta.idResposta || index} className="response-card">
//                 <p>{resposta.descricao}</p>
//                 <div className="response-footer">
//                   <span>Por: {resposta.criadoPor.nome}</span>
//                   <span>Data: {new Date(resposta.criadoEm).toLocaleDateString()}</span>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//         <form onSubmit={handleResponder} className="response-form">
//           <textarea
//             value={descricaoResposta}
//             onChange={(e) => setDescricaoResposta(e.target.value)}
//             placeholder="Escreva sua resposta..."
//             required
//             disabled={isSubmittingResponse}
//           />
//           <button type="submit" disabled={isSubmittingResponse}>
//             {isSubmittingResponse ? 'Enviando...' : 'Responder'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TopicDetail;
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ForumContext } from '../Context/Dados';
import { FileText } from 'lucide-react';
import './TopicDetails.css';

const TopicDetail = () => {
  const { idTopico } = useParams();
  const { 
    currentTopic, 
    fetchTopicoById,
    criarResposta, 
    isLoading,
    error
  } = useContext(ForumContext);
  const [descricaoResposta, setDescricaoResposta] = useState('');
  const [localLoading, setLocalLoading] = useState(true);
  const [localError, setLocalError] = useState(null);
  const [localRespostas, setLocalRespostas] = useState([]);
  const [isSubmittingResponse, setIsSubmittingResponse] = useState(false);
  const [visibleResponses, setVisibleResponses] = useState(5);

  useEffect(() => {
    const loadTopic = async () => {
      setLocalLoading(true);
      setLocalError(null);
      try {
        const topic = await fetchTopicoById(idTopico);
        setLocalRespostas(topic.respostas || []);
      } catch (err) {
        setLocalError('Erro ao carregar o tópico. Por favor, tente novamente.');
      } finally {
        setLocalLoading(false);
      }
    };

    loadTopic();
  }, [idTopico, fetchTopicoById]);

  const handleResponder = async (e) => {
    e.preventDefault();
    if (!descricaoResposta.trim()) return;
    setIsSubmittingResponse(true);
    try {
      const novaResposta = await criarResposta(idTopico, descricaoResposta);
      setLocalRespostas(prevRespostas => [...prevRespostas, novaResposta]);
      setDescricaoResposta('');
    } catch (error) {
      console.error('Erro ao enviar resposta:', error);
      setLocalError('Erro ao enviar resposta. Por favor, tente novamente.');
    } finally {
      setIsSubmittingResponse(false);
    }
  };

  const handleLoadMore = () => {
    setVisibleResponses(prevVisible => prevVisible + 5);
  };

  if (localLoading || isLoading) {
    return <div className="loading">Carregando...</div>;
  }

  if (localError || error) {
    return <div className="error">{localError || error}</div>;
  }

  if (!currentTopic) {
    return <div className="not-found">Tópico não encontrado</div>;
  }

  return (
    <div className="topic-detail-wrapper">
      <div className="topic-detail-container">
        <h2 className="topic-title">{currentTopic.titulo}</h2>
        <p className="topic-description">{currentTopic.descricao}</p>
        <div className="topic-meta">
          <span>Por: {currentTopic.criadoPor.nome}</span>
          <span>Data: {new Date(currentTopic.criadoEm).toLocaleDateString()}</span>
        </div>

        {currentTopic.anexos && currentTopic.anexos.length > 0 && (
          <div className="attachments-section">
            <h3>Anexos</h3>
            <div className="attachments-list">
              {currentTopic.anexos.map((anexo) => (
                <a
                  key={anexo.idAnexo}
                  href={anexo.anexo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="attachment-item"
                >
                  <FileText size={20} />
                  <span>{anexo.nomeArquivo}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="responses-section">
          <h3>Respostas</h3>
          <div className="responses-container">
            {localRespostas.length === 0 ? (
              <p>Nenhuma resposta ainda. Seja o primeiro a responder!</p>
            ) : (
              localRespostas.slice(0, visibleResponses).map((resposta, index) => (
                <div key={resposta.idResposta || index} className="response-card">
                  <p>{resposta.descricao}</p>
                  <div className="response-footer">
                    <span>Por: {resposta.criadoPor.nome}</span>
                    <span>Data: {new Date(resposta.criadoEm).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
          {localRespostas.length > visibleResponses && (
            <button onClick={handleLoadMore} className="load-more-button">
              Ver mais respostas
            </button>
          )}
        </div>
        <form onSubmit={handleResponder} className="response-form">
          <textarea
            value={descricaoResposta}
            onChange={(e) => setDescricaoResposta(e.target.value)}
            placeholder="Escreva sua resposta..."
            required
            disabled={isSubmittingResponse}
          />
          <button type="submit" disabled={isSubmittingResponse}>
            {isSubmittingResponse ? 'Enviando...' : 'Responder'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TopicDetail;

