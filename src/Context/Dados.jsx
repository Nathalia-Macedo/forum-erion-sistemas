import React, { createContext, useState } from 'react';

export const ForumContext = createContext();

export const ForumProvider = ({ children }) => {
  const [categories, setCategories] = useState([
    {
      title: "Programming",
      description: "Discuss programming languages and techniques",
      posts: 150,
      latestPost: {
        title: "Aprendendo o conceito de API",
        author: "Nathalia Macedo",
        timeAgo: "Há 7 horas"
      }
    },
    {
      title: "Design",
      description: "Share and critique design work",
      posts: 89,
      latestPost: {
        title: "Conhecendo o Figma",
        author: "Nathalia Macedo",
        timeAgo: "Há 7 horas"
      }
    },
    {
      title: "Off-topic",
      description: "General discussion and community chat",
      posts: 203,
      latestPost: {
        title: "Um freela de repente...",
        author: "Nathalia Macedo",
        timeAgo: "Há 7 horas"
      }
    }
  ]);
  const [user, setUser] = useState(null); // Estado para armazenar os dados do usuário

  // Função para fazer o login e definir o estado do usuário
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
      console.log(userCredentials)
      console.log(response)
      if (!response.ok) {
        throw new Error('Falha na autenticação');
      }

      const data = await response.json();
      localStorage.setItem('authToken', data.token); // Armazena o token no localStorage
      setUser({ token: data.token }); // Atualiza o estado com os dados do usuário
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  // Função para cadastrar um novo usuário
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
      return data; // Retorna os dados do usuário ou o token, se houver
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  return (
    <ForumContext.Provider value={{ categories, setCategories, cadastrarUsuario,loginUser }}>
      {children}
    </ForumContext.Provider>
  );
};
