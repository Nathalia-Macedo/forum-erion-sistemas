// dados.jsx
import React, { createContext, useState, useEffect } from 'react';

export const ForumContext = createContext();

export const ForumProvider = ({ children }) => {
  const [categories, setCategories] = useState([{
    idCategoria: "ddc88325-fc27-4aa9-b2d5-e828c8184506",
    titulo: "Agropecuaria",
    subTitulo: "Desenvolvimento de Software",
    descricao: "Categoria voltada para cursos e artigos relacionados a desenvolvimento de software.",
    criadoPor: {
      idUsuario: "default",
      nome: "Sistema",
      email: "sistema@exemplo.com"
    }
  }]);
  const [user, setUser] = useState(null);
  const [topicos, setTopicos] = useState([]);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch('http://josea4745.c44.integrator.host/api/v1/usuario/usuarioLogado', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Falha ao buscar dados do usuário');
      }

      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      localStorage.removeItem('authToken');
      setUser(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchUserData(token);
    }
  }, []);

  const loginUser = async (email, senha) => {
    const userCredentials = { email, senha };
  
    try {
      const response = await fetch('http://josea4745.c44.integrator.host/api/v1/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentials),
      });
  
      const data = await response.json();
      if (!data) {
        throw new Error('Falha na autenticação');
      }
  
      localStorage.setItem('authToken', data.token);
      const userData = await fetchUserData(data.token); // Retorna os dados do usuário
      return userData;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setUser(null);
      throw error; // Repassa o erro
    }
  };
  

  const logout = () => {
    localStorage.removeItem('authToken');
    console.log("logout chamado")
    setUser(null);
  };

  const cadastrarUsuario = async (nome, cpf, email, senha) => {
    const userData = { nome, cpf, email, senha };

    try {
      const response = await fetch('http://josea4745.c44.integrator.host/api/v1/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Falha no cadastro');
      }

      const data = await response.json();
      console.log('Usuário cadastrado com sucesso:', data);
      return data;
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      throw error;
    }
  };

  const criarCategoria = async (titulo, subTitulo, descricao) => {
    const token = localStorage.getItem('authToken');
    if (!token || !user) {
      console.error('Token não encontrado ou usuário não autenticado.');
      return;
    }

    const categoriaData = {
      titulo,
      subTitulo,
      descricao,
      criadoPor: {
        idUsuario: user.idUsuario
      }
    };

    try {
      const response = await fetch('http://josea4745.c44.integrator.host/api/v1/categoria', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(categoriaData),
      });
      
      if (!response.ok) {
        throw new Error('Falha ao criar categoria');
      }

      const data = await response.json();
      console.log('Categoria criada com sucesso:', data);
      
      setCategories(prevCategories => [...prevCategories, data]);
      
      return data;
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      throw error;
    }
  };

  const fetchTopicos = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Token não encontrado. Usuário não está autenticado.');
      return;
    }
    
    try {
      const response = await fetch('http://josea4745.c44.integrator.host/api/v1/topico', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Falha ao buscar tópicos');
      }

      const data = await response.json();
      
      // Ensure all topics have respostas as arrays
      const topicosWithRespostas = data.map(topico => ({
        ...topico,
        respostas: topico.respostas || []
      }));
      
      setTopicos(topicosWithRespostas);
      console.log('Tópicos obtidos com sucesso:', topicosWithRespostas);
      return topicosWithRespostas;
    } catch (error) {
      console.error('Erro ao buscar tópicos:', error);
      throw error;
    }
  };

  const criarTopico = async (titulo, idCategoria, descricao) => {
    const token = localStorage.getItem('authToken');
    if (!token || !user) {
      console.error('Token não encontrado ou usuário não autenticado.');
      return;
    }

    const topicoData = {
      topico: titulo,
      descricao,
      categoria: {
        idCategoria
      },
      criadoPor: {
        idUsuario: user.idUsuario
      },
      respostas: [] // Initialize with empty array
    };

    try {
      const response = await fetch('http://josea4745.c44.integrator.host/api/v1/topico', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(topicoData),
      });

      if (!response.ok) {
        throw new Error('Falha ao criar tópico');
      }

      const data = await response.json();
      console.log('Tópico criado com sucesso:', data);
      
      // Ensure respostas is an array before adding to state
      const topicoWithRespostas = {
        ...data,
        respostas: data.respostas || []
      };
      
      setTopicos(prevTopicos => [...prevTopicos, topicoWithRespostas]);
      
      return topicoWithRespostas;
    } catch (error) {
      console.error('Erro ao criar tópico:', error);
      throw error;
    }
  };

  return (
    <ForumContext.Provider value={{ 
      categories, 
      setCategories, 
      cadastrarUsuario, 
      loginUser, 
      user, 
      criarCategoria,
      topicos,
      fetchTopicos,
      criarTopico,
      logout
    }}>
      {children}
    </ForumContext.Provider>
  );
};

export default ForumProvider;