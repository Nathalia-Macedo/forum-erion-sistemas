import React, { createContext, useState, useEffect, useCallback } from 'react';

export const ForumContext = createContext();

export const ForumProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [topicos, setTopicos] = useState([]);
  const [respostas, setRespostas] = useState({});
  const [currentTopic, setCurrentTopic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTopicoById = useCallback(async (idTopico) => {
    setIsLoading(true);
    setError(null);
    
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('Token não encontrado. Usuário não está autenticado.');
      setIsLoading(false);
      return null;
    }
    
    try {
      const response = await fetch(`https://josea4745.c44.integrator.host/api/v1/topico/${idTopico}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`Falha ao buscar tópico: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Tópico obtido:', data);
      setCurrentTopic(data);
      // Atualizar as respostas diretamente do tópico
      setRespostas(prev => ({ ...prev, [idTopico]: data.respostas || [] }));
      setIsLoading(false);
      return data;
    } catch (error) {
      console.error('Erro ao buscar tópico:', error);
      setError(error.message);
      setCurrentTopic(null);
      setIsLoading(false);
      throw error;
    }
  }, []);

 

  const fetchCategories = useCallback(async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Token não encontrado. Usuário não está autenticado.');
      return;
    }
    
    try {
      const [categoriesResponse, topicsResponse] = await Promise.all([
        fetch('https://josea4745.c44.integrator.host/api/v1/categoria', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('https://josea4745.c44.integrator.host/api/v1/topico', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);
  
      if (!categoriesResponse.ok || !topicsResponse.ok) {
        throw new Error('Falha ao buscar categorias ou tópicos');
      }
  
      const categoriesData = await categoriesResponse.json();
      const topicsData = await topicsResponse.json();
  
      const categoriesWithPostCount = categoriesData.map(category => {
        const postCount = topicsData.filter(topic => topic.categoria.idCategoria === category.idCategoria).length;
        return {
          ...category,
          postCount
        };
      });
  
      setCategories(categoriesWithPostCount);
      setTopicos(topicsData);
    } catch (error) {
      console.error('Erro ao buscar categorias e tópicos:', error);
    }
  }, []);

  const fetchUserData = useCallback(async (token) => {
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
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchUserData(token);
      fetchCategories();
    }
  }, [fetchUserData, fetchCategories]);

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

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setCategories([]);
  };

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

  const criarCategoria = async (titulo, subTitulo, descricao) => {
    const token = localStorage.getItem('authToken');
    if (!token || !user) {
      throw new Error('Usuário não autenticado');
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
  
      if (response.status === 201) {
        const novaCategoria = {
          ...categoriaData,
          idCategoria: Date.now().toString(),
          criadoEm: new Date().toISOString()
        };
        
        setCategories(prevCategories => [...prevCategories, novaCategoria]);
        
        return novaCategoria;
      } else {
        throw new Error(`Falha ao criar categoria: ${response.status}`);
      }
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      throw error;
    }
  };

  const fetchTopicos = useCallback(async () => {
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
      return topicosWithRespostas;
    } catch (error) {
      console.error('Erro ao buscar tópicos:', error);
      throw error;
    }
  }, []);
  
  

  const criarTopico = async (titulo, idCategoria, descricao, arquivo) => {
    const token = localStorage.getItem('authToken');
    if (!token || !user) {
      throw new Error('Usuário não autenticado');
    }
  
    // Criar o objeto de dados do tópico no formato esperado pela API
    const topicoData = {
      titulo: titulo,
      descricao: descricao,
      categoria: {
        idCategoria: idCategoria
      },
      criadoPor: {
        idUsuario: user.idUsuario
      }
    };
  
    // Criar FormData e adicionar os parâmetros corretos
    const formData = new FormData();
    formData.append('topico', JSON.stringify(topicoData)); // Parâmetro 'topico' com o JSON
    
    // Adicionar arquivo se existir (parâmetro 'file')
    if (arquivo) {
      formData.append('file', arquivo);
    }
  
    try {
      const response = await fetch('https://josea4745.c44.integrator.host/api/v1/topico', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
          // Não incluímos Content-Type pois o navegador vai definir automaticamente com o boundary correto
        },
        body: formData
      });
  
      // Log da resposta para debug
      const responseText = await response.text();
      console.log('Resposta do servidor:', responseText);
  
      if (response.status === 201) {
        await fetchCategories();
        return true;
      } else {
        throw new Error(`Falha ao criar tópico: ${response.status}. Detalhes: ${responseText}`);
      }
    } catch (error) {
      console.error('Erro ao criar tópico:', error);
      throw error;
    }
  };
  
  
  
  



  
  const criarResposta = useCallback(async (idTopico, descricao) => {
    const token = localStorage.getItem('authToken');
    if (!token || !user) {
      throw new Error('Usuário não autenticado');
    }
  
    const respostaData = {
      descricao,
      topico: {
        idTopico
      },
      criadoPor: {
        idUsuario: user.idUsuario
      }
    };
  
    try {
      const response = await fetch('https://josea4745.c44.integrator.host/api/v1/resposta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(respostaData),
      });
  
      console.log('Resposta do servidor:', response);
  
      if (response.status === 200 || response.status === 201) {
        console.log('Resposta criada com sucesso');
        
        // Criar um objeto de resposta simulado, já que não podemos acessar os dados reais devido ao CORS
        const novaResposta = {
          idResposta: Date.now(), // ID temporário
          descricao,
          criadoPor: {
            idUsuario: user.idUsuario,
            nome: user.nome
          },
          criadoEm: new Date().toISOString()
        };
        
        // Atualiza as respostas localmente
        setRespostas(prev => ({
          ...prev,
          [idTopico]: [...(prev[idTopico] || []), novaResposta]
        }));
  
        return novaResposta;
      } else {
        throw new Error(`Falha ao criar resposta: ${response.status}`);
      }
    } catch (error) {
      console.error('Erro ao criar resposta:', error);
      throw error;
    }
  }, [user]);

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
      fetchCategories,
      currentTopic,
      respostas,
      isLoading,
      error,
      fetchTopicoById,
      criarResposta
    }}>
      {children}
    </ForumContext.Provider>
  );
};

export default ForumProvider;

