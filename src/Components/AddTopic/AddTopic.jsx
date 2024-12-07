

// import React, { useState, useContext } from 'react';
// import { X, Link, FileText, Image } from 'lucide-react';
// import { ForumContext } from '../../Context/Dados';

// const NewTopicModal = ({ isOpen, onClose }) => {
//   const { categories, criarTopico } = useContext(ForumContext);
//   const [formData, setFormData] = useState({
//     title: '',
//     category: '',
//     description: ''
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [showLinkInput, setShowLinkInput] = useState(false);
//   const [linkUrl, setLinkUrl] = useState('');
//   const [files, setFiles] = useState([]);
//   const [images, setImages] = useState([]);
//   const [links, setLinks] = useState([]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const allFiles = [...files, ...images];
//       await criarTopico(formData.title, formData.category, formData.description, allFiles, links);
//       setIsLoading(false);
//       onClose();
//     } catch (error) {
//       console.error('Erro ao criar tópico:', error);
//       setIsLoading(false);
//       // Handle error (e.g., show error message to user)
//     }
//   };

//   const handleLinkToggle = () => {
//     setShowLinkInput(!showLinkInput);
//   };

//   const handleLinkSubmit = (e) => {
//     e.preventDefault();
//     if (linkUrl) {
//       setLinks(prev => [...prev, linkUrl]);
//       setLinkUrl('');
//       setShowLinkInput(false);
//     }
//   };

//   const handleFileUpload = (e) => {
//     const uploadedFiles = Array.from(e.target.files);
//     setFiles(prev => [...prev, ...uploadedFiles]);
//   };

//   const handleImageUpload = (e) => {
//     const uploadedImages = Array.from(e.target.files);
//     setImages(prev => [...prev, ...uploadedImages]);
//   };

//   const removeFile = (index, type) => {
//     if (type === 'file') {
//       setFiles(prev => prev.filter((_, i) => i !== index));
//     } else if (type === 'image') {
//       setImages(prev => prev.filter((_, i) => i !== index));
//     } else if (type === 'link') {
//       setLinks(prev => prev.filter((_, i) => i !== index));
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <>
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 overflow-y-auto">
//       <div className="bg-[#0A0E45] rounded-lg p-6 w-11/12 max-w-lg text-white max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold">Adicionar novo tópico</h2>
//           <button onClick={onClose} className="text-white hover:opacity-80">
//             <X size={24} />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-5">
//             <label htmlFor="title" className="block mb-2 text-sm font-medium">Título:</label>
//             <input
//               type="text"
//               id="title"
//               placeholder="Título"
//               value={formData.title}
//               onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//               disabled={isLoading}
//               className="w-full p-3 rounded-lg text-sm text-[#0A0E45]"
//             />
//           </div>

//           <div className="mb-5">
//             <label htmlFor="category" className="block mb-2 text-sm font-medium">Categoria:</label>
//             <select
//               id="category"
//               value={formData.category}
//               onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//               disabled={isLoading}
//               className="w-full p-3 rounded-lg text-sm text-[#0A0E45]"
//             >
//               <option value="">Selecione uma categoria</option>
//               {categories.map((category) => (
//                 <option key={category.idCategoria} value={category.idCategoria}>
//                   {category.titulo}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="mb-5">
//             <label htmlFor="description" className="block mb-2 text-sm font-medium">Descrição:</label>
//             <textarea
//               id="description"
//               placeholder="Descrição aqui..."
//               value={formData.description}
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               disabled={isLoading}
//               className="w-full p-3 rounded-lg text-sm text-[#0A0E45] h-36 resize-y"
//             />
//           </div>

//           <div className="flex gap-4 mb-6">
//             <button type="button" onClick={handleLinkToggle} disabled={isLoading} className="text-white hover:opacity-80">
//               <Link size={20} />
//             </button>
//             <label htmlFor="file-upload" className="cursor-pointer text-white hover:opacity-80">
//               <FileText size={20} />
//               <input
//                 type="file"
//                 id="file-upload"
//                 multiple
//                 onChange={handleFileUpload}
//                 disabled={isLoading}
//                 className="hidden"
//               />
//             </label>
//             <label htmlFor="image-upload" className="cursor-pointer text-white hover:opacity-80">
//               <Image size={20} />
//               <input
//                 type="file"
//                 id="image-upload"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 multiple
//                 disabled={isLoading}
//                 className="hidden"
//               />
//             </label>
//           </div>

//           {showLinkInput && (
//             <div className="flex gap-2 mb-5">
//               <input
//                 type="url"
//                 placeholder="Insira o URL do link"
//                 value={linkUrl}
//                 onChange={(e) => setLinkUrl(e.target.value)}
//                 disabled={isLoading}
//                 className="flex-grow p-3 rounded-lg text-sm text-[#0A0E45]"
//               />
//               <button 
//                 type="button" 
//                 onClick={handleLinkSubmit} 
//                 disabled={isLoading}
//                 className="bg-[#00C853] text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#00a847] transition-colors"
//               >
//                 Adicionar Link
//               </button>
//             </div>
//           )}

//           {(files.length > 0 || images.length > 0 || links.length > 0) && (
//             <div className="mt-5 mb-6">
//               <h4 className="text-base font-medium mb-2">Arquivos e links anexados:</h4>
//               <div className="max-h-40 overflow-y-auto pr-2 custom-scrollbar">
//                 <ul className="list-none pl-0 space-y-2">
//                   {files.map((file, index) => (
//                     <li key={`file-${index}`} className="text-sm flex justify-between items-center bg-[#1a1f6d] p-2 rounded">
//                       <span className="truncate flex-1 mr-2">{file.name}</span>
//                       <button 
//                         type="button" 
//                         onClick={() => removeFile(index, 'file')} 
//                         className="text-red-500 hover:text-red-700 flex-shrink-0"
//                       >
//                         <X size={16} />
//                       </button>
//                     </li>
//                   ))}
//                   {images.map((image, index) => (
//                     <li key={`image-${index}`} className="text-sm flex justify-between items-center bg-[#1a1f6d] p-2 rounded">
//                       <span className="truncate flex-1 mr-2">{image.name}</span>
//                       <button 
//                         type="button" 
//                         onClick={() => removeFile(index, 'image')} 
//                         className="text-red-500 hover:text-red-700 flex-shrink-0"
//                       >
//                         <X size={16} />
//                       </button>
//                     </li>
//                   ))}
//                   {links.map((link, index) => (
//                     <li key={`link-${index}`} className="text-sm flex justify-between items-center bg-[#1a1f6d] p-2 rounded">
//                       <span className="truncate flex-1 mr-2">{link}</span>
//                       <button 
//                         type="button" 
//                         onClick={() => removeFile(index, 'link')} 
//                         className="text-red-500 hover:text-red-700 flex-shrink-0"
//                       >
//                         <X size={16} />
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           )}

//           <button 
//             type="submit" 
//             className="w-full bg-[#00C853] text-white rounded-lg py-3 text-base font-medium hover:bg-[#00a847] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//             disabled={isLoading}
//           >
//             {isLoading ? 'Carregando...' : 'Postar tópico'}
//           </button>
//         </form>
//       </div>
//     </div>
//     <style jsx global>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 8px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #1a1f6d;
//           border-radius: 4px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #3f51b5;
//           border-radius: 4px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #303f9f;
//         }
//       `}</style>
//     </>
//   );
// };

// export default NewTopicModal;



import React, { useState, useContext, useEffect } from 'react';
import { X, Link, FileText, Image } from 'lucide-react';
import { ForumContext } from '../../Context/Dados';
import { toast } from 'react-toastify';

const NewTopicModal = ({ isOpen, onClose, topicToEdit }) => {
  const { categories, criarTopico, editarTopico } = useContext(ForumContext);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [links, setLinks] = useState([]);
  const [existingFiles, setExistingFiles] = useState([]);

  useEffect(() => {
    if (topicToEdit) {
      setFormData({
        title: topicToEdit.titulo,
        category: topicToEdit.categoria.idCategoria,
        description: topicToEdit.descricao
      });
      setLinks(topicToEdit.links || []);
      
      // Handle existing attachments
      if (topicToEdit.anexos) {
        setExistingFiles(topicToEdit.anexos);
      }
    } else {
      resetForm();
    }
  }, [topicToEdit]);

  const resetForm = () => {
    setFormData({ title: '', category: '', description: '' });
    setFiles([]);
    setImages([]);
    setLinks([]);
    setLinkUrl('');
    setShowLinkInput(false);
    setExistingFiles([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const allFiles = [...files, ...images];
      
      if (topicToEdit) {
        await editarTopico(
          topicToEdit.idTopico,
          formData.title,
          formData.category,
          formData.description,
          allFiles,
          links
        );
        toast.success('Tópico editado com sucesso!');
      } else {
        await criarTopico(
          formData.title,
          formData.category,
          formData.description,
          allFiles,
          links
        );
        toast.success('Tópico criado com sucesso!');
      }
      
      setIsLoading(false);
      onClose();
      resetForm();
    } catch (error) {
      console.error('Erro ao criar/editar tópico:', error);
      toast.error(error.message || 'Erro ao criar/editar tópico');
      setIsLoading(false);
    }
  };

  const handleLinkToggle = () => {
    setShowLinkInput(!showLinkInput);
  };

  const handleLinkSubmit = (e) => {
    e.preventDefault();
    if (linkUrl) {
      setLinks(prev => [...prev, linkUrl]);
      setLinkUrl('');
      setShowLinkInput(false);
    }
  };

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...uploadedFiles]);
  };

  const handleImageUpload = (e) => {
    const uploadedImages = Array.from(e.target.files);
    setImages(prev => [...prev, ...uploadedImages]);
  };

  const removeFile = (index, type) => {
    if (type === 'file') {
      setFiles(prev => prev.filter((_, i) => i !== index));
    } else if (type === 'image') {
      setImages(prev => prev.filter((_, i) => i !== index));
    } else if (type === 'link') {
      setLinks(prev => prev.filter((_, i) => i !== index));
    } else if (type === 'existing') {
      setExistingFiles(prev => prev.filter((_, i) => i !== index));
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 overflow-y-auto">
        <div className="bg-[#0A0E45] rounded-lg p-6 w-11/12 max-w-lg text-white max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">{topicToEdit ? 'Editar tópico' : 'Adicionar novo tópico'}</h2>
            <button onClick={onClose} className="text-white hover:opacity-80">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="title" className="block mb-2 text-sm font-medium">Título:</label>
              <input
                type="text"
                id="title"
                placeholder="Título"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                disabled={isLoading}
                className="w-full p-3 rounded-lg text-sm text-[#0A0E45]"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="category" className="block mb-2 text-sm font-medium">Categoria:</label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                disabled={isLoading}
                className="w-full p-3 rounded-lg text-sm text-[#0A0E45]"
              >
                <option value="">Selecione uma categoria</option>
                {categories.map((category) => (
                  <option key={category.idCategoria} value={category.idCategoria}>
                    {category.titulo}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-5">
              <label htmlFor="description" className="block mb-2 text-sm font-medium">Descrição:</label>
              <textarea
                id="description"
                placeholder="Descrição aqui..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                disabled={isLoading}
                className="w-full p-3 rounded-lg text-sm text-[#0A0E45] h-36 resize-y"
              />
            </div>

            <div className="flex gap-4 mb-6">
              <button type="button" onClick={handleLinkToggle} disabled={isLoading} className="text-white hover:opacity-80">
                <Link size={20} />
              </button>
              <label htmlFor="file-upload" className="cursor-pointer text-white hover:opacity-80">
                <FileText size={20} />
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  onChange={handleFileUpload}
                  disabled={isLoading}
                  className="hidden"
                />
              </label>
              <label htmlFor="image-upload" className="cursor-pointer text-white hover:opacity-80">
                <Image size={20} />
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  multiple
                  disabled={isLoading}
                  className="hidden"
                />
              </label>
            </div>

            {showLinkInput && (
              <div className="flex gap-2 mb-5">
                <input
                  type="url"
                  placeholder="Insira o URL do link"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  disabled={isLoading}
                  className="flex-grow p-3 rounded-lg text-sm text-[#0A0E45]"
                />
                <button 
                  type="button" 
                  onClick={handleLinkSubmit} 
                  disabled={isLoading}
                  className="bg-[#00C853] text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#00a847] transition-colors"
                >
                  Adicionar Link
                </button>
              </div>
            )}

            {(files.length > 0 || images.length > 0 || links.length > 0 || existingFiles.length > 0) && (
              <div className="mt-5 mb-6">
                <h4 className="text-base font-medium mb-2">Arquivos e links anexados:</h4>
                <div className="max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                  <ul className="list-none pl-0 space-y-2">
                    {existingFiles.map((file, index) => (
                      <li key={`existing-${index}`} className="text-sm flex justify-between items-center bg-[#1a1f6d] p-2 rounded">
                        <span className="truncate flex-1 mr-2">{file.nome}</span>
                        <button 
                          type="button" 
                          onClick={() => removeFile(index, 'existing')} 
                          className="text-red-500 hover:text-red-700 flex-shrink-0"
                        >
                          <X size={16} />
                        </button>
                      </li>
                    ))}
                    {files.map((file, index) => (
                      <li key={`file-${index}`} className="text-sm flex justify-between items-center bg-[#1a1f6d] p-2 rounded">
                        <span className="truncate flex-1 mr-2">{file.name}</span>
                        <button 
                          type="button" 
                          onClick={() => removeFile(index, 'file')} 
                          className="text-red-500 hover:text-red-700 flex-shrink-0"
                        >
                          <X size={16} />
                        </button>
                      </li>
                    ))}
                    {images.map((image, index) => (
                      <li key={`image-${index}`} className="text-sm flex justify-between items-center bg-[#1a1f6d] p-2 rounded">
                        <span className="truncate flex-1 mr-2">{image.name}</span>
                        <button 
                          type="button" 
                          onClick={() => removeFile(index, 'image')} 
                          className="text-red-500 hover:text-red-700 flex-shrink-0"
                        >
                          <X size={16} />
                        </button>
                      </li>
                    ))}
                    {links.map((link, index) => (
                      <li key={`link-${index}`} className="text-sm flex justify-between items-center bg-[#1a1f6d] p-2 rounded">
                        <span className="truncate flex-1 mr-2">{link}</span>
                        <button 
                          type="button" 
                          onClick={() => removeFile(index, 'link')} 
                          className="text-red-500 hover:text-red-700 flex-shrink-0"
                        >
                          <X size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <button 
              type="submit" 
              className="w-full bg-[#00C853] text-white rounded-lg py-3 text-base font-medium hover:bg-[#00a847] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Carregando...' : (topicToEdit ? 'Salvar alterações' : 'Postar tópico')}
            </button>
          </form>
        </div>
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1a1f6d;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3f51b5;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #303f9f;
        }
      `}</style>
    </>
  );
};

export default NewTopicModal;

