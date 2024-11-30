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

  const BASE_URL = 'https://ander4793.c44.integrator.host/api/v1';

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
      const response = await fetch(`${BASE_URL}/topico/${idTopico}`, {
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
      console.log(data)
      setCurrentTopic(data);
      setRespostas(prev => ({ ...prev, [idTopico]: data.respostas || [] }));
      return data;
    } catch (error) {
      setError(error.message);
      setCurrentTopic(null);
      throw error;
    } finally {
      setIsLoading(false);
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
        fetch(`${BASE_URL}/categoria`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${BASE_URL}/topico`, {
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
      const response = await fetch(`${BASE_URL}/usuario/usuarioLogado`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response)
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
    const response = await fetch(`${BASE_URL}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    });
    console.log(response)
    if (!response.ok) {
      throw new Error(`Falha na autenticação: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data || !data.token) {
      throw new Error('Token não recebido do servidor');
    }

    localStorage.setItem('authToken', data.token);
    await Promise.all([fetchUserData(data.token), fetchCategories()]);

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
      const response = await fetch(`${BASE_URL}/usuario`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      let data 
      console.log('Status da resposta:', response.status);
      if(response.status==201){
        data= "deu certo"
        console.log('Usuário cadastrado com sucesso:', data);
        return data;
      }
  
   
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
      const response = await fetch(`${BASE_URL}/categoria`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(categoriaData),
      });
  
      const data = await response.json();
      console.log('Resposta da API:', data);
  
      const novaCategoria = {
        ...data, // Usar os dados retornados pela API
        criadoEm: new Date().toISOString()
      };
      
      setCategories(prevCategories => [...prevCategories, novaCategoria]);
      
      return novaCategoria;
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      throw error;
    }
  };


  // const criarCategoria = async (titulo, subTitulo, descricao) => {
  //   const token = localStorage.getItem('authToken');
  //   if (!token || !user) {
  //     throw new Error('Usuário não autenticado');
  //   }
  
  //   const categoriaData = {
  //     titulo,
  //     subTitulo,
  //     descricao,
  //     criadoPor: {
  //       idUsuario: user.idUsuario
  //     }
  //   };
  
  //   try {
  //     const response = await fetch(`${BASE_URL}/categoria`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //       },
  //       body: JSON.stringify(categoriaData),
  //     });
  //     console.log(response)
  //     let data = await response.json()
  //     console.log(data)
  //     if (data.status === 201) {
  //       const novaCategoria = {
  //         ...categoriaData,
  //         idCategoria: Date.now().toString(),
  //         criadoEm: new Date().toISOString()
  //       };
        
  //       setCategories(prevCategories => [...prevCategories, novaCategoria]);
        
  //       return novaCategoria;
  //     } else {
  //       throw new Error(`Falha ao criar categoria: ${response.status}`);
  //     }
  //   } catch (error) {
  //     console.error('Erro ao criar categoria:', error);
  //     throw error;
  //   }
  // };

  const fetchTopicos = useCallback(async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Token não encontrado. Usuário não está autenticado.');
      return;
    }
    
    try {
      const response = await fetch(`${BASE_URL}/topico`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Falha ao buscar tópicos');
      }

      const data = await response.json();
      console.log(data)
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
      const response = await fetch(`${BASE_URL}/topico`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
          // Não incluímos Content-Type pois o navegador vai definir automaticamente com o boundary correto
        },
        body: formData
      });

      console.log(response)
  
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
  
  
  const criarCurtida = async (idTopico) => {
  const token = localStorage.getItem('authToken');
  if (!token || !user) {
    throw new Error('Usuário não autenticado');
  }

  try {
    const response = await fetch(`${BASE_URL}/curtida`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        curtidoPor: {
          idUsuario: user.idUsuario
        },
        topico: {
          idTopico: idTopico
        }
      })
    });

    if (!response.ok) {
      throw new Error('Falha ao curtir tópico');
    }

    // Refresh the topics to get updated like count
    await fetchTopicos();
    return true;
  } catch (error) {
    console.error('Erro ao criar curtida:', error);
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
    const response = await fetch(`${BASE_URL}/resposta`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(respostaData),
    });

    if (response.ok && response.status === 201) {
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
 

const searchAll = useCallback((searchTerm) => {
  const lowercaseTerm = searchTerm.toLowerCase();
  
  const matchingTopics = topicos.filter(topico => 
    topico.titulo.toLowerCase().includes(lowercaseTerm) || 
    topico.descricao.toLowerCase().includes(lowercaseTerm)
  ).map(topico => ({ ...topico, type: 'Tópico' }));

  const matchingCategories = categories.filter(categoria => 
    categoria.titulo.toLowerCase().includes(lowercaseTerm) || 
    categoria.descricao.toLowerCase().includes(lowercaseTerm)
  ).map(categoria => ({ ...categoria, type: 'Categoria' }));

  const matchingUsers = user ? [user].filter(u => 
    u.nome.toLowerCase().includes(lowercaseTerm)
  ).map(u => ({ ...u, type: 'Usuário' })) : [];

  return [...matchingTopics, ...matchingCategories, ...matchingUsers];
}, [topicos, categories, user]);




  return (
    <ForumContext.Provider value={{ 
      categories, 
      criarCurtida,
      setCategories, 
      cadastrarUsuario, 
      loginUser, 
      searchAll,
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

