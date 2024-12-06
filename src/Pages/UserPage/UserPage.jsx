// // import React, { useContext, useEffect, useMemo, useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { ForumContext } from '../../Context/Dados';
// // import TopicCard from '../../Components/TopicCard/TopicCard';
// // import Modal from '../../Components/Modal/Modal';
// // import { Trash2, Edit, Paperclip, UserCog } from 'lucide-react';
// // import { toast } from 'react-toastify';
// // import SimplifiedHeader from '../../Components/SimplifiedHeader/SimplifiedHeader';
// // const UserInfoScreen = () => {
// //   const { user, categories, topicos, fetchTopicos, allUsers, fetchAllUsers, deleteUser, alterarPermissaoUsuario } = useContext(ForumContext);
// //   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
// //   const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
// //   const [userToDelete, setUserToDelete] = useState(null);
// //   const [userToChangePermission, setUserToChangePermission] = useState(null);
// //   const [newPermission, setNewPermission] = useState('');
// //   const [activeTab, setActiveTab] = useState('users');

// //   useEffect(() => {
// //     fetchTopicos();
// //     if (user && user.role === 'ADMIN') {
// //       fetchAllUsers();
// //     }
// //   }, [fetchTopicos, fetchAllUsers, user]);

// //   const userCategories = useMemo(() => {
// //     if (!user || !categories) return [];
// //     return categories.filter(category => category.criadoPor.idUsuario === user.idUsuario);
// //   }, [user, categories]);

// //   const userTopics = useMemo(() => {
// //     if (!user || !topicos) return [];
// //     return topicos.filter(topic => topic.criadoPor.idUsuario === user.idUsuario);
// //   }, [user, topicos]);

// //   const handleDeleteUser = (userItem) => {
// //     setUserToDelete(userItem);
// //     setIsDeleteModalOpen(true);
// //   };

// //   const confirmDeleteUser = async () => {
// //     if (userToDelete) {
// //       try {
// //         await deleteUser(userToDelete.idUsuario);
// //         setIsDeleteModalOpen(false);
// //         setUserToDelete(null);
// //         toast.success(`Usuário ${userToDelete.nome} deletado com sucesso!`);
// //       } catch (error) {
// //         console.error('Erro ao deletar usuário:', error);
// //         toast.error('Falha ao deletar usuário. Por favor, tente novamente.');
// //       }
// //     }
// //   };

// //   const handleEditPassword = (idUsuario) => {
// //     // Implementação futura
// //     console.log('Editar senha do usuário:', idUsuario);
// //   };

// //   const handleChangePermission = (userItem) => {
// //     setUserToChangePermission(userItem);
// //     setNewPermission(userItem.role === 'ADMIN' ? 'USER' : 'ADMIN');
// //     setIsPermissionModalOpen(true);
// //   };

// //   const confirmChangePermission = async () => {
// //     if (userToChangePermission && newPermission) {
// //       try {
// //         await alterarPermissaoUsuario(userToChangePermission.idUsuario, newPermission);
// //         toast.success(`Permissão de ${userToChangePermission.nome} alterada para ${newPermission}`);
// //         setIsPermissionModalOpen(false);
// //         fetchAllUsers(); // Atualiza a lista de usuários
// //       } catch (error) {
// //         console.error('Erro ao alterar permissão do usuário:', error);
// //         toast.error('Falha ao alterar permissão do usuário. Por favor, tente novamente.');
// //       }
// //     }
// //   };

// //   if (!user) {
// //     return <div className="flex justify-center items-center h-screen">Carregando informações do usuário...</div>;
// //   }

// //   const defaultImage = "https://via.placeholder.com/150";

// //   return (
// //     <div className="min-h-screen bg-gray-100">
// //         <SimplifiedHeader/>
// //       <header className="bg-white shadow">
// //         <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center">
// //           <img
// //             src={user.foto || defaultImage}
// //             alt={user.nome}
// //             className="w-24 h-24 rounded-full object-cover mr-6"
// //           />
// //           <div>
// //             <h1 className="text-3xl font-bold text-gray-900">{user.nome}</h1>
// //             <p className="mt-1 text-sm text-gray-500">
// //               Membro desde {new Date(user.criadoEm).toLocaleDateString('pt-BR')}
// //             </p>
// //           </div>
// //         </div>
// //       </header>

// //       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
// //         <div className="px-4 py-6 sm:px-0">
// //           <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
// //             <h2 className="text-xl font-semibold mb-4">Informações do Usuário</h2>
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               <div>
// //                 <p className="text-sm font-medium text-gray-500">Email</p>
// //                 <p className="mt-1">{user.email}</p>
// //               </div>
// //               <div>
// //                 <p className="text-sm font-medium text-gray-500">Função</p>
// //                 <p className="mt-1">{user.role}</p>
// //               </div>
// //               <div>
// //                 <p className="text-sm font-medium text-gray-500">Categorias Criadas</p>
// //                 <p className="mt-1">{userCategories.length}</p>
// //               </div>
// //               <div>
// //                 <p className="text-sm font-medium text-gray-500">Tópicos Criados</p>
// //                 <p className="mt-1">{userTopics.length}</p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
// //           <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
// //             <h2 className="text-xl font-semibold mb-4">Categorias Criadas</h2>
// //             {userCategories.length > 0 ? (
// //               <ul className="space-y-2">
// //                 {userCategories.map(category => (
// //                   <li key={category.idCategoria} className="bg-white p-3 rounded shadow">
// //                     <h3 className="font-medium">{category.titulo}</h3>
// //                     <p className="text-sm text-gray-600">{category.subTitulo}</p>
// //                   </li>
// //                 ))}
// //               </ul>
// //             ) : (
// //               <p>Este usuário ainda não criou nenhuma categoria.</p>
// //             )}
// //           </div>

// //           <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
// //             <h2 className="text-xl font-semibold mb-4">Tópicos Criados</h2>
// //             {userTopics.length > 0 ? (
// //               <div className="space-y-4">
// //                 {userTopics.map(topic => (
// //                   <Link key={topic.idTopico} to={`/topic/${topic.idTopico}`} className="block">
// //                     <TopicCard topic={topic} />
// //                   </Link>
// //                 ))}
// //               </div>
// //             ) : (
// //               <p>Este usuário ainda não criou nenhum tópico.</p>
// //             )}
// //           </div>
// //         </div>

// //         {user.role === 'ADMIN' && (
// //           <div className="mt-8">
// //             <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
// //               <div>
// //                 <div className="mb-4">
// //                   <button
// //                     className={`mr-4 px-4 py-2 ${activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
// //                     onClick={() => setActiveTab('users')}
// //                   >
// //                     Usuários
// //                   </button>
// //                   <button
// //                     className={`px-4 py-2 ${activeTab === 'topics' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
// //                     onClick={() => setActiveTab('topics')}
// //                   >
// //                     Tópicos
// //                   </button>
// //                 </div>
// //                 {activeTab === 'users' && (
// //                   <div>
// //                     <h2 className="text-xl font-semibold mb-4">Lista de Usuários</h2>
// //                     <div className="overflow-x-auto">
// //                       <table className="min-w-full">
// //                         <thead>
// //                           <tr className="bg-gray-100">
// //                             <th className="px-4 py-2 text-left">Nome</th>
// //                             <th className="px-4 py-2 text-left">Email</th>
// //                             <th className="px-4 py-2 text-left">Função</th>
// //                             <th className="px-4 py-2 text-left">Data de Criação</th>
// //                             <th className="px-4 py-2 text-left">Ações</th>
// //                           </tr>
// //                         </thead>
// //                         <tbody>
// //                           {allUsers.map((userItem) => (
// //                             <tr key={userItem.idUsuario} className="border-b">
// //                               <td className="px-4 py-2">{userItem.nome}</td>
// //                               <td className="px-4 py-2">{userItem.email}</td>
// //                               <td className="px-4 py-2">{userItem.role}</td>
// //                               <td className="px-4 py-2">{new Date(userItem.criadoEm).toLocaleDateString('pt-BR')}</td>
// //                               <td className="px-4 py-2 flex space-x-2">
// //                                 <button
// //                                   onClick={() => handleDeleteUser(userItem)}
// //                                   className="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 flex items-center"
// //                                 >
// //                                   <Trash2 className="w-4 h-4 mr-1.5" />
// //                                   Deletar
// //                                 </button>
// //                                 <button
// //                                   onClick={() => handleEditPassword(userItem.idUsuario)}
// //                                   className="bg-blue-500 text-white px-3 py-1.5 rounded hover:bg-blue-600 flex items-center"
// //                                 >
// //                                   <Edit className="w-4 h-4 mr-1.5" />
// //                                   Editar Senha
// //                                 </button>
// //                                 <button
// //                                   onClick={() => handleChangePermission(userItem)}
// //                                   className="bg-green-500 text-white px-3 py-1.5 rounded hover:bg-green-600 flex items-center"
// //                                 >
// //                                   <UserCog className="w-4 h-4 mr-1.5" />
// //                                   Alterar Permissão
// //                                 </button>
// //                               </td>
// //                             </tr>
// //                           ))}
// //                         </tbody>
// //                       </table>
// //                     </div>
// //                   </div>
// //                 )}
// //                 {activeTab === 'topics' && (
// //                   <div>
// //                     <h2 className="text-xl font-semibold mb-4">Lista de Tópicos</h2>
// //                     <div className="space-y-4">
// //                       {topicos.map((topic) => (
// //                         <Link key={topic.idTopico} to={`/topic/${topic.idTopico}`} className="block">
// //                           <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200">
// //                             <h3 className="text-lg font-semibold">{topic.titulo}</h3>
// //                             <p className="text-sm text-gray-600">{topic.descricao}</p>
// //                             <p className="text-xs text-gray-500 mt-2">
// //                               Criado por: {topic.criadoPor.nome} em {new Date(topic.criadoEm).toLocaleDateString('pt-BR')}
// //                             </p>
// //                             <p className="text-xs text-gray-500">
// //                               Categoria: {topic.categoria.titulo}
// //                             </p>
// //                             <p className="text-xs text-gray-500">
// //                               Respostas: {topic.respostas.length}
// //                             </p>
// //                             {topic.anexos && topic.anexos.length > 0 && (
// //                               <div className="mt-2">
// //                                 <p className="text-xs font-semibold flex items-center">
// //                                   <Paperclip className="w-3 h-3 mr-1" />
// //                                   Anexos:
// //                                 </p>
// //                                 <ul className="list-disc list-inside">
// //                                   {topic.anexos.map((anexo) => (
// //                                     <li key={anexo.idAnexo} className="text-xs">
// //                                       <a href={anexo.anexo} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
// //                                         {anexo.nomeArquivo}
// //                                       </a>
// //                                     </li>
// //                                   ))}
// //                                 </ul>
// //                               </div>
// //                             )}
// //                           </div>
// //                         </Link>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </main>
// //       <Modal
// //         isOpen={isDeleteModalOpen}
// //         onClose={() => setIsDeleteModalOpen(false)}
// //         onConfirm={confirmDeleteUser}
// //         title="Confirmar Deleção"
// //         message={`Tem certeza que deseja deletar o usuário ${userToDelete?.nome}?`}
// //       />
// //       <Modal
// //         isOpen={isPermissionModalOpen}
// //         onClose={() => setIsPermissionModalOpen(false)}
// //         onConfirm={confirmChangePermission}
// //         title="Confirmar Alteração de Permissão"
// //         message={
// //           <div>
// //             <p>Tem certeza que deseja alterar a permissão de {userToChangePermission?.nome} para {newPermission}?</p>
// //             <p className="text-sm text-gray-500 mt-2">
// //               {newPermission === 'ADMIN' 
// //                 ? 'Isso concederá acesso administrativo completo ao usuário.' 
// //                 : 'Isso removerá o acesso administrativo do usuário.'}
// //             </p>
// //           </div>
// //         }
// //       />
// //     </div>
// //   );
// // };

// // export default UserInfoScreen;

// import React, { useContext, useEffect, useMemo, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ForumContext } from '../../Context/Dados';
// import TopicCard from '../../Components/TopicCard/TopicCard';
// import Modal from '../../Components/Modal/Modal';
// import { Trash2, Edit, Paperclip, UserCog } from 'lucide-react';
// import { toast } from 'react-toastify';
// import SimplifiedHeader from '../../Components/SimplifiedHeader/SimplifiedHeader';
// import Loading from '../../Components/Loading/Carregando';

// const UserInfoScreen = () => {
//   const { user, categories, topicos, fetchTopicos, allUsers, fetchAllUsers, deleteUser, alterarPermissaoUsuario } = useContext(ForumContext);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
//   const [userToDelete, setUserToDelete] = useState(null);
//   const [userToChangePermission, setUserToChangePermission] = useState(null);
//   const [newPermission, setNewPermission] = useState('');
//   const [activeTab, setActiveTab] = useState('users');
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadData = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         await fetchTopicos();
//         if (user && user.role === 'ADMIN') {
//           await fetchAllUsers();
//         }
//       } catch (error) {
//         console.error('Erro ao carregar dados:', error);
//         setError('Falha ao carregar dados. Por favor, tente novamente.');
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     loadData();
//   }, [fetchTopicos, fetchAllUsers, user]);

//   const userCategories = useMemo(() => {
//     if (!user || !categories) return [];
//     return categories.filter(category => category.criadoPor.idUsuario === user.idUsuario);
//   }, [user, categories]);

//   const userTopics = useMemo(() => {
//     if (!user || !topicos) return [];
//     return topicos.filter(topic => topic.criadoPor.idUsuario === user.idUsuario);
//   }, [user, topicos]);

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
//         await fetchAllUsers(); // Atualiza a lista de usuários após a deleção
//       } catch (error) {
//         console.error('Erro ao deletar usuário:', error);
//         toast.error('Falha ao deletar usuário. Por favor, tente novamente.');
//       }
//     }
//   };

//   const handleEditPassword = (idUsuario) => {
//     // Implementação futura
//     console.log('Editar senha do usuário:', idUsuario);
//     toast.info('Funcionalidade de edição de senha será implementada em breve.');
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
//         await fetchAllUsers(); // Atualiza a lista de usuários após a alteração de permissão
//       } catch (error) {
//         console.error('Erro ao alterar permissão do usuário:', error);
//         toast.error('Falha ao alterar permissão do usuário. Por favor, tente novamente.');
//       }
//     }
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
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center">
//           <img
//             src={user.foto || defaultImage}
//             alt={user.nome}
//             className="w-24 h-24 rounded-full object-cover mr-6"
//           />
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">{user.nome}</h1>
//             <p className="mt-1 text-sm text-gray-500">
//               Membro desde {new Date(user.criadoEm).toLocaleDateString('pt-BR')}
//             </p>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="px-4 py-6 sm:px-0">
//           <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
//             <h2 className="text-xl font-semibold mb-4">Informações do Usuário</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

//         <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
//             <h2 className="text-xl font-semibold mb-4">Categorias Criadas</h2>
//             {userCategories.length > 0 ? (
//               <ul className="space-y-2">
//                 {userCategories.map(category => (
//                   <li key={category.idCategoria} className="bg-white p-3 rounded shadow">
//                     <h3 className="font-medium">{category.titulo}</h3>
//                     <p className="text-sm text-gray-600">{category.subTitulo}</p>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>Este usuário ainda não criou nenhuma categoria.</p>
//             )}
//           </div>

//           <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
//             <h2 className="text-xl font-semibold mb-4">Tópicos Criados</h2>
//             {userTopics.length > 0 ? (
//               <div className="space-y-4">
//                 {userTopics.map(topic => (
//                   <Link key={topic.idTopico} to={`/topic/${topic.idTopico}`} className="block">
//                     <TopicCard topic={topic} />
//                   </Link>
//                 ))}
//               </div>
//             ) : (
//               <p>Este usuário ainda não criou nenhum tópico.</p>
//             )}
//           </div>
//         </div>

//         {user.role === 'ADMIN' && (
//           <div className="mt-8">
//             <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
//               <div>
//                 <div className="mb-4">
//                   <button
//                     className={`mr-4 px-4 py-2 ${activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//                     onClick={() => setActiveTab('users')}
//                   >
//                     Usuários
//                   </button>
//                   <button
//                     className={`px-4 py-2 ${activeTab === 'topics' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//                     onClick={() => setActiveTab('topics')}
//                   >
//                     Tópicos
//                   </button>
//                 </div>
//                 {activeTab === 'users' && (
//                   <div>
//                     <h2 className="text-xl font-semibold mb-4">Lista de Usuários</h2>
//                     <div className="overflow-x-auto">
//                       <table className="min-w-full">
//                         <thead>
//                           <tr className="bg-gray-100">
//                             <th className="px-4 py-2 text-left">Nome</th>
//                             <th className="px-4 py-2 text-left">Email</th>
//                             <th className="px-4 py-2 text-left">Função</th>
//                             <th className="px-4 py-2 text-left">Data de Criação</th>
//                             <th className="px-4 py-2 text-left">Ações</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {allUsers.map((userItem) => (
//                             <tr key={userItem.idUsuario} className="border-b">
//                               <td className="px-4 py-2">{userItem.nome}</td>
//                               <td className="px-4 py-2">{userItem.email}</td>
//                               <td className="px-4 py-2">{userItem.role}</td>
//                               <td className="px-4 py-2">{new Date(userItem.criadoEm).toLocaleDateString('pt-BR')}</td>
//                               <td className="px-4 py-2 flex space-x-2">
//                                 <button
//                                   onClick={() => handleDeleteUser(userItem)}
//                                   className="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 flex items-center"
//                                 >
//                                   <Trash2 className="w-4 h-4 mr-1.5" />
//                                   Deletar
//                                 </button>
//                                 <button
//                                   onClick={() => handleEditPassword(userItem.idUsuario)}
//                                   className="bg-blue-500 text-white px-3 py-1.5 rounded hover:bg-blue-600 flex items-center"
//                                 >
//                                   <Edit className="w-4 h-4 mr-1.5" />
//                                   Editar Senha
//                                 </button>
//                                 <button
//                                   onClick={() => handleChangePermission(userItem)}
//                                   className="bg-green-500 text-white px-3 py-1.5 rounded hover:bg-green-600 flex items-center"
//                                 >
//                                   <UserCog className="w-4 h-4 mr-1.5" />
//                                   Alterar Permissão
//                                 </button>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 )}
//                 {activeTab === 'topics' && (
//                   <div>
//                     <h2 className="text-xl font-semibold mb-4">Lista de Tópicos</h2>
//                     <div className="space-y-4">
//                       {topicos.map((topic) => (
//                         <Link key={topic.idTopico} to={`/topic/${topic.idTopico}`} className="block">
//                           <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200">
//                             <h3 className="text-lg font-semibold">{topic.titulo}</h3>
//                             <p className="text-sm text-gray-600">{topic.descricao}</p>
//                             <p className="text-xs text-gray-500 mt-2">
//                               Criado por: {topic.criadoPor.nome} em {new Date(topic.criadoEm).toLocaleDateString('pt-BR')}
//                             </p>
//                             <p className="text-xs text-gray-500">
//                               Categoria: {topic.categoria.titulo}
//                             </p>
//                             <p className="text-xs text-gray-500">
//                               Respostas: {topic.respostas.length}
//                             </p>
//                             {topic.anexos && topic.anexos.length > 0 && (
//                               <div className="mt-2">
//                                 <p className="text-xs font-semibold flex items-center">
//                                   <Paperclip className="w-3 h-3 mr-1" />
//                                   Anexos:
//                                 </p>
//                                 <ul className="list-disc list-inside">
//                                   {topic.anexos.map((anexo) => (
//                                     <li key={anexo.idAnexo} className="text-xs">
//                                       <a href={anexo.anexo} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
//                                         {anexo.nomeArquivo}
//                                       </a>
//                                     </li>
//                                   ))}
//                                 </ul>
//                               </div>
//                             )}
//                           </div>
//                         </Link>
//                       ))}
//                     </div>
//                   </div>
//                 )}
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
//             <p className="text-sm text-gray-500 mt-2">
//               {newPermission === 'ADMIN' 
//                 ? 'Isso concederá acesso administrativo completo ao usuário.' 
//                 : 'Isso removerá o acesso administrativo do usuário.'}
//             </p>
//           </div>
//         }
//       />
//     </div>
//   );
// };

// export default UserInfoScreen;

import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ForumContext } from '../../Context/Dados';
import TopicCard from '../../Components/TopicCard/TopicCard';
import Modal from '../../Components/Modal/Modal';
import { Trash2, Edit, Paperclip, UserCog } from 'lucide-react';
import { toast } from 'react-toastify';
import SimplifiedHeader from '../../Components/SimplifiedHeader/SimplifiedHeader';
import Loading from '../../Components/Loading/Carregando';

const UserInfoScreen = () => {
  const { user, categories, topicos, fetchTopicos, allUsers, fetchAllUsers, deleteUser, alterarPermissaoUsuario, activateUserAccount } = useContext(ForumContext);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToChangePermission, setUserToChangePermission] = useState(null);
  const [newPermission, setNewPermission] = useState('');
  const [activeTab, setActiveTab] = useState('users');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await fetchTopicos();
        if (user && user.role === 'ADMIN') {
          await fetchAllUsers();
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setError('Falha ao carregar dados. Por favor, tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [fetchTopicos, fetchAllUsers, user]);

  const userCategories = useMemo(() => {
    if (!user || !categories) return [];
    return categories.filter(category => category.criadoPor.idUsuario === user.idUsuario);
  }, [user, categories]);

  const userTopics = useMemo(() => {
    if (!user || !topicos) return [];
    return topicos.filter(topic => topic.criadoPor.idUsuario === user.idUsuario);
  }, [user, topicos]);

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
        await fetchAllUsers(); // Atualiza a lista de usuários após a deleção
      } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        toast.error('Falha ao deletar usuário. Por favor, tente novamente.');
      }
    }
  };

  const handleEditPassword = (idUsuario) => {
    // Implementação futura
    console.log('Editar senha do usuário:', idUsuario);
    toast.info('Funcionalidade de edição de senha será implementada em breve.');
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
        await fetchAllUsers(); // Atualiza a lista de usuários após a alteração de permissão
      } catch (error) {
        console.error('Erro ao alterar permissão do usuário:', error);
        toast.error('Falha ao alterar permissão do usuário. Por favor, tente novamente.');
      }
    }
  };

  const handleActivateUser = async (userItem) => {
    try {
      await activateUserAccount(userItem.email);
      toast.success(`Conta de ${userItem.nome} ativada com sucesso!`);
      await fetchAllUsers(); // Atualiza a lista de usuários após a ativação
    } catch (error) {
      console.error('Erro ao ativar conta do usuário:', error);
      toast.error('Falha ao ativar conta do usuário. Por favor, tente novamente.');
    }
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
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center">
          <img
            src={user.foto || defaultImage}
            alt={user.nome}
            className="w-24 h-24 rounded-full object-cover mr-6"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{user.nome}</h1>
            <p className="mt-1 text-sm text-gray-500">
              Membro desde {new Date(user.criadoEm).toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Informações do Usuário</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Categorias Criadas</h2>
            {userCategories.length > 0 ? (
              <ul className="space-y-2">
                {userCategories.map(category => (
                  <li key={category.idCategoria} className="bg-white p-3 rounded shadow">
                    <h3 className="font-medium">{category.titulo}</h3>
                    <p className="text-sm text-gray-600">{category.subTitulo}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Este usuário ainda não criou nenhuma categoria.</p>
            )}
          </div>

          <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Tópicos Criados</h2>
            {userTopics.length > 0 ? (
              <div className="space-y-4">
                {userTopics.map(topic => (
                  <Link key={topic.idTopico} to={`/topic/${topic.idTopico}`} className="block">
                    <TopicCard topic={topic} />
                  </Link>
                ))}
              </div>
            ) : (
              <p>Este usuário ainda não criou nenhum tópico.</p>
            )}
          </div>
        </div>

        {user.role === 'ADMIN' && (
          <div className="mt-8">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
              <div>
                <div className="mb-4">
                  <button
                    className={`mr-4 px-4 py-2 ${activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('users')}
                  >
                    Usuários
                  </button>
                  <button
                    className={`px-4 py-2 ${activeTab === 'topics' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('topics')}
                  >
                    Tópicos
                  </button>
                </div>
                {activeTab === 'users' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Lista de Usuários</h2>
                    <div className="overflow-x-auto">
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
                          {allUsers.map((userItem) => (
                            <tr key={userItem.idUsuario} className="border-b">
                              <td className="px-4 py-2">{userItem.nome}</td>
                              <td className="px-4 py-2">{userItem.email}</td>
                              <td className="px-4 py-2">{userItem.role}</td>
                              <td className="px-4 py-2">{new Date(userItem.criadoEm).toLocaleDateString('pt-BR')}</td>
                              <td className="px-4 py-2 flex flex-wrap gap-2">
                                <button
                                  onClick={() => handleDeleteUser(userItem)}
                                  className="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 flex items-center"
                                >
                                  <Trash2 className="w-4 h-4 mr-1.5" />
                                  Deletar
                                </button>
                                <button
                                  onClick={() => handleEditPassword(userItem.idUsuario)}
                                  className="bg-blue-500 text-white px-3 py-1.5 rounded hover:bg-blue-600 flex items-center"
                                >
                                  <Edit className="w-4 h-4 mr-1.5" />
                                  Editar Senha
                                </button>
                                <button
                                  onClick={() => handleChangePermission(userItem)}
                                  className="bg-green-500 text-white px-3 py-1.5 rounded hover:bg-green-600 flex items-center"
                                >
                                  <UserCog className="w-4 h-4 mr-1.5" />
                                  Alterar Permissão
                                </button>
                                {!userItem.ativo && (
                                  <button
                                    onClick={() => handleActivateUser(userItem)}
                                    className="bg-yellow-500 text-white px-3 py-1.5 rounded hover:bg-yellow-600 flex items-center"
                                  >
                                    <UserCog className="w-4 h-4 mr-1.5" />
                                    Ativar Conta
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {activeTab === 'topics' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Lista de Tópicos</h2>
                    <div className="space-y-4">
                      {topicos.map((topic) => (
                        <Link key={topic.idTopico} to={`/topic/${topic.idTopico}`} className="block">
                          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200">
                            <h3 className="text-lg font-semibold">{topic.titulo}</h3>
                            <p className="text-sm text-gray-600">{topic.descricao}</p>
                            <p className="text-xs text-gray-500 mt-2">
                              Criado por: {topic.criadoPor.nome} em {new Date(topic.criadoEm).toLocaleDateString('pt-BR')}
                            </p>
                            <p className="text-xs text-gray-500">
                              Categoria: {topic.categoria.titulo}
                            </p>
                            <p className="text-xs text-gray-500">
                              Respostas: {topic.respostas.length}
                            </p>
                            {topic.anexos && topic.anexos.length > 0 && (
                              <div className="mt-2">
                                <p className="text-xs font-semibold flex items-center">
                                  <Paperclip className="w-3 h-3 mr-1" />
                                  Anexos:
                                </p>
                                <ul className="list-disc list-inside">
                                  {topic.anexos.map((anexo) => (
                                    <li key={anexo.idAnexo} className="text-xs">
                                      <a href={anexo.anexo} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                        {anexo.nomeArquivo}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
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
            <p className="text-sm text-gray-500 mt-2">
              {newPermission === 'ADMIN'
                ? 'Isso concederá acesso administrativo completo ao usuário.'
                : 'Isso removerá o acesso administrativo do usuário.'}
            </p>
          </div>
        }
      />
    </div>
  );
};

export default UserInfoScreen;

