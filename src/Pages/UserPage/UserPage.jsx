import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ForumContext } from '../../Context/Dados';
import TopicCard from '../../Components/TopicCard/TopicCard';
import Modal from '../../Components/Modal/Modal';
import { Trash2, Edit, Paperclip, UserCog, Settings } from 'lucide-react';
import { toast } from 'react-toastify';
import SimplifiedHeader from '../../Components/SimplifiedHeader/SimplifiedHeader';
import Loading from '../../Components/Loading/Carregando';
import ProfilePhotoModal from '../../Components/UpdatePhotoProfile/AtualizarFoto';
import PasswordChangeModal from '../../Components/PasswordChange/PasswordChange';
const UserInfoScreen = () => {
  const { user, categories, topicos, fetchTopicos, allUsers, fetchAllUsers, deleteUser, alterarPermissaoUsuario, activateUserAccount, updateProfilePhoto, updatePassword } = useContext(ForumContext);
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
        await fetchAllUsers();
      } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        toast.error('Falha ao deletar usuário. Por favor, tente novamente.');
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

        {user && user.role === 'ADMIN' && (
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
                    className={`mr-4 px-4 py-2 ${activeTab === 'topics' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
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
                              <td className="px-4 py-2">
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => handleDeleteUser(userItem)}
                                    className="inline-flex items-center px-2 py-1 text-xs rounded hover:bg-red-600 bg-red-500 text-white"
                                  >
                                    <Trash2 className="w-3 h-3 mr-1" />
                                    Deletar
                                  </button>
                                  <button
                                    onClick={() => {
                                      setIsPasswordModalOpen(true);
                                      setUserToChangePermission(userItem);
                                    }}
                                    className="inline-flex items-center px-2 py-1 text-xs rounded hover:bg-blue-600 bg-blue-500 text-white"
                                  >
                                    <Edit className="w-3 h-3 mr-1" />
                                    Alterar Senha
                                  </button>
                                  <button
                                    onClick={() => handleChangePermission(userItem)}
                                    className="inline-flex items-center px-2 py-1 text-xs rounded hover:bg-green-600 bg-green-500 text-white"
                                  >
                                    <UserCog className="w-3 h-3 mr-1" />
                                    Permissão
                                  </button>
                                  {!userItem.ativo && (
                                    <button
                                      onClick={() => handleActivateUser(userItem)}
                                      className="inline-flex items-center px-2 py-1 text-xs rounded hover:bg-yellow-600 bg-yellow-500 text-white"
                                    >
                                      <UserCog className="w-3 h-3 mr-1" />
                                      Ativar
                                    </button>
                                  )}
                                </div>
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
                {activeTab === 'categories' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Lista de Categorias</h2>
                    <div className="space-y-4">
                      {categories.map((category) => (
                        <div key={category.idCategoria} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200">
                          <h3 className="text-lg font-semibold">{category.titulo}</h3>
                          <p className="text-sm text-gray-600">{category.subTitulo}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            Criado por: {category.criadoPor.nome} em {new Date(category.criadoEm).toLocaleDateString('pt-BR')}
                          </p>
                          <p className="text-xs text-gray-500">
                            Tópicos: {category.topicos ? category.topicos.length : 0}
                          </p>
                        </div>
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
        userId={user.idUsuario}
      />
    </div>
  );
};

export default UserInfoScreen;

