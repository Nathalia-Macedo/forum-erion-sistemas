// // NewTopicModal.jsx
// import React, { useState } from 'react';
// import { X, Link, FileText, Image } from 'lucide-react';
// import './AddTopic.css';

// const NewTopicModal = ({ isOpen, onClose }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     category: '',
//     description: ''
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission here
//     console.log(formData);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <div className="modal-header">
//           <h2>Adicionar novo tópico</h2>
//           <button onClick={onClose} className="close-button">
//             <X size={24} color="white" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="title">Título:</label>
//             <input
//               type="text"
//               id="title"
//               placeholder="Título"
//               value={formData.title}
//               onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="category">Categoria:</label>
//             <select
//               id="category"
//               value={formData.category}
//               onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//             >
//               <option value="">Selecione uma categoria</option>
//               <option value="programming">Programming</option>
//               <option value="design">Design</option>
//               <option value="off-topic">Off-topic</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <label htmlFor="description">Descrição:</label>
//             <textarea
//               id="description"
//               placeholder="Descrição aqui..."
//               value={formData.description}
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//             />
//           </div>

//           <div className="attachment-icons">
//             <button type="button">
//               <Link size={20} />
//             </button>
//             <button type="button">
//               <FileText size={20} />
//             </button>
//             <button type="button">
//               <Image size={20} />
//             </button>
//           </div>

//           <button type="submit" className="submit-button">
//             Postar tópico
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default NewTopicModal;

// NewTopicModal.jsx
import React, { useState, useContext } from 'react';
import { X, Link, FileText, Image } from 'lucide-react';
import './AddTopic.css';
import { ForumContext } from '../../Context/Dados';
const NewTopicModal = ({ isOpen, onClose }) => {
  const { categories, criarTopico } = useContext(ForumContext);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await criarTopico(formData.title, formData.category, formData.description);
      onClose();
    } catch (error) {
      console.error('Erro ao criar tópico:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Adicionar novo tópico</h2>
          <button onClick={onClose} className="close-button">
            <X size={24} color="white" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Título:</label>
            <input
              type="text"
              id="title"
              placeholder="Título"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Categoria:</label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((category) => (
                <option key={category.idCategoria} value={category.idCategoria}>
                  {category.titulo}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Descrição:</label>
            <textarea
              id="description"
              placeholder="Descrição aqui..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="attachment-icons">
            <button type="button">
              <Link size={20} />
            </button>
            <button type="button">
              <FileText size={20} />
            </button>
            <button type="button">
              <Image size={20} />
            </button>
          </div>

          <button type="submit" className="submit-button">
            Postar tópico
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewTopicModal;