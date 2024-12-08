// import React, { useState } from 'react';
// import { X, Upload } from 'lucide-react';

// const ProfilePhotoModal = ({ isOpen, onClose, onUpload }) => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);

//   const handleFileSelect = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewUrl(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (selectedFile) {
//       await onUpload(selectedFile);
//       setSelectedFile(null);
//       setPreviewUrl(null);
//       onClose();
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//         >
//           <X size={24} />
//         </button>
        
//         <h2 className="text-2xl font-bold mb-4">Alterar Foto do Perfil</h2>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleFileSelect}
//               className="hidden"
//               id="photo-upload"
//             />
//             <label
//               htmlFor="photo-upload"
//               className="flex flex-col items-center justify-center cursor-pointer"
//             >
//               {previewUrl ? (
//                 <img
//                   src={previewUrl}
//                   alt="Preview"
//                   className="w-32 h-32 rounded-full object-cover mb-4"
//                 />
//               ) : (
//                 <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mb-4">
//                   <Upload size={32} className="text-gray-400" />
//                 </div>
//               )}
//               <span className="text-sm text-gray-600">
//                 {previewUrl ? 'Clique para alterar a foto' : 'Clique para selecionar uma foto'}
//               </span>
//             </label>
//           </div>

//           <div className="flex justify-end space-x-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
//             >
//               Cancelar
//             </button>
//             <button
//               type="submit"
//               disabled={!selectedFile}
//               className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
//             >
//               Salvar
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProfilePhotoModal;

import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';

const ProfilePhotoModal = ({ isOpen, onClose, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleFileChange = (file) => {
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      await onUpload(selectedFile);
      setSelectedFile(null);
      setPreviewUrl(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold mb-4">Alterar Foto do Perfil</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div 
            className={`border-2 border-dashed ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} rounded-lg p-4`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e.target.files[0])}
              className="hidden"
              id="photo-upload"
            />
            <label
              htmlFor="photo-upload"
              className="flex flex-col items-center justify-center cursor-pointer"
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-32 h-32 rounded-full object-cover mb-4"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Upload size={32} className="text-gray-400" />
                </div>
              )}
              <span className="text-sm text-gray-600">
                {previewUrl ? 'Clique ou arraste para alterar a foto' : 'Clique ou arraste para selecionar uma foto'}
              </span>
            </label>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!selectedFile}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePhotoModal;

