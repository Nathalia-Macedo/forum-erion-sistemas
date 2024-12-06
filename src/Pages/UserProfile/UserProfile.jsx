import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ForumContext } from '../../Context/Dados';
import Loading from '../../Components/Loading/Carregando';

const UserProfile = () => {
  const { idUsuario } = useParams();
  const { fetchUserProfile } = useContext(ForumContext);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      setIsLoading(true);
      try {
        const data = await fetchUserProfile(idUsuario);
        setProfileData(data);
      } catch (err) {
        setError('Falha ao carregar o perfil do usuário. Por favor, tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserProfile();
  }, [idUsuario, fetchUserProfile]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!profileData) {
    return <div>Usuário não encontrado</div>;
  }

  return (
    <div>
      <h1>{profileData.user.nome}</h1>
      <p>Email: {profileData.user.email}</p>
      <h2>Tópicos criados</h2>
      <ul>
        {profileData.topics.map(topic => (
          <li key={topic.idTopico}>{topic.titulo}</li>
        ))}
      </ul>
      <h2>Categorias criadas</h2>
      <ul>
        {profileData.categories.map(category => (
          <li key={category.idCategoria}>{category.titulo}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;

