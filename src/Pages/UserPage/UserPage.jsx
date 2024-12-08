// import React, { useContext, useEffect, useMemo, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ForumContext } from '../../Context/Dados';
// import Modal from '../../Components/Modal/Modal';
// import { Trash2, Edit, Paperclip, UserCog, Settings, MoreVertical, Search, ChevronDown, AlertCircle, UserX } from 'lucide-react';
// import { toast } from 'react-toastify';
// import SimplifiedHeader from '../../Components/SimplifiedHeader/SimplifiedHeader';
// import Loading from '../../Components/Loading/Carregando';
// import ProfilePhotoModal from '../../Components/UpdatePhotoProfile/AtualizarFoto';
// import PasswordChangeModal from '../../Components/PasswordChange/PasswordChange';
// import NewTopicModal from '../../Components/AddTopic/AddTopic';
// import EditCategoryModal from '../../Components/EditCategoryModal/EditCategoryModal'
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../Components/Tooltip/Tooltip";


// const formatDate = (dateString) => {
//   const [datePart] = dateString.split(' ');
//   return datePart;
// };

// const sortByDate = (a, b) => new Date(b.criadoEm) - new Date(a.criadoEm);

// const NoResultsMessage = ({ message }) => (
//   <div className="flex items-center justify-center p-4 text-gray-500">
//     <AlertCircle className="mr-2" size={20} />
//     <p>{message}</p>
//   </div>
// );

// const UserInfoScreen = () => {
//   const { user, categories, topicos, fetchTopicos, allUsers, fetchAllUsers, deleteUser, alterarPermissaoUsuario, activateUserAccount, updateProfilePhoto, updatePassword, deleteTopic, fetchCategories, deletarCategoria } = useContext(ForumContext);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
//   const [userToDelete, setUserToDelete] = useState(null);
//   const [userToChangePermission, setUserToChangePermission] = useState(null);
//   const [newPermission, setNewPermission] = useState('');
//   const [activeTab, setActiveTab] = useState('users');
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isActivationModalOpen, setIsActivationModalOpen] = useState(false);
//   const [userToActivate, setUserToActivate] = useState(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
//   const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
//   const [topicToDelete, setTopicToDelete] = useState(null);
//   const [isDeleteTopicModalOpen, setIsDeleteTopicModalOpen] = useState(false);
//   const [openMenuId, setOpenMenuId] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isNewTopicModalOpen, setIsNewTopicModalOpen] = useState(false);
//   const [topicToEdit, setTopicToEdit] = useState(null);
//   const [expandedUsers, setExpandedUsers] = useState({});
//   const [categoryToDelete, setCategoryToDelete] = useState(null);
//   const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] = useState(false);
//   const [categoryToEdit, setCategoryToEdit] = useState(null);
//   const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);


//   useEffect(() => {
//     const loadData = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         await fetchTopicos();
//         if (user && user.role === 'ADMIN') {
//           await fetchAllUsers();
//           await fetchCategories();
//         }
//       } catch (error) {
//         console.error('Erro ao carregar dados:', error);
//         setError('Falha ao carregar dados. Por favor, tente novamente.');
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     loadData();
//   }, [fetchTopicos, fetchAllUsers, user, fetchCategories]);

//   const userCategories = useMemo(() => {
//     if (!user || !categories) return [];
//     return categories.filter(category => category.criadoPor.idUsuario === user.idUsuario);
//   }, [user, categories]);

//   const userTopics = useMemo(() => {
//     if (!user || !topicos) return [];
//     return topicos.filter(topic => topic.criadoPor.idUsuario === user.idUsuario);
//   }, [user, topicos]);

//   const filteredUsers = useMemo(() => {
//     if (!searchQuery.trim() || !allUsers) return allUsers?.sort(sortByDate);
//     const query = searchQuery.toLowerCase();
//     return allUsers.filter(user => 
//       user.nome.toLowerCase().includes(query) ||
//       user.email.toLowerCase().includes(query) ||
//       user.role.toLowerCase().includes(query)
//     ).sort(sortByDate);
//   }, [allUsers, searchQuery]);

//   const filteredTopics = useMemo(() => {
//     if (!searchQuery.trim() || !topicos) return topicos?.sort(sortByDate);
//     const query = searchQuery.toLowerCase();
//     return topicos.filter(topic => 
//       topic.titulo.toLowerCase().includes(query) ||
//       topic.descricao.toLowerCase().includes(query) ||
//       topic.categoria.titulo.toLowerCase().includes(query) ||
//       topic.criadoPor.nome.toLowerCase().includes(query)
//     ).sort(sortByDate);
//   }, [topicos, searchQuery]);

//   const filteredCategories = useMemo(() => {
//     if (!searchQuery.trim() || !categories) return categories?.sort(sortByDate);
//     const query = searchQuery.toLowerCase();
//     return categories.filter(category => 
//       category.titulo.toLowerCase().includes(query) ||
//       category.subTitulo.toLowerCase().includes(query) ||
//       category.criadoPor.nome.toLowerCase().includes(query)
//     ).sort(sortByDate);
//   }, [categories, searchQuery]);

//   const handleDeleteUser = (userItem) => {
//     setUserToDelete(userItem);
//     setIsDeleteModalOpen(true);
//   };

//   const confirmDeleteUser = async () => {
//     if (userToDelete) {
//       try {
//         await deleteUser(userToDelete.idUsuario);
//         setIsDeleteModalOpen(false);
//         setUserToDelete(null);
//         toast.success(`Usuário ${userToDelete.nome} deletado com sucesso!`);
//         await fetchAllUsers();
//       } catch (error) {
//         console.error('Erro ao deletar usuário:', error);
//         toast.error('Falha ao deletar usuário. Por favor, tente novamente.');
//       }
//     }
//   };

//   const handleChangePermission = (userItem) => {
//     setUserToChangePermission(userItem);
//     setNewPermission(userItem.role === 'ADMIN' ? 'USER' : 'ADMIN');
//     setIsPermissionModalOpen(true);
//   };

//   const confirmChangePermission = async () => {
//     if (userToChangePermission && newPermission) {
//       try {
//         await alterarPermissaoUsuario(userToChangePermission.idUsuario, newPermission);
//         toast.success(`Permissão de ${userToChangePermission.nome} alterada para ${newPermission}`);
//         setIsPermissionModalOpen(false);
//         await fetchAllUsers();
//       } catch (error) {
//         console.error('Erro ao alterar permissão do usuário:', error);
//         toast.error('Falha ao alterar permissão do usuário. Por favor, tente novamente.');
//       }
//     }
//   };

//   const handleActivateUser = (userItem) => {
//     setUserToActivate(userItem);
//     setIsActivationModalOpen(true);
//   };

//   const confirmActivateUser = async () => {
//     if (userToActivate) {
//       try {
//         await activateUserAccount(userToActivate.email);
//         toast.success(`Conta de ${userToActivate.nome} ativada com sucesso!`);
//         setIsActivationModalOpen(false);
//         setUserToActivate(null);
//         await fetchAllUsers();
//       } catch (error) {
//         console.error('Erro ao ativar conta do usuário:', error);
//         toast.error('Falha ao ativar conta do usuário. Por favor, tente novamente.');
//       }
//     }
//   };

//   const handleChangePassword = () => {
//     setIsPasswordModalOpen(true);
//     setIsMenuOpen(false);
//   };

//   const handleChangeProfilePicture = () => {
//     setIsPhotoModalOpen(true);
//     setIsMenuOpen(false);
//   };

//   const handlePhotoUpload = async (file) => {
//     try {
//       await updateProfilePhoto(file);
//       toast.success('Foto do perfil atualizada com sucesso!');
//       await fetchAllUsers();
//     } catch (error) {
//       toast.error('Erro ao atualizar foto do perfil');
//     }
//   };

//   const handlePasswordChange = async (userId, currentPassword, newPassword) => {
//     try {
//       await updatePassword(userId, currentPassword, newPassword);
//       toast.success('Senha atualizada com sucesso!');
//       setIsPasswordModalOpen(false);
//       setUserToChangePermission(null);
//     } catch (error) {
//       console.error('Erro ao atualizar senha:', error);
//       toast.error('Erro ao atualizar senha: ' + error.message);
//     }
//   };

//   const handleDeleteTopic = (topic) => {
//     setTopicToDelete(topic);
//     setIsDeleteTopicModalOpen(true);
//   };

//   const confirmDeleteTopic = async () => {
//     if (topicToDelete) {
//       try {
//         await deleteTopic(topicToDelete.idTopico);
//         setIsDeleteTopicModalOpen(false);
//         setTopicToDelete(null);
//         toast.success('Tópico deletado com sucesso!');
//         await fetchTopicos();
//       } catch (error) {
//         console.error('Erro ao deletar tópico:', error);
//         toast.error('Falha ao deletar tópico. Por favor, tente novamente.');
//       }
//     }
//   };

//   const handleMoreOptionsClick = (e, id, type) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setOpenMenuId(openMenuId === id ? null : id);
//   };

//   const handleEditTopic = (topic) => {
//     setTopicToEdit(topic);
//     setIsNewTopicModalOpen(true);
//   };

//   const handleCloseNewTopicModal = () => {
//     setIsNewTopicModalOpen(false);
//     setTopicToEdit(null);
//   };

//   const toggleUserExpansion = (userId) => {
//     setExpandedUsers(prev => ({
//       ...prev,
//       [userId]: !prev[userId]
//     }));
//   };

//   const handleDeleteCategory = (category) => {
//     setCategoryToDelete(category);
//     setIsDeleteCategoryModalOpen(true);
//   };

//   const confirmDeleteCategory = async () => {
//     if (categoryToDelete) {
//       try {
//         await deletarCategoria(categoryToDelete.idCategoria);
//         setIsDeleteCategoryModalOpen(false);
//         setCategoryToDelete(null);
//         toast.success('Categoria deletada com sucesso!');
//         await fetchCategories();
//       } catch (error) {
//         console.error('Erro ao deletar categoria:', error);
//         toast.error('Falha ao deletar categoria. Por favor, tente novamente.');
//       }
//     }
//   };

//   const handleEditCategory = (category) => {
//     setCategoryToEdit(category);
//     setIsEditCategoryModalOpen(true);
//   };


//   if (isLoading) {
//     return <Loading />;
//   }

//   if (error) {
//     return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
//   }

//   if (!user) {
//     return <div className="flex justify-center items-center h-screen">Usuário não encontrado.</div>;
//   }

//   const defaultImage = "https://via.placeholder.com/150";

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <SimplifiedHeader />
//       <header className="bg-white shadow relative">
//         <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center">
//           <img
//             src={user.foto || defaultImage}
//             alt={user.nome}
//             className="w-24 h-24 rounded-full object-cover mb-4 sm:mb-0 sm:mr-6"
//           />
//           <div className="text-center sm:text-left">
//             <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{user.nome}</h1>
//             <p className="mt-1 text-sm text-gray-500">
//               Membro desde {formatDate(user.criadoEm)}
//             </p>
//           </div>
//           <div className="absolute top-4 right-4">
//             <div className="relative">
//               <button
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className="text-gray-500 hover:text-gray-700 focus:outline-none"
//               >
//                 <Settings size={24} />
//               </button>
//               {isMenuOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
//                   <button
//                     onClick={() => {
//                       setIsPasswordModalOpen(true);
//                       setUserToChangePermission(user);
//                     }}
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//                   >
//                     Alterar senha
//                   </button>
//                   <button
//                     onClick={handleChangeProfilePicture}
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//                   >
//                     Alterar foto do perfil
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//         <div className="mb-6">
//           <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
//             <h2 className="text-xl font-semibold mb-4">Informações do Usuário</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Email</p>
//                 <p className="mt-1">{user.email}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Função</p>
//                 <p className="mt-1">{user.role}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Categorias Criadas</p>
//                 <p className="mt-1">{userCategories.length}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Tópicos Criados</p>
//                 <p className="mt-1">{userTopics.length}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {user && user.role === 'ADMIN' && (
//           <div className="mt-8">
//             <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
//               <div>
//                 <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
//                   <div className="mb-4 sm:mb-0 flex flex-wrap justify-center sm:justify-start">
//                     <button
//                       className={`mr-2 mb-2 sm:mb-0 px-4 py-2 ${activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//                       onClick={() => setActiveTab('users')}
//                     >
//                       Usuários
//                     </button>
//                     <button
//                       className={`mr-2 mb-2 sm:mb-0 px-4 py-2 ${activeTab === 'topics' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//                       onClick={() => setActiveTab('topics')}
//                     >
//                       Tópicos
//                     </button>
//                     <button
//                       className={`px-4 py-2 ${activeTab === 'categories' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//                       onClick={() => setActiveTab('categories')}
//                     >
//                       Categorias
//                     </button>
//                   </div>
//                   <div className="relative w-full sm:w-auto">
//                     <input
//                       type="text"
//                       placeholder="Pesquisar..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                   </div>
//                 </div>
//                 <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
//                   {activeTab === 'users' && (
//                     <div>
//                       <h2 className="text-xl font-semibold mb-4 px-4 pt-4">Lista de Usuários</h2>
//                       <div className="hidden sm:block">
//                         <table className="min-w-full divide-y divide-gray-200">
//                           <thead className="bg-gray-50">
//                             <tr>
//                               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
//                               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Função</th>
//                               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data de Criação</th>
//                               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
//                             </tr>
//                           </thead>
//                           <tbody className="bg-white divide-y divide-gray-200">
//                             {filteredUsers.length > 0 ? (
//                               filteredUsers.map((userItem) => (
//                                 <tr key={userItem.idUsuario}>
//                                   <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => window.location.href = `/user/${userItem.idUsuario}`}>
//                                     <span className="text-blue-600 hover:text-blue-800">
//                                       {userItem.nome}
//                                     </span>
//                                   </td>
//                                   <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => window.location.href = `/user/${userItem.idUsuario}`}>
//                                     <span className="text-blue-600 hover:text-blue-800">
//                                       {userItem.email}
//                                     </span>
//                                   </td>
//                                   <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => window.location.href = `/user/${userItem.idUsuario}`}>
//                                     <span className="text-blue-600 hover:text-blue-800">
//                                       {userItem.role}
//                                     </span>
//                                   </td>
//                                   <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => window.location.href = `/user/${userItem.idUsuario}`}>
//                                     <span className="text-blue-600 hover:text-blue-800">
//                                       {formatDate(userItem.criadoEm)}
//                                     </span>
//                                   </td>
//                                   <td className="px-6 py-4 whitespace-nowrap">
//                                     <div className="flex items-center space-x-2">
//                                       <TooltipProvider>
//                                         <Tooltip>
//                                           <TooltipTrigger asChild>
//                                             <button
//                                               onClick={() => handleDeleteUser(userItem)}
//                                               className="text-red-600 hover:text-red-900"
//                                             >
//                                               <Trash2 className="w-5 h-5" />
//                                             </button>
//                                           </TooltipTrigger>
//                                           <TooltipContent>
//                                             <p>Deletar usuário</p>
//                                           </TooltipContent>
//                                         </Tooltip>
//                                         <Tooltip>
//                                           <TooltipTrigger asChild>
//                                             <button
//                                               onClick={() => handleDeleteUser(userItem)}
//                                               className="text-red-600 hover:text-red-900"
//                                             >
//                                               <UserX className="w-5 h-5" />
//                                             </button>
//                                           </TooltipTrigger>
//                                           <TooltipContent>
//                                             <p>Deletar usuário</p>
//                                           </TooltipContent>
//                                         </Tooltip>
//                                         <Tooltip>
//                                           <TooltipTrigger asChild>
//                                             <button
//                                               onClick={() => {
//                                                 setIsPasswordModalOpen(true);
//                                                 setUserToChangePermission(userItem);
//                                               }}
//                                               className="text-blue-600 hover:text-blue-900"
//                                             >
//                                               <Edit className="w-5 h-5" />
//                                             </button>
//                                           </TooltipTrigger>
//                                           <TooltipContent>
//                                             <p>Editar senha</p>
//                                           </TooltipContent>
//                                         </Tooltip>
//                                         <Tooltip>
//                                           <TooltipTrigger asChild>
//                                             <button
//                                               onClick={() => handleChangePermission(userItem)}
//                                               className="text-green-600 hover:text-green-900"
//                                             >
//                                               <UserCog className="w-5 h-5" />
//                                             </button>
//                                           </TooltipTrigger>
//                                           <TooltipContent>
//                                             <p>Alterar permissão</p>
//                                           </TooltipContent>
//                                         </Tooltip>
//                                         {!userItem.ativo && (
//                                           <Tooltip>
//                                             <TooltipTrigger asChild>
//                                               <button
//                                                 onClick={() => handleActivateUser(userItem)}
//                                                 className="text-yellow-600 hover:text-yellow-900"
//                                               >
//                                                 <UserCog className="w-5 h-5" />
//                                               </button>
//                                             </TooltipTrigger>
//                                             <TooltipContent>
//                                               <p>Ativar conta</p>
//                                             </TooltipContent>
//                                           </Tooltip>
//                                         )}
//                                       </TooltipProvider>
//                                     </div>
//                                   </td>
//                                 </tr>
//                               ))
//                             ) : (
//                               <tr>
//                                 <td colSpan="5">
//                                   <NoResultsMessage message="Nenhum usuário encontrado." />
//                                 </td>
//                               </tr>
//                             )}
//                           </tbody>
//                         </table>
//                       </div>
//                       <div className="sm:hidden">
//                         {filteredUsers.map((userItem) => (
//                           <div key={userItem.idUsuario} className="bg-white shadow overflow-hidden sm:rounded-lg mb-4">
//                             <div className="px-4 py-5 sm:px-6">
//                               <h3 className="text-lg leading-6 font-medium text-gray-900">{userItem.nome}</h3>
//                               <p className="mt-1 max-w-2xl text-sm text-gray-500">{userItem.email}</p>
//                             </div>
//                             <div className="border-t border-gray-200">
//                               <dl>
//                                 <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                                   <dt className="text-sm font-medium text-gray-500">Função</dt>
//                                   <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userItem.role}</dd>
//                                 </div>
//                                 <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                                   <dt className="text-sm font-medium text-gray-500">Data de Criação</dt>
//                                   <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                                     {formatDate(userItem.criadoEm)}
//                                   </dd>
//                                 </div>
//                               </dl>
//                             </div>
//                             <div className="border-t border-gray-200 px-4 py-4">
//                               <div className="flex justify-between items-center">
//                                 <span className="text-sm font-medium text-gray-500">Ações</span>
//                                 <button 
//                                   onClick={() => toggleUserExpansion(userItem.idUsuario)}
//                                   className="text-blue-600 hover:text-blue-900"
//                                 >
//                                   <ChevronDown className={`w-5 h-5 transform transition-transform ${expandedUsers[userItem.idUsuario] ? 'rotate-180' : ''}`} />
//                                 </button>
//                               </div>
//                               {expandedUsers[userItem.idUsuario] && (
//                                 <div className="mt-2 space-y-2">
//                                   <TooltipProvider>
//                                     <Tooltip>
//                                       <TooltipTrigger asChild>
//                                         <button
//                                           onClick={() => handleDeleteUser(userItem)}
//                                           className="w-full text-left px-2 py-1 text-sm text-red-600 hover:bg-red-100 rounded"
//                                         >
//                                           <Trash2 className="w-4 h-4 inline mr-2" />
//                                           Deletar Usuário
//                                         </button>
//                                       </TooltipTrigger>
//                                       <TooltipContent>
//                                         <p>Deletar usuário</p>
//                                       </TooltipContent>
//                                     </Tooltip>
//                                     <Tooltip>
//                                       <TooltipTrigger asChild>
//                                         <button
//                                           onClick={() => handleDeleteUser(userItem)}
//                                           className="w-full text-left px-2 py-1 text-sm text-red-600 hover:bg-red-100 rounded"
//                                         >
//                                           <UserX className="w-4 h-4 inline mr-2" />
//                                           Deletar Usuário
//                                         </button>
//                                       </TooltipTrigger>
//                                       <TooltipContent>
//                                         <p>Deletar usuário</p>
//                                       </TooltipContent>
//                                     </Tooltip>
//                                     <Tooltip>
//                                       <TooltipTrigger asChild>
//                                         <button
//                                           onClick={() => {
//                                             setIsPasswordModalOpen(true);
//                                             setUserToChangePermission(userItem);
//                                           }}
//                                           className="w-full text-left px-2 py-1 text-sm text-blue-600 hover:bg-blue-100 rounded"
//                                         >
//                                           <Edit className="w-4 h-4 inline mr-2" />
//                                           Alterar Senha
//                                         </button>
//                                       </TooltipTrigger>
//                                       <TooltipContent>
//                                         <p>Editar senha</p>
//                                       </TooltipContent>
//                                     </Tooltip>
//                                     <Tooltip>
//                                       <TooltipTrigger asChild>
//                                         <button
//                                           onClick={() => handleChangePermission(userItem)}
//                                           className="w-full text-left px-2 py-1 text-sm text-green-600 hover:bg-green-100 rounded"
//                                         >
//                                           <UserCog className="w-4 h-4 inline mr-2" />
//                                           Alterar Permissão
//                                         </button>
//                                       </TooltipTrigger>
//                                       <TooltipContent>
//                                         <p>Alterar permissão</p>
//                                       </TooltipContent>
//                                     </Tooltip>
//                                     {!userItem.ativo && (
//                                       <Tooltip>
//                                         <TooltipTrigger asChild>
//                                           <button
//                                             onClick={() => handleActivateUser(userItem)}
//                                             className="w-full text-left px-2 py-1 text-sm text-yellow-600 hover:bg-yellow-100 rounded"
//                                           >
//                                             <UserCog className="w-4 h-4 inline mr-2" />
//                                             Ativar Usuário
//                                           </button>
//                                         </TooltipTrigger>
//                                         <TooltipContent>
//                                           <p>Ativar conta</p>
//                                         </TooltipContent>
//                                       </Tooltip>
//                                     )}
//                                   </TooltipProvider>
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                   {activeTab === 'topics' && (
//                     <div>
//                       <h2 className="text-xl font-semibold mb-4">Lista de Tópicos</h2>
//                       <div className="space-y-4">
//                         {filteredTopics.length > 0 ? (
//                           filteredTopics.map((topic) => (
//                             <div key={topic.idTopico} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200 relative">
//                               <Link to={`/topic/${topic.idTopico}`} className="block">
//                                 <h3 className="text-lg font-semibold pr-8">{topic.titulo}</h3>
//                                 <p className="text-sm text-gray-600">{topic.descricao}</p>
//                                 <p className="text-xs text-gray-500 mt-2">
//                                   Criado por: {topic.criadoPor.nome} em {formatDate(topic.criadoEm)}
//                                 </p>
//                                 <p className="text-xs text-gray-500">
//                                   Categoria: {topic.categoria.titulo}
//                                 </p>
//                                 <p className="text-xs text-gray-500">
//                                   Respostas: {topic.respostas ? topic.respostas.length : 0}
//                                 </p>
//                                 {topic.anexos && topic.anexos.length > 0 && (
//                                   <div className="mt-2">
//                                     <p className="text-xs font-semibold flex items-center">
//                                       <Paperclip className="w-3 h-3 mr-1" />
//                                       Anexos: {topic.anexos.length}
//                                     </p>
//                                   </div>
//                                 )}
//                               </Link>
//                               <div className="absolute top-4 right-4">
//                                 <button
//                                   onClick={(e) => handleMoreOptionsClick(e, topic.idTopico, 'topic')}
//                                   className="text-gray-500 hover:text-gray-700"
//                                 >
//                                   <MoreVertical size={18} />
//                                 </button>
//                                 {openMenuId === topic.idTopico && (
//                                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
//                                     <button
//                                       onClick={(e) => {
//                                         e.preventDefault();
//                                         e.stopPropagation();
//                                         handleEditTopic(topic);
//                                       }}
//                                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//                                     >
//                                       <Edit size={14} className="inline mr-2" />
//                                       Editar
//                                     </button>
//                                     <button
//                                       onClick={(e) => {
//                                         e.preventDefault();
//                                         e.stopPropagation();
//                                         handleDeleteTopic(topic);
//                                       }}
//                                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//                                     >
//                                       <Trash2 size={14} className="inline mr-2" />
//                                       Excluir
//                                     </button>
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           ))
//                         ) : (
//                           <NoResultsMessage message="Nenhum tópico encontrado." />
//                         )}
//                       </div>
//                     </div>
//                   )}
//                   {activeTab === 'categories' && (
//                     <div>
//                       <h2 className="text-xl font-semibold mb-4">Lista de Categorias</h2>
//                       <div className="space-y-4">
//                         {filteredCategories.length > 0 ? (
//                           filteredCategories.map((category) => (
//                             <div key={category.idCategoria} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200 relative">
//                               <h3 className="text-lg font-semibold">{category.titulo}</h3>
//                               <p className="text-sm text-gray-600">{category.subTitulo}</p>
//                               <p className="text-xs text-gray-500 mt-2">
//                                 Criado por: {category.criadoPor.nome}
//                               </p>
//                               <p className="text-xs text-gray-500">
//                                 Posts: {category.postCount}
//                               </p>
//                               <div className="absolute top-4 right-4">
//                                 <button
//                                   onClick={(e) => handleMoreOptionsClick(e, category.idCategoria, 'category')}
//                                   className="text-gray-500 hover:text-gray-700"
//                                 >
//                                   <MoreVertical size={18} />
//                                 </button>
//                                 {openMenuId === category.idCategoria && (
//                                   <div
//                                     className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
//                                     <button
//                                       onClick={(e) => {
//                                         e.preventDefault();
//                                         e.stopPropagation();
//                                         handleEditCategory(category);
//                                       }}
//                                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//                                     >
//                                       <Edit size={14} className="inline mr-2" />
//                                       Editar
//                                     </button>
//                                     <button
//                                       onClick={(e) => {
//                                         e.preventDefault();
//                                         e.stopPropagation();
//                                         handleDeleteCategory(category);
//                                       }}
//                                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//                                     >
//                                       <Trash2 size={14} className="inline mr-2" />
//                                       Excluir
//                                     </button>
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           ))
//                         ) : (
//                           <NoResultsMessage message="Nenhuma categoria encontrada." />
//                         )}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//       <Modal
//         isOpen={isDeleteModalOpen}
//         onClose={() => setIsDeleteModalOpen(false)}
//         onConfirm={confirmDeleteUser}
//         title="Confirmar Deleção"
//         message={`Tem certeza que deseja deletar o usuário ${userToDelete?.nome}?`}
//       />
//       <Modal
//         isOpen={isPermissionModalOpen}
//         onClose={() => setIsPermissionModalOpen(false)}
//         onConfirm={confirmChangePermission}
//         title="Confirmar Alteração de Permissão"
//         message={
//           <div>
//             <p>Tem certeza que deseja alterar a permissão de {userToChangePermission?.nome} para {newPermission}?</p>
//             <p className="textsm text-gray-500mt-2">
//               {newPermission=== 'ADMIN'
//                 ? 'Isso concederá acesso administrativo completo ao usuário.'
//                 : 'Isso removerá o acesso administrativo do usuário.'}
//             </p>
//           </div>
//         }
//       />
//       <Modal
//         isOpen={isActivationModalOpen}
//         onClose={() => setIsActivationModalOpen(false)}
//         onConfirm={confirmActivateUser}
//         title="Confirmar Ativação de Conta"
//         message={`Tem certeza que deseja ativar a conta de ${userToActivate?.nome}?`}
//       />
//       <ProfilePhotoModal
//         isOpen={isPhotoModalOpen}
//         onClose={() => setIsPhotoModalOpen(false)}
//         onUpload={handlePhotoUpload}
//       />
//       <PasswordChangeModal
//         isOpen={isPasswordModalOpen}
//         onClose={() => {
//           setIsPasswordModalOpen(false);
//           setUserToChangePermission(null);
//         }}
//         onSubmit={handlePasswordChange}
//         userName={userToChangePermission?.nome || ''}
//         userId={userToChangePermission?.idUsuario || user.idUsuario}
//       />
//       <Modal
//         isOpen={isDeleteTopicModalOpen}
//         onClose={() => setIsDeleteTopicModalOpen(false)}
//         onConfirm={confirmDeleteTopic}
//         title="Confirmar Exclusão"
//         message={`Tem certeza que deseja excluir o tópico "${topicToDelete?.titulo}"?`}
//       />
//       <NewTopicModal
//         isOpen={isNewTopicModalOpen}
//         onClose={handleCloseNewTopicModal}
//         topicToEdit={topicToEdit}
//       />
//       <EditCategoryModal
//         isOpen={isEditCategoryModalOpen}
//         onClose={() => setIsEditCategoryModalOpen(false)}
//         categoryToEdit={categoryToEdit}
//       />
//       <Modal
//         isOpen={isDeleteCategoryModalOpen}
//         onClose={() => setIsDeleteCategoryModalOpen(false)}
//         onConfirm={confirmDeleteCategory}
//         title="Confirmar Exclusão de Categoria"
//         message={`Tem certeza que deseja excluir a categoria "${categoryToDelete?.titulo}"?`}
//       />
//     </div>
//   );
// };

// export default UserInfoScreen;



import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ForumContext } from '../../Context/Dados';
import Modal from '../../Components/Modal/Modal';
import { Trash2, Edit, Paperclip, UserCog, Settings, MoreVertical, Search, ChevronDown, AlertCircle, UserX } from 'lucide-react';
import { toast } from 'react-toastify';
import SimplifiedHeader from '../../Components/SimplifiedHeader/SimplifiedHeader';
import Loading from '../../Components/Loading/Carregando';
import ProfilePhotoModal from '../../Components/UpdatePhotoProfile/AtualizarFoto';
import PasswordChangeModal from '../../Components/PasswordChange/PasswordChange';
import NewTopicModal from '../../Components/AddTopic/AddTopic';
import EditCategoryModal from '../../Components/EditCategoryModal/EditCategoryModal'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../Components/Tooltip/Tooltip";


const formatDate = (dateString) => {
  const [datePart] = dateString.split(' ');
  return datePart;
};

const sortByDate = (a, b) => new Date(b.criadoEm) - new Date(a.criadoEm);


const NoResultsMessage = ({ message }) => (
  <div className="flex items-center justify-center p-4 text-gray-500">
    <AlertCircle className="mr-2" size={20} />
    <p>{message}</p>
  </div>
);

const UserInfoScreen = () => {
  const { user, categories, topicos, fetchTopicos, allUsers, fetchAllUsers, deleteUser, alterarPermissaoUsuario, activateUserAccount, updateProfilePhoto, updatePassword, deleteTopic, fetchCategories, deletarCategoria } = useContext(ForumContext);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToChangePermission, setUserToChangePermission] = useState(null);
  const [newPermission, setNewPermission] = useState('');
  const [activeTab, setActiveTab] = useState('users');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isActivationModalOpen, setIsActivationModalOpen] = useState(false);
  const [userToActivate, setUserToActivate] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [topicToDelete, setTopicToDelete] = useState(null);
  const [isDeleteTopicModalOpen, setIsDeleteTopicModalOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewTopicModalOpen, setIsNewTopicModalOpen] = useState(false);
  const [topicToEdit, setTopicToEdit] = useState(null);
  const [expandedUsers, setExpandedUsers] = useState({});
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);


  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await fetchTopicos();
        if (user && user.role === 'ADMIN') {
          await fetchAllUsers();
          await fetchCategories();
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setError('Falha ao carregar dados. Por favor, tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [fetchTopicos, fetchAllUsers, user, fetchCategories]);

  const userCategories = useMemo(() => {
    if (!user || !categories) return [];
    return categories.filter(category => category.criadoPor.idUsuario === user.idUsuario);
  }, [user, categories]);

  const userTopics = useMemo(() => {
    if (!user || !topicos) return [];
    return topicos.filter(topic => topic.criadoPor.idUsuario === user.idUsuario);
  }, [user, topicos]);

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim() || !allUsers) return allUsers?.sort(sortByDate);
    const query = searchQuery.toLowerCase();
    return allUsers.filter(user => 
      user.nome.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)
    ).sort(sortByDate);
  }, [allUsers, searchQuery]);

  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim() || !topicos) return topicos?.sort(sortByDate);
    const query = searchQuery.toLowerCase();
    return topicos.filter(topic => 
      topic.titulo.toLowerCase().includes(query) ||
      topic.descricao.toLowerCase().includes(query) ||
      topic.categoria.titulo.toLowerCase().includes(query) ||
      topic.criadoPor.nome.toLowerCase().includes(query)
    ).sort(sortByDate);
  }, [topicos, searchQuery]);

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim() || !categories) return categories?.sort(sortByDate);
    const query = searchQuery.toLowerCase();
    return categories.filter(category => 
      category.titulo.toLowerCase().includes(query) ||
      category.subTitulo.toLowerCase().includes(query) ||
      category.criadoPor.nome.toLowerCase().includes(query)
    ).sort(sortByDate);
  }, [categories, searchQuery]);

  const handleDeleteUser = (userItem) => {
    setUserToDelete(userItem);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteUser = async () => {
    if (userToDelete) {
      try {
        await deleteUser(userToDelete.idUsuario);
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
        toast.success(`Usuário ${userToDelete.nome} deletado com sucesso!`);
        await fetchAllUsers();
      } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        toast.error(error.message || 'Falha ao deletar usuário. Por favor, tente novamente.');
        setIsDeleteModalOpen(false);
      }
    }
  };

  const handleChangePermission = (userItem) => {
    setUserToChangePermission(userItem);
    setNewPermission(userItem.role === 'ADMIN' ? 'USER' : 'ADMIN');
    setIsPermissionModalOpen(true);
  };

  const confirmChangePermission = async () => {
    if (userToChangePermission && newPermission) {
      try {
        await alterarPermissaoUsuario(userToChangePermission.idUsuario, newPermission);
        toast.success(`Permissão de ${userToChangePermission.nome} alterada para ${newPermission}`);
        setIsPermissionModalOpen(false);
        await fetchAllUsers();
      } catch (error) {
        console.error('Erro ao alterar permissão do usuário:', error);
        toast.error('Falha ao alterar permissão do usuário. Por favor, tente novamente.');
      }
    }
  };

  const handleActivateUser = (userItem) => {
    setUserToActivate(userItem);
    setIsActivationModalOpen(true);
  };

  const confirmActivateUser = async () => {
    if (userToActivate) {
      try {
        await activateUserAccount(userToActivate.email);
        toast.success(`Conta de ${userToActivate.nome} ativada com sucesso!`);
        setIsActivationModalOpen(false);
        setUserToActivate(null);
        await fetchAllUsers();
      } catch (error) {
        console.error('Erro ao ativar conta do usuário:', error);
        toast.error('Falha ao ativar conta do usuário. Por favor, tente novamente.');
      }
    }
  };

  const handleChangePassword = () => {
    setIsPasswordModalOpen(true);
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
      await fetchAllUsers();
    } catch (error) {
      toast.error('Erro ao atualizar foto do perfil');
    }
  };

  const handlePasswordChange = async (userId, currentPassword, newPassword) => {
    try {
      await updatePassword(userId, currentPassword, newPassword);
      toast.success('Senha atualizada com sucesso!');
      setIsPasswordModalOpen(false);
      setUserToChangePermission(null);
    } catch (error) {
      console.error('Erro ao atualizar senha:', error);
      toast.error('Erro ao atualizar senha: ' + error.message);
    }
  };

  const handleDeleteTopic = (topic) => {
    setTopicToDelete(topic);
    setIsDeleteTopicModalOpen(true);
  };

  const confirmDeleteTopic = async () => {
    if (topicToDelete) {
      try {
        await deleteTopic(topicToDelete.idTopico);
        setIsDeleteTopicModalOpen(false);
        setTopicToDelete(null);
        toast.success('Tópico deletado com sucesso!');
        await fetchTopicos();
      } catch (error) {
        console.error('Erro ao deletar tópico:', error);
        toast.error('Falha ao deletar tópico. Por favor, tente novamente.');
      }
    }
  };

  const handleMoreOptionsClick = (e, id, type) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleEditTopic = (topic) => {
    setTopicToEdit(topic);
    setIsNewTopicModalOpen(true);
  };

  const handleCloseNewTopicModal = () => {
    setIsNewTopicModalOpen(false);
    setTopicToEdit(null);
  };

  const toggleUserExpansion = (userId) => {
    setExpandedUsers(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const handleDeleteCategory = (category) => {
    setCategoryToDelete(category);
    setIsDeleteCategoryModalOpen(true);
  };

  const confirmDeleteCategory = async () => {
    if (categoryToDelete) {
      try {
        await deletarCategoria(categoryToDelete.idCategoria);
        setIsDeleteCategoryModalOpen(false);
        setCategoryToDelete(null);
        toast.success('Categoria deletada com sucesso!');
        await fetchCategories();
      } catch (error) {
        console.error('Erro ao deletar categoria:', error);
        toast.error('Falha ao deletar categoria. Por favor, tente novamente.');
      }
    }
  };

  const handleEditCategory = (category) => {
    setCategoryToEdit(category);
    setIsEditCategoryModalOpen(true);
  };


  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Usuário não encontrado.</div>;
  }

  const defaultImage = "https://via.placeholder.com/150";

  return (
    <div className="min-h-screen bg-gray-100">
      <SimplifiedHeader />
      <header className="bg-white shadow relative">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center">
          <img
            src={user.foto || defaultImage}
            alt={user.nome}
            className="w-24 h-24 rounded-full object-cover mb-4 sm:mb-0 sm:mr-6"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{user.nome}</h1>
            <p className="mt-1 text-sm text-gray-500">
              Membro desde {formatDate(user.criadoEm)}
            </p>
          </div>
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
                    onClick={() => {
                      setIsPasswordModalOpen(true);
                      setUserToChangePermission(user);
                    }}
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
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Informações do Usuário</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="mt-1">{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Função</p>
                <p className="mt-1">{user.role}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Categorias Criadas</p>
                <p className="mt-1">{userCategories.length}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Tópicos Criados</p>
                <p className="mt-1">{userTopics.length}</p>
              </div>
            </div>
          </div>
        </div>

        {user && user.role === 'ADMIN' && (
          <div className="mt-8">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
              <div>
                <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
                  <div className="mb-4 sm:mb-0 flex flex-wrap justify-center sm:justify-start">
                    <button
                      className={`mr-2 mb-2 sm:mb-0 px-4 py-2 ${activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                      onClick={() => setActiveTab('users')}
                    >
                      Usuários
                    </button>
                    <button
                      className={`mr-2 mb-2 sm:mb-0 px-4 py-2 ${activeTab === 'topics' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                      onClick={() => setActiveTab('topics')}
                    >
                      Tópicos
                    </button>
                    <button
                      className={`px-4 py-2 ${activeTab === 'categories' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                      onClick={() => setActiveTab('categories')}
                    >
                      Categorias
                    </button>
                  </div>
                  <div className="relative w-full sm:w-auto">
                    <input
                      type="text"
                      placeholder="Pesquisar..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>
                <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
                  {activeTab === 'users' && (
                    <div>
                      <h2 className="text-xl font-semibold mb-4 px-4 pt-4">Lista de Usuários</h2>
                      <div className="hidden sm:block">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Função</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data de Criação</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {filteredUsers.length > 0 ? (
                              filteredUsers.map((userItem) => (
                                <tr key={userItem.idUsuario}>
                                  <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => window.location.href = `/user/${userItem.idUsuario}`}>
                                    <span className="text-blue-600 hover:text-blue-800">
                                      {userItem.nome}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => window.location.href = `/user/${userItem.idUsuario}`}>
                                    <span className="text-blue-600 hover:text-blue-800">
                                      {userItem.email}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => window.location.href = `/user/${userItem.idUsuario}`}>
                                    <span className="text-blue-600 hover:text-blue-800">
                                      {userItem.role}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => window.location.href = `/user/${userItem.idUsuario}`}>
                                    <span className="text-blue-600 hover:text-blue-800">
                                      {formatDate(userItem.criadoEm)}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div 
                                      className="flex items-center space-x-2 cursor-pointer"
                                      onClick={(e) => handleMoreOptionsClick(e, userItem.idUsuario, 'user')}
                                    >
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <button
                                              onClick={() => handleDeleteUser(userItem)}
                                              className="text-red-600 hover:text-red-900"
                                            >
                                              <UserX className="w-5 h-5" />
                                            </button>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p>Deletar usuário</p>
                                          </TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <button
                                              onClick={() => {
                                                setIsPasswordModalOpen(true);
                                                setUserToChangePermission(userItem);
                                              }}
                                              className="text-blue-600 hover:text-blue-900"
                                            >
                                              <Edit className="w-5 h-5" />
                                            </button>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p>Editar senha</p>
                                          </TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <button
                                              onClick={() => handleChangePermission(userItem)}
                                              className="text-green-600 hover:text-green-900"
                                            >
                                              <UserCog className="w-5 h-5" />
                                            </button>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p>Alterar permissão</p>
                                          </TooltipContent>
                                        </Tooltip>
                                        {!userItem.ativo && (
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <button
                                                onClick={() => handleActivateUser(userItem)}
                                                className="text-yellow-600 hover:text-yellow-900"
                                              >
                                                <UserCog className="w-5 h-5" />
                                              </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              <p>Ativar conta</p>
                                            </TooltipContent>
                                          </Tooltip>
                                        )}
                                      </TooltipProvider>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="5">
                                  <NoResultsMessage message="Nenhum usuário encontrado." />
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                      <div className="sm:hidden">
                        {filteredUsers.map((userItem) => (
                          <div key={userItem.idUsuario} className="bg-white shadow overflow-hidden sm:rounded-lg mb-4">
                            <div className="px-4 py-5 sm:px-6">
                              <h3 className="text-lg leading-6 font-medium text-gray-900">{userItem.nome}</h3>
                              <p className="mt-1 max-w-2xl text-sm text-gray-500">{userItem.email}</p>
                            </div>
                            <div className="border-t border-gray-200">
                              <dl>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                  <dt className="text-sm font-medium text-gray-500">Função</dt>
                                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userItem.role}</dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                  <dt className="text-sm font-medium text-gray-500">Data de Criação</dt>
                                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {formatDate(userItem.criadoEm)}
                                  </dd>
                                </div>
                              </dl>
                            </div>
                            <div className="border-t border-gray-200 px-4 py-4">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-500">Ações</span>
                                <button 
                                  onClick={() => toggleUserExpansion(userItem.idUsuario)}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  <ChevronDown className={`w-5 h-5 transform transition-transform ${expandedUsers[userItem.idUsuario] ? 'rotate-180' : ''}`} />
                                </button>
                              </div>
                              {expandedUsers[userItem.idUsuario] && (
                                <div className="mt-2 space-y-2">
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <button
                                          onClick={() => handleDeleteUser(userItem)}
                                          className="w-full text-left px-2 py-1 text-sm text-red-600 hover:bg-red-100 rounded"
                                        >
                                          <Trash2 className="w-4 h-4 inline mr-2" />
                                          Deletar Usuário
                                        </button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Deletar usuário</p>
                                      </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <button
                                          onClick={() => handleDeleteUser(userItem)}
                                          className="w-full text-left px-2 py-1 text-sm text-red-600 hover:bg-red-100 rounded"
                                        >
                                          <UserX className="w-4 h-4 inline mr-2" />
                                          Deletar Usuário
                                        </button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Deletar usuário</p>
                                      </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <button
                                          onClick={() => {
                                            setIsPasswordModalOpen(true);
                                            setUserToChangePermission(userItem);
                                          }}
                                          className="w-full text-left px-2 py-1 text-sm text-blue-600 hover:bg-blue-100 rounded"
                                        >
                                          <Edit className="w-4 h-4 inline mr-2" />
                                          Alterar Senha
                                        </button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Editar senha</p>
                                      </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <button
                                          onClick={() => handleChangePermission(userItem)}
                                          className="w-full text-left px-2 py-1 text-sm text-green-600 hover:bg-green-100 rounded"
                                        >
                                          <UserCog className="w-4 h-4 inline mr-2" />
                                          Alterar Permissão
                                        </button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Alterar permissão</p>
                                      </TooltipContent>
                                    </Tooltip>
                                    {!userItem.ativo && (
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <button
                                            onClick={() => handleActivateUser(userItem)}
                                            className="w-full text-left px-2 py-1 text-sm text-yellow-600 hover:bg-yellow-100 rounded"
                                          >
                                            <UserCog className="w-4 h-4 inline mr-2" />
                                            Ativar Usuário
                                          </button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Ativar conta</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    )}
                                  </TooltipProvider>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {activeTab === 'topics' && (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Lista de Tópicos</h2>
                      <div className="space-y-4">
                        {filteredTopics.length > 0 ? (
                          filteredTopics.map((topic) => (
                            <div key={topic.idTopico} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200 relative">
                              <Link to={`/topic/${topic.idTopico}`} className="block">
                                <h3 className="text-lg font-semibold pr-8">{topic.titulo}</h3>
                                <p className="text-sm text-gray-600">{topic.descricao}</p>
                                <p className="text-xs text-gray-500 mt-2">
                                  Criado por: {topic.criadoPor.nome} em {formatDate(topic.criadoEm)}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Categoria: {topic.categoria.titulo}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Respostas: {topic.respostas ? topic.respostas.length : 0}
                                </p>
                                {topic.anexos && topic.anexos.length > 0 && (
                                  <div className="mt-2">
                                    <p className="text-xs font-semibold flex items-center">
                                      <Paperclip className="w-3 h-3 mr-1" />
                                      Anexos: {topic.anexos.length}
                                    </p>
                                  </div>
                                )}
                              </Link>
                              <div className="absolute top-4 right-4">
                                <button
                                  onClick={(e) => handleMoreOptionsClick(e, topic.idTopico, 'topic')}
                                  className="text-gray-500 hover:text-gray-700"
                                >
                                  <MoreVertical size={18} />
                                </button>
                                {openMenuId === topic.idTopico && (
                                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleEditTopic(topic);
                                      }}
                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    >
                                      <Edit size={14} className="inline mr-2" />
                                      Editar
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleDeleteTopic(topic);
                                      }}
                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    >
                                      <Trash2 size={14} className="inline mr-2" />
                                      Excluir
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <NoResultsMessage message="Nenhum tópico encontrado." />
                        )}
                      </div>
                    </div>
                  )}
                  {activeTab === 'categories' && (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Lista de Categorias</h2>
                      <div className="space-y-4">
                        {filteredCategories.length > 0 ? (
                          filteredCategories.map((category) => (
                            <div key={category.idCategoria} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200 relative">
                              <h3 className="text-lg font-semibold">{category.titulo}</h3>
                              <p className="text-sm text-gray-600">{category.subTitulo}</p>
                              <p className="text-xs text-gray-500 mt-2">
                                Criado por: {category.criadoPor.nome}
                              </p>
                              <p className="text-xs text-gray-500">
                                Posts: {category.postCount}
                              </p>
                              <div className="absolute top-4 right-4">
                                <button
                                  onClick={(e) => handleMoreOptionsClick(e, category.idCategoria, 'category')}
                                  className="text-gray-500 hover:text-gray-700"
                                ><MoreVertical size={18} />
                                </button>
                                {openMenuId === category.idCategoria && (
                                  <div
                                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleEditCategory(category);
                                      }}
                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    >
                                      <Edit size={14} className="inline mr-2" />
                                      Editar
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleDeleteCategory(category);
                                      }}
                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    >
                                      <Trash2 size={14} className="inline mr-2" />
                                      Excluir
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <NoResultsMessage message="Nenhuma categoria encontrada." />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteUser}
        title="Confirmar Deleção"
        message={`Tem certeza que deseja deletar o usuário ${userToDelete?.nome}?`}
      />
      <Modal
        isOpen={isPermissionModalOpen}
        onClose={() => setIsPermissionModalOpen(false)}
        onConfirm={confirmChangePermission}
        title="Confirmar Alteração de Permissão"
        message={
          <div>
            <p>Tem certeza que deseja alterar a permissão de {userToChangePermission?.nome} para {newPermission}?</p>
            <p className="textsm text-gray-500mt-2">
              {newPermission=== 'ADMIN'
                ? 'Isso concederá acesso administrativo completo ao usuário.'
                : 'Isso removerá o acesso administrativo do usuário.'}
            </p>
          </div>
        }
      />
      <Modal
        isOpen={isActivationModalOpen}
        onClose={() => setIsActivationModalOpen(false)}
        onConfirm={confirmActivateUser}
        title="Confirmar Ativação de Conta"
        message={`Tem certeza que deseja ativar a conta de ${userToActivate?.nome}?`}
      />
      <ProfilePhotoModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        onUpload={handlePhotoUpload}
      />
      <PasswordChangeModal
        isOpen={isPasswordModalOpen}
        onClose={() => {
          setIsPasswordModalOpen(false);
          setUserToChangePermission(null);
        }}
        onSubmit={handlePasswordChange}
        userName={userToChangePermission?.nome || ''}
        userId={userToChangePermission?.idUsuario || user.idUsuario}
      />
      <Modal
        isOpen={isDeleteTopicModalOpen}
        onClose={() => setIsDeleteTopicModalOpen(false)}
        onConfirm={confirmDeleteTopic}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir o tópico "${topicToDelete?.titulo}"?`}
      />
      <NewTopicModal
        isOpen={isNewTopicModalOpen}
        onClose={handleCloseNewTopicModal}
        topicToEdit={topicToEdit}
      />
      <EditCategoryModal
        isOpen={isEditCategoryModalOpen}
        onClose={() => setIsEditCategoryModalOpen(false)}
        categoryToEdit={categoryToEdit}
      />
      <Modal
        isOpen={isDeleteCategoryModalOpen}
        onClose={() => setIsDeleteCategoryModalOpen(false)}
        onConfirm={confirmDeleteCategory}
        title="Confirmar Exclusão de Categoria"
        message={`Tem certeza que deseja excluir a categoria "${categoryToDelete?.titulo}"?`}
      />
    </div>
  );
};

export default UserInfoScreen;

