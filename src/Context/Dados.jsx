

import React, { createContext, useState, useEffect } from 'react';

export const ForumContext = createContext();

export const ForumProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [topicos, setTopicos] = useState([]);
  const fetchCategories = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Token não encontrado. Usuário não está autenticado.');
      return;
    }
    
    try {
      const [categoriesResponse, topicsResponse] = await Promise.all([
        fetch('https://josea4745.c44.integrator.host/api/v1/categoria', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }),
        fetch('https://josea4745.c44.integrator.host/api/v1/topico', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      ]);

      if (!categoriesResponse.ok || !topicsResponse.ok) {
        throw new Error('Falha ao buscar categorias ou tópicos');
      }

      const categoriesData = await categoriesResponse.json();
      const topicsData = await topicsResponse.json();

      const categoriesWithPostCount = categoriesData.map(category => ({
        ...category,
        postCount: topicsData.filter(topic => topic.categoria.idCategoria === category.idCategoria).length
      }));

      setCategories(categoriesWithPostCount);
      console.log('Categorias obtidas com sucesso:', categoriesWithPostCount);
    } catch (error) {
      console.error('Erro ao buscar categorias e tópicos:', error);
    }
  };

  //função que verifica se o usuário está logado
  const fetchUserData = async (token) => {
    try {
      const response = await fetch('https://josea4745.c44.integrator.host/api/v1/usuario/usuarioLogado', {
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
      fetchCategories();
    }
  }, []);

  //função de login
  const loginUser = async (email, senha) => {
    const userCredentials = { email, senha };
  
    try {
      const response = await fetch('https://josea4745.c44.integrator.host/api/v1/auth', {
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
      console.log(data)
      localStorage.setItem('authToken', data.token);
      await fetchUserData(data.token);
      await fetchCategories();
      return data;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setUser(null);
      throw error;
    }
  };

  //função para sair do forum
  const logout = () => {
    localStorage.removeItem('authToken');
    console.log("logout chamado");
    setUser(null);
    setCategories([]);
  };
//função de cadastro
  const cadastrarUsuario = async (nome, cpf, email, senha) => {
    const userData = { nome, cpf, email, senha };

    try {
      const response = await fetch('https://josea4745.c44.integrator.host/api/v1/usuario', {
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

  //função para criar a categoria
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
      const response = await fetch('https://josea4745.c44.integrator.host/api/v1/categoria', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(categoriaData),
      });
      console.log(response)
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

  //função para procurar tópicos
  const fetchTopicos = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Token não encontrado. Usuário não está autenticado.');
      return;
    }
    
    try {
      const response = await fetch('https://josea4745.c44.integrator.host/api/v1/topico', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Falha ao buscar tópicos');
      }

      const data = await response.json();
      
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

  //função para criar tópico
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
      respostas: []
    };

    try {
      const response = await fetch('https://josea4745.c44.integrator.host/api/v1/topico', {
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
      logout,
      fetchCategories
    }}>
      {children}
    </ForumContext.Provider>
  );
};

export default ForumProvider;