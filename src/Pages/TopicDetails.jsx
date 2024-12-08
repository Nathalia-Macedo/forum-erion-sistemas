// import React, { useState, useEffect, useContext } from 'react';
// import { useParams } from 'react-router-dom';
// import { ForumContext } from '../Context/Dados';
// import { FileText, Trash2 } from 'lucide-react';
// import { toast } from 'react-toastify';
// import Loading from '../Components/Loading/Carregando';
// import Modal from '../Components/Modal/Modal';
// import SimplifiedHeader from '../Components/SimplifiedHeader/SimplifiedHeader';
// const TopicDetail = () => {
//   const { idTopico } = useParams();
//   const { 
//     currentTopic, 
//     fetchTopicoById,
//     criarResposta, 
//     deletarResposta,
//     isLoading,
//     error,
//     user
//   } = useContext(ForumContext);
//   const [descricaoResposta, setDescricaoResposta] = useState('');
//   const [localLoading, setLocalLoading] = useState(true);
//   const [localError, setLocalError] = useState(null);
//   const [localRespostas, setLocalRespostas] = useState([]);
//   const [isSubmittingResponse, setIsSubmittingResponse] = useState(false);
//   const [visibleResponses, setVisibleResponses] = useState(5);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [responseToDelete, setResponseToDelete] = useState(null);

//   useEffect(() => {
//     const loadTopic = async () => {
//       setLocalLoading(true);
//       setLocalError(null);
//       try {
//         const topic = await fetchTopicoById(idTopico);
//         setLocalRespostas(topic.respostas || []);
//       } catch (err) {
//         setLocalError('Erro ao carregar o tópico. Por favor, tente novamente.');
//         toast.error('Erro ao carregar o tópico. Por favor, tente novamente.');
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
//       toast.success('Resposta enviada com sucesso!');
//     } catch (error) {
//       console.error('Erro ao enviar resposta:', error);
//       setLocalError('Erro ao enviar resposta. Por favor, tente novamente.');
//       toast.error('Erro ao enviar resposta. Por favor, tente novamente.');
//     } finally {
//       setIsSubmittingResponse(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleResponder(e);
//     }
//   };

//   const handleDeleteResponse = (responseId) => {
//     setResponseToDelete(responseId);
//     setIsDeleteModalOpen(true);
//   };

//   const confirmDeleteResponse = async () => {
//     if (responseToDelete) {
//       try {
//         await deletarResposta(responseToDelete);
//         setLocalRespostas(prevRespostas => prevRespostas.filter(resp => resp.idResposta !== responseToDelete));
//         toast.success('Resposta excluída com sucesso!');
//       } catch (error) {
//         console.error('Erro ao excluir resposta:', error);
//         toast.error('Erro ao excluir resposta. Por favor, tente novamente.');
//       } finally {
//         setIsDeleteModalOpen(false);
//         setResponseToDelete(null);
//       }
//     }
//   };

//   const handleLoadMore = () => {
//     setVisibleResponses(prevVisible => prevVisible + 5);
//   };

//   if (localLoading || isLoading) {
//     return <Loading />;
//   }

//   if (localError || error) {
//     return <div className="flex justify-center items-center h-screen text-white">{localError || error}</div>;
//   }

//   if (!currentTopic) {
//     return <div className="flex justify-center items-center h-screen text-white">Tópico não encontrado</div>;
//   }

//   return (
//     <div className="min-h-screen bg-[#0A0E45]">
//       <SimplifiedHeader />
//       <div className="py-8 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="p-6 sm:p-8">
//             <h2 className="text-2xl font-semibold text-gray-900 mb-2">{currentTopic.titulo}</h2>
//             <p className="text-gray-600 mb-6">{currentTopic.descricao}</p>
//             <div className="flex justify-between text-sm text-gray-500 mb-6">
//               <span>Por: {currentTopic.criadoPor.nome}</span>
//               <span>Data: {new Date(currentTopic.criadoEm).toLocaleDateString()}</span>
//             </div>

//             {currentTopic.anexos && currentTopic.anexos.length > 0 && (
//               <div className="bg-gray-50 rounded-lg p-4 mb-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-3">Anexos</h3>
//                 <div className="flex flex-wrap gap-3">
//                   {currentTopic.anexos.map((anexo) => (
//                     <a
//                       key={anexo.idAnexo}
//                       href={anexo.anexo}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
//                     >
//                       <FileText size={20} className="text-blue-600" />
//                       <span className="text-sm text-gray-700 truncate max-w-[150px]">{anexo.nomeArquivo}</span>
//                     </a>
//                   ))}
//                 </div>
//               </div>
//             )}

//             <div className="border-t border-gray-200 pt-6">
//               <h3 className="text-xl font-semibold text-gray-900 mb-4">Respostas</h3>
//               <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
//                 {localRespostas.length === 0 ? (
//                   <p className="text-gray-500">Nenhuma resposta ainda. Seja o primeiro a responder!</p>
//                 ) : (
//                   localRespostas.slice(0, visibleResponses).map((resposta) => (
//                     <div key={resposta.idResposta} className="bg-gray-50 rounded-lg p-4 relative">
//                       <p className="text-gray-700 mb-3">{resposta.descricao}</p>
//                       <div className="flex justify-between text-sm text-gray-500">
//                         <span>Por: {resposta.criadoPor.nome}</span>
//                         <span>Data: {new Date(resposta.criadoEm).toLocaleDateString()}</span>
//                       </div>
//                       {user && resposta.criadoPor.idUsuario === user.idUsuario && (
//                         <div className="absolute top-2 right-2">
//                           <button
//                             onClick={() => handleDeleteResponse(resposta.idResposta)}
//                             className="text-red-500 hover:text-red-700"
//                           >
//                             <Trash2 size={16} />
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   ))
//                 )}
//               </div>
//               {localRespostas.length > visibleResponses && (
//                 <button 
//                   onClick={handleLoadMore} 
//                   className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
//                 >
//                   Ver mais respostas
//                 </button>
//               )}
//             </div>

//             <form onSubmit={handleResponder} className="mt-8 border-t border-gray-200 pt-6">
//               <textarea
//                 value={descricaoResposta}
//                 onChange={(e) => setDescricaoResposta(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Escreva sua resposta..."
//                 required
//                 disabled={isSubmittingResponse}
//                 className="w-full min-h-[120px] p-3 border border-gray-300 rounded-md resize-y bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//               <button 
//                 type="submit" 
//                 disabled={isSubmittingResponse}
//                 className="mt-3 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
//               >
//                 {isSubmittingResponse ? 'Enviando...' : 'Responder'}
//               </button>
//             </form>
//           </div>
//         </div>

//         <Modal
//           isOpen={isDeleteModalOpen}
//           onClose={() => setIsDeleteModalOpen(false)}
//           onConfirm={confirmDeleteResponse}
//           title="Confirmar exclusão"
//           message="Tem certeza que deseja excluir esta resposta?"
//         />
//       </div>
//     </div>
//   );
// };

// export default TopicDetail;

import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ForumContext } from '../Context/Dados';
import { FileText, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import Loading from '../Components/Loading/Carregando';
import Modal from '../Components/Modal/Modal';
import SimplifiedHeader from '../Components/SimplifiedHeader/SimplifiedHeader';

const TopicDetail = () => {
  const { idTopico } = useParams();
  const { 
    currentTopic, 
    fetchTopicoById,
    criarResposta, 
    deletarResposta,
    isLoading,
    error,
    user
  } = useContext(ForumContext);
  const [descricaoResposta, setDescricaoResposta] = useState('');
  const [localLoading, setLocalLoading] = useState(true);
  const [localError, setLocalError] = useState(null);
  const [localRespostas, setLocalRespostas] = useState([]);
  const [isSubmittingResponse, setIsSubmittingResponse] = useState(false);
  const [visibleResponses, setVisibleResponses] = useState(5);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [responseToDelete, setResponseToDelete] = useState(null);

  useEffect(() => {
    const loadTopic = async () => {
      setLocalLoading(true);
      setLocalError(null);
      try {
        const topic = await fetchTopicoById(idTopico);
        setLocalRespostas(topic.respostas || []);
      } catch (err) {
        setLocalError('Erro ao carregar o tópico. Por favor, tente novamente.');
        toast.error('Erro ao carregar o tópico. Por favor, tente novamente.');
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
      toast.success('Resposta enviada com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar resposta:', error);
      setLocalError('Erro ao enviar resposta. Por favor, tente novamente.');
      toast.error('Erro ao enviar resposta. Por favor, tente novamente.');
    } finally {
      setIsSubmittingResponse(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleResponder(e);
    }
  };

  const handleDeleteResponse = (responseId) => {
    setResponseToDelete(responseId);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteResponse = async () => {
    if (responseToDelete) {
      try {
        await deletarResposta(responseToDelete);
        setLocalRespostas(prevRespostas => prevRespostas.filter(resp => resp.idResposta !== responseToDelete));
        toast.success('Resposta excluída com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir resposta:', error);
        toast.error('Erro ao excluir resposta. Por favor, tente novamente.');
      } finally {
        setIsDeleteModalOpen(false);
        setResponseToDelete(null);
      }
    }
  };

  const handleLoadMore = () => {
    setVisibleResponses(prevVisible => prevVisible + 5);
  };

  if (localLoading || isLoading) {
    return <Loading />;
  }

  if (localError || error) {
    return <div className="flex justify-center items-center h-screen text-white">{localError || error}</div>;
  }

  if (!currentTopic) {
    return <div className="flex justify-center items-center h-screen text-white">Tópico não encontrado</div>;
  }

  return (
    <div className="min-h-screen bg-[#0A0E45]">
      <SimplifiedHeader />
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{currentTopic.titulo}</h2>
            <p className="text-gray-600 mb-6">{currentTopic.descricao}</p>
            <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
              <div className="flex items-center">
                <img
                  src={currentTopic.criadoPor.foto || "https://via.placeholder.com/40"}
                  alt={currentTopic.criadoPor.nome}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <Link to={`/user/${currentTopic.criadoPor.idUsuario}`} className="hover:underline">
                  {currentTopic.criadoPor.nome}
                </Link>
              </div>
              <span>Data: {new Date(currentTopic.criadoEm).toLocaleDateString()}</span>
            </div>

            {currentTopic.anexos && currentTopic.anexos.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Anexos</h3>
                <div className="flex flex-wrap gap-3">
                  {currentTopic.anexos.map((anexo) => (
                    <a
                      key={anexo.idAnexo}
                      href={anexo.anexo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <FileText size={20} className="text-blue-600" />
                      <span className="text-sm text-gray-700 truncate max-w-[150px]">{anexo.nomeArquivo}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Respostas</h3>
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {localRespostas.length === 0 ? (
                  <p className="text-gray-500">Nenhuma resposta ainda. Seja o primeiro a responder!</p>
                ) : (
                  localRespostas.slice(0, visibleResponses).map((resposta) => (
                    <div key={resposta.idResposta} className="bg-gray-50 rounded-lg p-4 relative">
                      <div className="flex items-center mb-3">
                        <img
                          src={resposta.criadoPor.foto || "https://via.placeholder.com/40"}
                          alt={resposta.criadoPor.nome}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <Link to={`/user/${resposta.criadoPor.idUsuario}`} className="text-blue-600 hover:underline">
                          {resposta.criadoPor.nome}
                        </Link>
                      </div>
                      <p className="text-gray-700 mb-3">{resposta.descricao}</p>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Data: {new Date(resposta.criadoEm).toLocaleDateString()}</span>
                      </div>
                      {user && resposta.criadoPor.idUsuario === user.idUsuario && (
                        <div className="absolute top-2 right-2">
                          <button
                            onClick={() => handleDeleteResponse(resposta.idResposta)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
              {localRespostas.length > visibleResponses && (
                <button 
                  onClick={handleLoadMore} 
                  className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Ver mais respostas
                </button>
              )}
            </div>

            <form onSubmit={handleResponder} className="mt-8 border-t border-gray-200 pt-6">
              <textarea
                value={descricaoResposta}
                onChange={(e) => setDescricaoResposta(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escreva sua resposta..."
                required
                disabled={isSubmittingResponse}
                className="w-full min-h-[120px] p-3 border border-gray-300 rounded-md resize-y bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button 
                type="submit" 
                disabled={isSubmittingResponse}
                className="mt-3 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                {isSubmittingResponse ? 'Enviando...' : 'Responder'}
              </button>
            </form>
          </div>
        </div>

        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDeleteResponse}
          title="Confirmar exclusão"
          message="Tem certeza que deseja excluir esta resposta?"
        />
      </div>
    </div>
  );
};

export default TopicDetail;

