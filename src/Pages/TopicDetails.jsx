

// import React, { useState, useEffect, useContext } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { ForumContext } from '../Context/Dados';
// import { FileText, Trash2, LinkIcon, Paperclip, ImageIcon, X } from 'lucide-react';
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
//   const [arquivos, setArquivos] = useState([]);
//   const [isDragging, setIsDragging] = useState(false);

//   useEffect(() => {
//     const loadTopic = async () => {
//       setLocalLoading(true);
//       setLocalError(null);
//       try {
//         const topic = await fetchTopicoById(idTopico);
//         setLocalRespostas(topic.respostas?.sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm)) || []);
//       } catch (err) {
//         setLocalError('Erro ao carregar o tópico. Por favor, tente novamente.');
//         toast.error('Erro ao carregar o tópico. Por favor, tente novamente.');
//       } finally {
//         setLocalLoading(false);
//       }
//     };

//     loadTopic();
//   }, [idTopico, fetchTopicoById]);

//   const handleFileChange = async (e) => {
//     const newFiles = Array.from(e.target.files);
//     const processedFiles = await Promise.all(newFiles.map(async (file) => {
//       const base64 = await convertToBase64(file);
//       return { nomeArquivo: file.name, anexo: base64 };
//     }));
//     setArquivos(prevArquivos => [...prevArquivos, ...processedFiles]);
//   };

//   const convertToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = (error) => reject(error);
//     });
//   };

//   const handleRemoveFile = (index) => {
//     setArquivos(prevArquivos => prevArquivos.filter((_, i) => i !== index));
//   };

//   const handleDragEnter = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const handleDrop = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
    
//     const files = Array.from(e.dataTransfer.files);
//     const processedFiles = await Promise.all(files.map(async (file) => {
//       const base64 = await convertToBase64(file);
//       return { nomeArquivo: file.name, anexo: base64 };
//     }));
//     setArquivos(prevArquivos => [...prevArquivos, ...processedFiles]);
//   };

//   const handleResponder = async (e) => {
//     e.preventDefault();
//     if (!descricaoResposta.trim()) return;
//     setIsSubmittingResponse(true);
//     try {
//       const novaResposta = await criarResposta(idTopico, descricaoResposta, arquivos);
//       setLocalRespostas(prevRespostas => [novaResposta, ...prevRespostas]);
//       setDescricaoResposta('');
//       setArquivos([]);
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

//   const isImageFile = (fileName, fileData) => {
//     const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
//     const extension = fileName.split('.').pop().toLowerCase();
//     return imageExtensions.includes(extension) || (fileData && fileData.startsWith('data:image/'));
//   };

//   const handleAnexoClick = (anexo) => {
//     const url = anexo.anexo; // Supondo que anexo.anexo contém a URL
  
//     // Verifica se a URL é válida
//     if (url) {
//       const fileType = url.split('.').pop().toLowerCase(); // Obtém a extensão do arquivo
  
//       if (['jpg', 'jpeg', 'png', 'gif'].includes(fileType)) {
//         // Para imagens, abra em uma nova aba
//         const link = document.createElement('a');
//         link.href = url;
//         link.target = '_blank'; // Abre em uma nova aba
//         link.click();
//       } else if (fileType === 'pdf') {
//         // Para PDFs, use um iframe
//         const pdfWindow = window.open();
//         pdfWindow.document.write(`
//           <iframe width="100%" height="100%" src="${url}"></iframe>
//         `);
//       } else {
//         console.warn('Tipo de arquivo não suportado para visualização:', fileType);
//       }
//     } else {
//       console.error('URL do anexo não encontrada');
//     }
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
//             <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
//               <div className="flex items-center">
//                 <img
//                   src={currentTopic.criadoPor.foto || "https://via.placeholder.com/40"}
//                   alt={currentTopic.criadoPor.nome}
//                   className="w-10 h-10 rounded-full mr-3"
//                 />
//                 <Link to={`/user/${currentTopic.criadoPor.idUsuario}`} className="hover:underline">
//                   {currentTopic.criadoPor.nome}
//                 </Link>
//               </div>
//               <span>Data: {new Date(currentTopic.criadoEm).toLocaleDateString()}</span>
//             </div>

//             {currentTopic.anexos && currentTopic.anexos.length > 0 && (
//               <div className="bg-gray-50 rounded-lg p-4 mb-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-3">Anexos</h3>
//                 <div className="flex flex-wrap gap-3">
//                   {currentTopic.anexos.map((anexo) => (
//                     <button
//                       key={anexo.idAnexo}
//                       onClick={() => handleAnexoClick(anexo)}
//                       className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
//                     >
//                       {isImageFile(anexo.nomeArquivo, anexo.anexo) ? (
//                         <ImageIcon size={20} className="text-blue-600" />
//                       ) : (
//                         <FileText size={20} className="text-blue-600" />
//                       )}
//                       <span className="text-sm text-gray-700 truncate max-w-[150px]">{anexo.nomeArquivo}</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {currentTopic.links && currentTopic.links.length > 0 && (
//               <div className="bg-gray-50 rounded-lg p-4 mb-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-3">Links</h3>
//                 <div className="flex flex-wrap gap-3">
//                   {currentTopic.links.map((link, index) => (
//                     <a
//                       key={index}
//                       href={link}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
//                     >
//                       <LinkIcon size={20} className="text-blue-600" />
//                       <span className="text-sm text-gray-700 truncate max-w-[150px]">{link}</span>
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
//                       <div className="flex items-center mb-3">
//                         <img
//                           src={resposta.criadoPor.foto || "https://via.placeholder.com/40"}
//                           alt={resposta.criadoPor.nome}
//                           className="w-8 h-8 rounded-full mr-2"
//                         />
//                         <Link to={`/user/${resposta.criadoPor.idUsuario}`} className="text-blue-600 hover:underline">
//                           {resposta.criadoPor.nome}
//                         </Link>
//                       </div>
//                       <p className="text-gray-700 mb-3">{resposta.descricao}</p>
//                       {resposta.anexos && resposta.anexos.length > 0 && (
//                         <div className="mb-3">
//                           <h4 className="text-sm font-semibold text-gray-700 mb-2">Anexos:</h4>
//                           <div className="flex flex-wrap gap-2">
//                             {resposta.anexos.map((anexo, index) => (
//                               <button
//                                 key={index}
//                                 onClick={() => handleAnexoClick(anexo)}
//                                 className="flex items-center gap-1 p-1 bg-white border border-gray-200 rounded-md text-xs text-blue-600 hover:bg-gray-50 transition-colors cursor-pointer"
//                               >
//                                 {isImageFile(anexo.nomeArquivo, anexo.anexo) ? (
//                                   <ImageIcon size={12} />
//                                 ) : (
//                                   <FileText size={12} />
//                                 )}
//                                 <span className="truncate max-w-[100px]">{anexo.nomeArquivo}</span>
//                               </button>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                       <div className="flex justify-between text-sm text-gray-500">
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
//               <div className="mt-3">
//                 <div 
//                   className={`p-2 border-2 border-dashed rounded-md ${
//                     isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
//                   }`}
//                   onDragEnter={handleDragEnter}
//                   onDragOver={handleDragOver}
//                   onDragLeave={handleDragLeave}
//                   onDrop={handleDrop}
//                 >
//                   <div className="flex items-center justify-center">
//                     <label
//                       htmlFor="file-upload"
//                       className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                     >
//                       <Paperclip className="w-4 h-4 mr-2 inline-block" />
//                       Anexar arquivos
//                     </label>
//                     <input
//                       id="file-upload"
//                       name="file-upload"
//                       type="file"
//                       multiple
//                       className="sr-only"
//                       onChange={handleFileChange}
//                       disabled={isSubmittingResponse}
//                     />
//                   </div>
//                   <p className="mt-1 text-xs text-gray-500 text-center">
//                     Arraste arquivos ou clique para selecionar
//                   </p>
//                 </div>
//                 {arquivos.length > 0 && (
//                   <div className="mt-2">
//                     <h4 className="text-sm font-semibold text-gray-700 mb-2">
//                       Arquivos selecionados ({arquivos.length}):
//                     </h4>
//                     <ul className="space-y-2">
//                       {arquivos.map((arquivo, index) => (
//                         <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
//                           <div className="flex items-center">
//                             {isImageFile(arquivo.nomeArquivo, arquivo.anexo) ? (
//                               <img
//                                 src={arquivo.anexo}
//                                 alt={arquivo.nomeArquivo}
//                                 className="w-8 h-8 object-cover rounded-sm mr-2"
//                               />
//                             ) : (
//                               <FileText size={16} className="mr-2 text-gray-500" />
//                             )}
//                             <span className="text-sm text-gray-600 truncate max-w-[200px]">
//                               {arquivo.nomeArquivo}
//                             </span>
//                           </div>
//                           <button
//                             type="button"
//                             onClick={() => handleRemoveFile(index)}
//                             className="text-red-500 hover:text-red-700"
//                           >
//                             <X size={16} />
//                           </button>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
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
import { FileText, Trash2, LinkIcon, ImageIcon } from 'lucide-react';
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
        setLocalRespostas(topic.respostas?.sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm)) || []);
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
      setLocalRespostas(prevRespostas => [novaResposta, ...prevRespostas]);
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

  const isImageFile = (fileName, fileData) => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
    const extension = fileName.split('.').pop().toLowerCase();
    return imageExtensions.includes(extension) || (fileData && fileData.startsWith('data:image/'));
  };

  const handleAnexoClick = (anexo) => {
    const url = anexo.anexo;
  
    if (url) {
      const fileType = url.split('.').pop().toLowerCase();
  
      if (['jpg', 'jpeg', 'png', 'gif'].includes(fileType)) {
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.click();
      } else if (fileType === 'pdf') {
        const pdfWindow = window.open();
        pdfWindow.document.write(`
          <iframe width="100%" height="100%" src="${url}"></iframe>
        `);
      } else {
        console.warn('Tipo de arquivo não suportado para visualização:', fileType);
      }
    } else {
      console.error('URL do anexo não encontrada');
    }
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
                    <button
                      key={anexo.idAnexo}
                      onClick={() => handleAnexoClick(anexo)}
                      className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      {isImageFile(anexo.nomeArquivo, anexo.anexo) ? (
                        <ImageIcon size={20} className="text-blue-600" />
                      ) : (
                        <FileText size={20} className="text-blue-600" />
                      )}
                      <span className="text-sm text-gray-700 truncate max-w-[150px]">{anexo.nomeArquivo}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentTopic.links && currentTopic.links.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Links</h3>
                <div className="flex flex-wrap gap-3">
                  {currentTopic.links.map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <LinkIcon size={20} className="text-blue-600" />
                      <span className="text-sm text-gray-700 truncate max-w-[150px]">{link}</span>
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
                      {resposta.anexos && resposta.anexos.length > 0 && (
                        <div className="mb-3">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">Anexos:</h4>
                          <div className="flex flex-wrap gap-2">
                            {resposta.anexos.map((anexo, index) => (
                              <button
                                key={index}
                                onClick={() => handleAnexoClick(anexo)}
                                className="flex items-center gap-1 p-1 bg-white border border-gray-200 rounded-md text-xs text-blue-600 hover:bg-gray-50 transition-colors cursor-pointer"
                              >
                                {isImageFile(anexo.nomeArquivo, anexo.anexo) ? (
                                  <ImageIcon size={12} />
                                ) : (
                                  <FileText size={12} />
                                )}
                                <span className="truncate max-w-[100px]">{anexo.nomeArquivo}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
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

