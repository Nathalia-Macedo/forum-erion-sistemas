// import React, { useContext, useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { ForumContext } from '../../Context/Dados';
// import TopicCard from '../../Components/TopicCard/TopicCard';
// import Loading from '../../Components/Loading/Carregando';
// import SimplifiedHeader from '../../Components/SimplifiedHeader/SimplifiedHeader';
// import { Settings } from 'lucide-react';

// const UserProfile = () => {
//   const { idUsuario } = useParams();
//   const { fetchUserProfile, user } = useContext(ForumContext);
//   const [profileData, setProfileData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   useEffect(() => {
//     const loadUserProfile = async () => {
//       setIsLoading(true);
//       try {
//         const data = await fetchUserProfile(idUsuario);
//         setProfileData(data);
//       } catch (err) {
//         console.error('Error fetching user profile:', err);
//         setError('Falha ao carregar o perfil do usuário. Por favor, tente novamente.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadUserProfile();
//   }, [idUsuario, fetchUserProfile]);

//   const handleChangePassword = () => {
//     // Implement password change logic here
//     console.log('Change password');
//     setIsMenuOpen(false);
//   };

//   const handleChangeProfilePicture = () => {
//     // Implement profile picture change logic here
//     console.log('Change profile picture');
//     setIsMenuOpen(false);
//   };

//   if (isLoading) {
//     return (
//       <>
//         <SimplifiedHeader />
//         <div className="flex justify-center items-center min-h-screen">
//           <Loading />
//         </div>
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <SimplifiedHeader />
//         <div className="text-red-500 text-center mt-4">{error}</div>
//       </>
//     );
//   }

//   if (!profileData) {
//     return (
//       <>
//         <SimplifiedHeader />
//         <div className="text-center mt-4">Usuário não encontrado</div>
//       </>
//     );
//   }

//   const defaultImage = "https://via.placeholder.com/150";

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <SimplifiedHeader />
//       <div className="py-8">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-white shadow-md rounded-lg overflow-hidden relative">
//             <div className="absolute top-4 right-4">
//               <div className="relative">
//                 <button
//                   onClick={() => setIsMenuOpen(!isMenuOpen)}
//                   className="text-gray-500 hover:text-gray-700 focus:outline-none"
//                 >
//                   <Settings size={24} />
//                 </button>
//                 {isMenuOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
//                     <button
//                       onClick={handleChangePassword}
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//                     >
//                       Alterar senha
//                     </button>
//                     <button
//                       onClick={handleChangeProfilePicture}
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//                     >
//                       Alterar foto do perfil
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="p-6">
//               <div className="flex items-center mb-6">
//                 <img
//                   src={profileData.user.foto || defaultImage}
//                   alt={profileData.user.nome}
//                   className="w-20 h-20 rounded-full object-cover mr-4"
//                 />
//                 <div>
//                   <h1 className="text-2xl font-bold text-gray-900">{profileData.user.nome}</h1>
//                   <p className="text-sm text-gray-500">
//                     Membro desde {new Date(profileData.user.criadoEm).toLocaleDateString('pt-BR')}
//                   </p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                 <div>
//                   <p className="text-sm font-medium text-gray-500">Email</p>
//                   <p className="mt-1">{profileData.user.email}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-500">Função</p>
//                   <p className="mt-1">{profileData.user.role}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-500">Categorias Criadas</p>
//                   <p className="mt-1">{profileData.categories.length}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-500">Tópicos Criados</p>
//                   <p className="mt-1">{profileData.topics.length}</p>
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <h2 className="text-xl font-semibold mb-3">Categorias Criadas</h2>
//                 {profileData.categories.length > 0 ? (
//                   <ul className="space-y-2">
//                     {profileData.categories.map(category => (
//                       <li key={category.idCategoria} className="bg-gray-50 p-3 rounded shadow">
//                         <h3 className="font-medium">{category.titulo}</h3>
//                         <p className="text-sm text-gray-600">{category.subTitulo}</p>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p className="text-gray-500">Este usuário ainda não criou nenhuma categoria.</p>
//                 )}
//               </div>

//               <div>
//                 <h2 className="text-xl font-semibold mb-3">Tópicos Criados</h2>
//                 {profileData.topics.length > 0 ? (
//                   <div className="space-y-4">
//                     {profileData.topics.map(topic => (
//                       <Link key={topic.idTopico} to={`/topic/${topic.idTopico}`} className="block">
//                         <TopicCard topic={topic} />
//                       </Link>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-gray-500">Este usuário ainda não criou nenhum tópico.</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ForumContext } from '../../Context/Dados';
import TopicCard from '../../Components/TopicCard/TopicCard';
import Loading from '../../Components/Loading/Carregando';
import SimplifiedHeader from '../../Components/SimplifiedHeader/SimplifiedHeader';
import ProfilePhotoModal from '../../Components/UpdatePhotoProfile/AtualizarFoto';
import { Settings } from 'lucide-react';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const { idUsuario } = useParams();
  const { fetchUserProfile, user, updateProfilePhoto } = useContext(ForumContext);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  useEffect(() => {
    const loadUserProfile = async () => {
      setIsLoading(true);
      try {
        const data = await fetchUserProfile(idUsuario);
        setProfileData(data);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Falha ao carregar o perfil do usuário. Por favor, tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserProfile();
  }, [idUsuario, fetchUserProfile]);

  const handleChangePassword = () => {
    // Implement password change logic here
    console.log('Change password');
    setIsMenuOpen(false);
  };

  const handleChangeProfilePicture = () => {
    setIsPhotoModalOpen(true);
    setIsMenuOpen(false);
  };

  const handlePhotoUpload = async (file) => {
    try {
      await updateProfilePhoto(file);
      toast.success('Foto do perfil atualizada com sucesso!');
      // Refresh profile data to show the new photo
      const updatedData = await fetchUserProfile(idUsuario);
      setProfileData(updatedData);
    } catch (error) {
      toast.error('Erro ao atualizar foto do perfil');
    }
  };

  if (isLoading) {
    return (
      <>
        <SimplifiedHeader />
        <div className="flex justify-center items-center min-h-screen">
          <Loading />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <SimplifiedHeader />
        <div className="text-red-500 text-center mt-4">{error}</div>
      </>
    );
  }

  if (!profileData) {
    return (
      <>
        <SimplifiedHeader />
        <div className="text-center mt-4">Usuário não encontrado</div>
      </>
    );
  }

  const defaultImage = "https://via.placeholder.com/150";

  return (
    <div className="min-h-screen bg-gray-100">
      <SimplifiedHeader />
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-md rounded-lg overflow-hidden relative">
            <div className="absolute top-4 right-4">
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <Settings size={24} />
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <button
                      onClick={handleChangePassword}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Alterar senha
                    </button>
                    <button
                      onClick={handleChangeProfilePicture}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Alterar foto do perfil
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-6">
                <img
                  src={profileData.user.foto || defaultImage}
                  alt={profileData.user.nome}
                  className="w-20 h-20 rounded-full object-cover mr-4"
                />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{profileData.user.nome}</h1>
                  <p className="text-sm text-gray-500">
                    Membro desde {new Date(profileData.user.criadoEm).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="mt-1">{profileData.user.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Função</p>
                  <p className="mt-1">{profileData.user.role}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Categorias Criadas</p>
                  <p className="mt-1">{profileData.categories.length}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Tópicos Criados</p>
                  <p className="mt-1">{profileData.topics.length}</p>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Categorias Criadas</h2>
                {profileData.categories.length > 0 ? (
                  <ul className="space-y-2">
                    {profileData.categories.map(category => (
                      <li key={category.idCategoria} className="bg-gray-50 p-3 rounded shadow">
                        <h3 className="font-medium">{category.titulo}</h3>
                        <p className="text-sm text-gray-600">{category.subTitulo}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">Este usuário ainda não criou nenhuma categoria.</p>
                )}
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Tópicos Criados</h2>
                {profileData.topics.length > 0 ? (
                  <div className="space-y-4">
                    {profileData.topics.map(topic => (
                      <Link key={topic.idTopico} to={`/topic/${topic.idTopico}`} className="block">
                        <TopicCard topic={topic} />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Este usuário ainda não criou nenhum tópico.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProfilePhotoModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        onUpload={handlePhotoUpload}
      />
    </div>
  );
};

export default UserProfile;

