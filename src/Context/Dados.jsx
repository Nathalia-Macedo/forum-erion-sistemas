// import React, { createContext, useState, useEffect, useCallback } from 'react';

// export const ForumContext = createContext();

// export const ForumProvider = ({ children }) => {
//   const [categories, setCategories] = useState([]);
//   const [user, setUser] = useState(null);
//   const [topicos, setTopicos] = useState([]);
//   const [respostas, setRespostas] = useState({});
//   const [currentTopic, setCurrentTopic] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [allUsers, setAllUsers] = useState([]);


//   const BASE_URL = 'https://ander4793.c44.integrator.host/api/v1';


//   const fetchAllUsers = useCallback(async () => {
//     const token = localStorage.getItem('authToken');
//     if (!token) {
//       console.error('Token não encontrado. Usuário não está autenticado.');
//       return;
//     }

//     try {
//       const response = await fetch(`${BASE_URL}/usuario/lista`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       if (!response.ok) {
//         throw new Error('Falha ao buscar lista de usuários');
//       }

//       const usersData = await response.json();
//       setAllUsers(usersData);
//     } catch (error) {
//       console.error('Erro ao buscar lista de usuários:', error);
//     }
//   }, []);

//   const fetchTopicoById = useCallback(async (idTopico) => {
//     setIsLoading(true);
//     setError(null);
    
//     const token = localStorage.getItem('authToken');
//     if (!token) {
//       setError('Token não encontrado. Usuário não está autenticado.');
//       setIsLoading(false);
//       return null;
//     }
    
//     try {
//       const response = await fetch(`${BASE_URL}/topico/${idTopico}`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
  
//       if (!response.ok) {
//         throw new Error(`Falha ao buscar tópico: ${response.status}`);
//       }
  
//       const data = await response.json();
//       console.log(data)
//       setCurrentTopic(data);
//       setRespostas(prev => ({ ...prev, [idTopico]: data.respostas || [] }));
//       return data;
//     } catch (error) {
//       setError(error.message);
//       setCurrentTopic(null);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   const fetchCategories = useCallback(async () => {
//     const token = localStorage.getItem('authToken');
//     if (!token) {
//       console.error('Token não encontrado. Usuário não está autenticado.');
//       return;
//     }
    
//     try {
//       const [categoriesResponse, topicsResponse] = await Promise.all([
//         fetch(`${BASE_URL}/categoria`, {
//           headers: { 'Authorization': `Bearer ${token}` }
//         }),
//         fetch(`${BASE_URL}/topico`, {
//           headers: { 'Authorization': `Bearer ${token}` }
//         })
//       ]);
  
//       if (!categoriesResponse.ok || !topicsResponse.ok) {
//         throw new Error('Falha ao buscar categorias ou tópicos');
//       }
  
//       const categoriesData = await categoriesResponse.json();
//       const topicsData = await topicsResponse.json();
  
//       const categoriesWithPostCount = categoriesData.map(category => {
//         const postCount = topicsData.filter(topic => topic.categoria.idCategoria === category.idCategoria).length;
//         return {
//           ...category,
//           postCount
//         };
//       });
  
//       setCategories(categoriesWithPostCount);
//       setTopicos(topicsData);
//     } catch (error) {
//       console.error('Erro ao buscar categorias e tópicos:', error);
//     }
//   }, []);

//   const fetchUserProfile = useCallback(async (userId) => {
//     const token = localStorage.getItem('authToken');
//     if (!token) {
//       throw new Error('Usuário não autenticado');
//     }

//     try {
//       // Fetch user data
//       const userResponse = await fetch(`${BASE_URL}/usuario/${userId}`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       if (!userResponse.ok) {
//         throw new Error('Falha ao buscar dados do usuário');
//       }

//       const userData = await userResponse.json();

//       // Fetch all topics
//       const topicsResponse = await fetch(`${BASE_URL}/topico`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       if (!topicsResponse.ok) {
//         throw new Error('Falha ao buscar tópicos');
//       }

//       const allTopics = await topicsResponse.json();

//       // Filter topics created by the user
//       const userTopics = allTopics.filter(topic => topic.criadoPor.idUsuario === userId);

//       // Fetch all categories
//       const categoriesResponse = await fetch(`${BASE_URL}/categoria`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       if (!categoriesResponse.ok) {
//         throw new Error('Falha ao buscar categorias');
//       }

//       const allCategories = await categoriesResponse.json();

//       // Filter categories created by the user
//       const userCategories = allCategories.filter(category => category.criadoPor.idUsuario === userId);

//       return {
//         user: userData,
//         topics: userTopics,
//         categories: userCategories
//       };
//     } catch (error) {
//       console.error('Erro ao buscar perfil do usuário:', error);
//       throw error;
//     }
//   }, []);
  
//   const deletarResposta = async (idResposta) => {
//     const token = localStorage.getItem('authToken');
//     try {
//       const response = await fetch(`${BASE_URL}/resposta/${idResposta}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`, // Assumindo que o token está disponível no contexto
//         },
//       });

//       if (response.status !== 200) {
//         throw new Error('Falha ao deletar resposta');
//       }

//       console.log('Resposta deletada com sucesso');
//       return true;
//     } catch (error) {
//       console.error('Erro ao deletar resposta:', error);
//       throw error;
//     }
//   };







  
//   const fetchUserData = useCallback(async (token) => {
//     try {
//       const response = await fetch(`${BASE_URL}/usuario/usuarioLogado`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       console.log(response)
//       if (!response.ok) {
//         throw new Error('Falha ao buscar dados do usuário');
//       }

//       const userData = await response.json();
//       console.log(userData)
//       setUser(userData);
//     } catch (error) {
//       console.error('Erro ao buscar dados do usuário:', error);
//       localStorage.removeItem('authToken');
//       setUser(null);
//     }
//   }, []);

//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       fetchUserData(token);
//       fetchCategories();
//     }
//   }, [fetchUserData, fetchCategories]);
 

//   const loginUser = async (email, senha) => {
//     const userCredentials = { email, senha };

//     try {
//       const response = await fetch(`${BASE_URL}/auth`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userCredentials),
//       });

//       if (!response.ok) {
//         if (response.status === 403) {
//           throw new Error('Acesso negado. Sua conta pode não estar ativada ou você não tem permissão para acessar.');
//         }
//         throw new Error(`Falha na autenticação: ${response.status}`);
//       }

//       const data = await response.json();
      
//       if (!data || !data.token) {
//         throw new Error('Token não recebido do servidor');
//       }

//       localStorage.setItem('authToken', data.token);
//       const userData = await fetchUserData(data.token);
//       setUser(userData);
//       await fetchCategories();

//       return { token: data.token, user: userData };
//     } catch (error) {
//       console.error('Erro ao fazer login:', error);
//       setUser(null);
//       throw error;
//     }
//   };
//   const logout = () => {
//     localStorage.removeItem('authToken');
//     setUser(null);
//     setCategories([]);
//   };



//   const cadastrarUsuario = async (nome, cpf, email, senha) => {
//     const userData = { nome, cpf, email, senha };
  
//     try {
//       const response = await fetch(`${BASE_URL}/usuario`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData),
//       });
//       let data 
//       console.log('Status da resposta:', response.status);
//       if(response.status==201){
//         data= "deu certo"
//         console.log('Usuário cadastrado com sucesso:', data);
//         return data;
//       }
  
   
//     } catch (error) {
//       console.error('Erro ao cadastrar usuário:', error);
//       throw error;
//     }
//   };

//   const criarCategoria = async (titulo, subTitulo, descricao) => {
//     const token = localStorage.getItem('authToken');
//     if (!token || !user) {
//       throw new Error('Usuário não autenticado');
//     }
  
//     const categoriaData = {
//       titulo,
//       subTitulo,
//       descricao,
//       criadoPor: {
//         idUsuario: user.idUsuario
//       }
//     };
  
//     try {
//       const response = await fetch(`${BASE_URL}/categoria`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(categoriaData),
//       });
  
//       const data = await response.json();
//       console.log('Resposta da API:', data);
  
//       const novaCategoria = {
//         ...data, // Usar os dados retornados pela API
//         criadoEm: new Date().toISOString()
//       };
      
//       setCategories(prevCategories => [...prevCategories, novaCategoria]);
      
//       return novaCategoria;
//     } catch (error) {
//       console.error('Erro ao criar categoria:', error);
//       throw error;
//     }
//   };

//   const fetchTopicos = useCallback(async () => {
//     const token = localStorage.getItem('authToken');
//     if (!token) {
//       console.error('Token não encontrado. Usuário não está autenticado.');
//       return;
//     }
    
//     try {
//       const response = await fetch(`${BASE_URL}/topico`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (!response.ok) {
//         throw new Error('Falha ao buscar tópicos');
//       }

//       const data = await response.json();
//       console.log(data)
//       const topicosWithRespostas = data.map(topico => ({
//         ...topico,
//         respostas: topico.respostas || []
//       }));
      
//       setTopicos(topicosWithRespostas);
//       return topicosWithRespostas;
//     } catch (error) {
//       console.error('Erro ao buscar tópicos:', error);
//       throw error;
//     }
//   }, []);
  
  

//   const criarTopico = async (titulo, idCategoria, descricao, arquivo) => {
//     const token = localStorage.getItem('authToken');
//     if (!token || !user) {
//       throw new Error('Usuário não autenticado');
//     }
  
//     // Criar o objeto de dados do tópico no formato esperado pela API
//     const topicoData = {
//       titulo: titulo,
//       descricao: descricao,
//       categoria: {
//         idCategoria: idCategoria
//       },
//       criadoPor: {
//         idUsuario: user.idUsuario
//       }
//     };
  
//     // Criar FormData e adicionar os parâmetros corretos
//     const formData = new FormData();
//     formData.append('topico', JSON.stringify(topicoData)); // Parâmetro 'topico' com o JSON
    
//     // Adicionar arquivo se existir (parâmetro 'file')
//     if (arquivo) {
//       formData.append('file', arquivo);
//     }
  
//     try {
//       const response = await fetch(`${BASE_URL}/topico`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`
//           // Não incluímos Content-Type pois o navegador vai definir automaticamente com o boundary correto
//         },
//         body: formData
//       });

//       console.log(response)
  
//       // Log da resposta para debug
//       const responseText = await response.text();
//       console.log('Resposta do servidor:', responseText);
  
//       if (response.status === 201) {
//         await fetchCategories();
//         return true;
//       } else {
//         throw new Error(`Falha ao criar tópico: ${response.status}. Detalhes: ${responseText}`);
//       }
//     } catch (error) {
//       console.error('Erro ao criar tópico:', error);
//       throw error;
//     }
//   };
  
  
//   const criarCurtida = async (idTopico) => {
//   const token = localStorage.getItem('authToken');
//   if (!token || !user) {
//     throw new Error('Usuário não autenticado');
//   }

//   try {
//     const response = await fetch(`${BASE_URL}/curtida`, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         curtidoPor: {
//           idUsuario: user.idUsuario
//         },
//         topico: {
//           idTopico: idTopico
//         }
//       })
//     });

//     if (!response.ok) {
//       throw new Error('Falha ao curtir tópico');
//     }

//     // Refresh the topics to get updated like count
//     await fetchTopicos();
//     return true;
//   } catch (error) {
//     console.error('Erro ao criar curtida:', error);
//     throw error;
//   }
// };
  
// const deletarCurtida = async (idTopico) => {
//   const token = localStorage.getItem('authToken');
//   if (!token) {
//     throw new Error('Usuário não autenticado');
//   }

//   try {
//     const response = await fetch(`${BASE_URL}/curtida/${idTopico}`, {
//       method: 'DELETE',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       }
//     });

//     if (!response.ok) {
//       throw new Error('Falha ao deletar curtida');
//     }

//     // Refresh the topics to get updated like count
//     await fetchTopicos();
//     return true;
//   } catch (error) {
//     console.error('Erro ao deletar curtida:', error);
//     throw error;
//   }
// };


  
 


// const criarResposta = useCallback(async (idTopico, descricao) => {
//   const token = localStorage.getItem('authToken');
//   if (!token || !user) {
//     throw new Error('Usuário não autenticado');
//   }

//   const respostaData = {
//     descricao,
//     topico: {
//       idTopico
//     },
//     criadoPor: {
//       idUsuario: user.idUsuario
//     }
//   };

//   try {
//     const response = await fetch(`${BASE_URL}/resposta`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
//       body: JSON.stringify(respostaData),
//     });

//     if (response.ok && response.status === 201) {
//       console.log('Resposta criada com sucesso');
      
//       // Criar um objeto de resposta simulado, já que não podemos acessar os dados reais devido ao CORS
//       const novaResposta = {
//         idResposta: Date.now(), // ID temporário
//         descricao,
//         criadoPor: {
//           idUsuario: user.idUsuario,
//           nome: user.nome
//         },
//         criadoEm: new Date().toISOString()
//       };
      
//       // Atualiza as respostas localmente
//       setRespostas(prev => ({
//         ...prev,
//         [idTopico]: [...(prev[idTopico] || []), novaResposta]
//       }));

//       return novaResposta;
//     } else {
//       throw new Error(`Falha ao criar resposta: ${response.status}`);
//     }
//   } catch (error) {
//     console.error('Erro ao criar resposta:', error);
//     throw error;
//   }
// }, [user]);
 

// const searchAll = useCallback((searchTerm) => {
//   const lowercaseTerm = searchTerm.toLowerCase();
  
//   const matchingTopics = topicos.filter(topico => 
//     topico.titulo.toLowerCase().includes(lowercaseTerm) || 
//     topico.descricao.toLowerCase().includes(lowercaseTerm)
//   ).map(topico => ({ ...topico, type: 'Tópico' }));

//   const matchingCategories = categories.filter(categoria => 
//     categoria.titulo.toLowerCase().includes(lowercaseTerm) || 
//     categoria.descricao.toLowerCase().includes(lowercaseTerm)
//   ).map(categoria => ({ ...categoria, type: 'Categoria' }));

//   const matchingUsers = user ? [user].filter(u => 
//     u.nome.toLowerCase().includes(lowercaseTerm)
//   ).map(u => ({ ...u, type: 'Usuário' })) : [];

//   return [...matchingTopics, ...matchingCategories, ...matchingUsers];
// }, [topicos, categories, user]);

// const deleteUser = async (idUsuario) => {
//   const token = localStorage.getItem('authToken');
//   if (!token) {
//     throw new Error('Usuário não autenticado');
//   }

//   try {
//     const response = await fetch(`${BASE_URL}/usuario/${idUsuario}`, {
//       method: 'DELETE',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error('Falha ao deletar usuário');
//     }

//     setAllUsers(prevUsers => prevUsers.filter(user => user.idUsuario !== idUsuario));
//     return true;
//   } catch (error) {
//     console.error('Erro ao deletar usuário:', error);
//     throw error;
//   }
// };

// const alterarPermissaoUsuario = async (idUsuario, novaPermissao) => {
//   const token = localStorage.getItem('authToken');
//   if (!token) {
//     throw new Error('Usuário não autenticado');
//   }

//   try {
//     // Verifica se o ID é válido
//     if (!idUsuario) {
//       throw new Error('ID do usuário é obrigatório');
//     }

//     // Verifica se a permissão é válida
//     if (!['USER', 'ADMIN'].includes(novaPermissao)) {
//       throw new Error('Permissão inválida');
//     }

//     const url = `${BASE_URL}/usuario/alterar-permissao/${idUsuario}`;
    
//     console.log('URL da requisição:', url);
//     console.log('Dados sendo enviados:', novaPermissao);

//     const response = await fetch(url, {
//       method: 'PATCH',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(novaPermissao) // Enviando apenas a string da permissão
//     });

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => null);
//       console.error('Resposta do servidor:', {
//         status: response.status,
//         statusText: response.statusText,
//         errorData
//       });
//       throw new Error(`Falha ao alterar permissão do usuário: ${response.status} ${response.statusText}`);
//     }

//     // Atualiza a lista de usuários localmente
//     setAllUsers(prevUsers => prevUsers.map(user => 
//       user.idUsuario === idUsuario ? { ...user, role: novaPermissao } : user
//     ));

//     return true;
//   } catch (error) {
//     console.error('Erro detalhado:', {
//       message: error.message,
//       stack: error.stack
//     });
//     throw error;
//   }
// };



//   return (
//     <ForumContext.Provider value={{ 
//       categories, 
//       alterarPermissaoUsuario,
//       criarCurtida,
//       setCategories, 
//       cadastrarUsuario, 
//       fetchUserById,
//       loginUser, 
//       searchAll,
//       user, 
//       criarCategoria,
//       topicos,
//       deleteUser,
//       fetchTopicos,
//       criarTopico,
//       logout,
//       fetchCategories,
//       currentTopic,
//       respostas,
//       isLoading,
//       error,
//       fetchAllUsers,
//       allUsers,
//       fetchTopicoById,
//       criarResposta,
//       deletarCurtida,
//       deletarResposta
//     }}>
//       {children}
//     </ForumContext.Provider>
//   );
// };

// export default ForumProvider;

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
  const [allUsers, setAllUsers] = useState([]);

  const BASE_URL = 'https://ander4793.c44.integrator.host/api/v1';

  const fetchAllUsers = useCallback(async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Token não encontrado. Usuário não está autenticado.');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/usuario/lista`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        throw new Error('Falha ao buscar lista de usuários');
      }

      const usersData = await response.json();
      setAllUsers(usersData);
    } catch (error) {
      console.error('Erro ao buscar lista de usuários:', error);
    }
  }, []);

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
      console.log(data);
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

  const fetchUserProfile = useCallback(async (userId) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Usuário não autenticado');
    }

    try {
      const userResponse = await fetch(`${BASE_URL}/usuario/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!userResponse.ok) {
        throw new Error('Falha ao buscar dados do usuário');
      }

      const userData = await userResponse.json();

      const topicsResponse = await fetch(`${BASE_URL}/topico`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!topicsResponse.ok) {
        throw new Error('Falha ao buscar tópicos');
      }

      const allTopics = await topicsResponse.json();
      const userTopics = allTopics.filter(topic => topic.criadoPor.idUsuario === userId);

      const categoriesResponse = await fetch(`${BASE_URL}/categoria`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!categoriesResponse.ok) {
        throw new Error('Falha ao buscar categorias');
      }

      const allCategories = await categoriesResponse.json();
      const userCategories = allCategories.filter(category => category.criadoPor.idUsuario === userId);

      return {
        user: userData,
        topics: userTopics,
        categories: userCategories
      };
    } catch (error) {
      console.error('Erro ao buscar perfil do usuário:', error);
      throw error;
    }
  }, []);

  const deletarResposta = async (idResposta) => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(`${BASE_URL}/resposta/${idResposta}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error('Falha ao deletar resposta');
      }

      console.log('Resposta deletada com sucesso');
      return true;
    } catch (error) {
      console.error('Erro ao deletar resposta:', error);
      throw error;
    }
  };

  const fetchUserData = useCallback(async (token) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/usuario/usuarioLogado`, {
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
      return userData;
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      localStorage.removeItem('authToken');
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginUser = async (email, senha) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Acesso negado. Sua conta pode não estar ativada ou você não tem permissão para acessar.');
        }
        throw new Error(`Falha na autenticação: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data || !data.token) {
        throw new Error('Token não recebido do servidor');
      }

      localStorage.setItem('authToken', data.token);
      const userData = await fetchUserData(data.token);
      await fetchCategories();

      return { token: data.token, user: userData };
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
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
      let data;
      console.log('Status da resposta:', response.status);
      if(response.status === 201){
        data = "deu certo";
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
        ...data,
        criadoEm: new Date().toISOString()
      };
      
      setCategories(prevCategories => [...prevCategories, novaCategoria]);
      
      return novaCategoria;
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
      console.log(data);
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
  
    const formData = new FormData();
    formData.append('topico', JSON.stringify(topicoData));
    
    if (arquivo) {
      formData.append('file', arquivo);
    }
  
    try {
      const response = await fetch(`${BASE_URL}/topico`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      console.log(response);
  
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

      await fetchTopicos();
      return true;
    } catch (error) {
      console.error('Erro ao criar curtida:', error);
      throw error;
    }
  };
  
  const deletarCurtida = async (idTopico) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Usuário não autenticado');
    }

    try {
      const response = await fetch(`${BASE_URL}/curtida/${idTopico}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error('Falha ao deletar curtida');
      }

      await fetchTopicos();
      return true;
    } catch (error) {
      console.error('Erro ao deletar curtida:', error);
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
        
        const novaResposta = {
          idResposta: Date.now(),
          descricao,
          criadoPor: {
            idUsuario: user.idUsuario,
            nome: user.nome
          },
          criadoEm: new Date().toISOString()
        };
        
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

  const deleteUser = async (idUsuario) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Usuário não autenticado');
    }

    try {
      const response = await fetch(`${BASE_URL}/usuario/${idUsuario}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Falha ao deletar usuário');
      }

      setAllUsers(prevUsers => prevUsers.filter(user => user.idUsuario !== idUsuario));
      return true;
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      throw error;
    }
  };

  const alterarPermissaoUsuario = async (idUsuario, novaPermissao) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Usuário não autenticado');
    }

    try {
      if (!idUsuario) {
        throw new Error('ID do usuário é obrigatório');
      }

      if (!['USER', 'ADMIN'].includes(novaPermissao)) {
        throw new Error('Permissão inválida');
      }

      const url = `${BASE_URL}/usuario/alterar-permissao/${idUsuario}`;
      
      console.log('URL da requisição:', url);
      console.log('Dados sendo enviados:', novaPermissao);

      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novaPermissao)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Resposta do servidor:', {
          status: response.status,
          statusText: response.statusText,
          errorData
        });
        throw new Error(`Falha ao alterar permissão do usuário: ${response.status} ${response.statusText}`);
      }

      setAllUsers(prevUsers => prevUsers.map(user => 
        user.idUsuario === idUsuario ? { ...user, role: novaPermissao } : user
      ));

      return true;
    } catch (error) {
      console.error('Erro detalhado:', {
        message: error.message,
        stack: error.stack
      });
      throw error;
    }
  };

  const activateUserAccount = async (email) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Token não encontrado');
      }
  
      const response = await fetch(`${BASE_URL}/ativar/${email}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 200 && response.ok) {
        return { success: true, message: 'Conta ativada com sucesso' };
      } else {
        let errorMessage;
        
        switch (response.status) {
          case 400:
            errorMessage = 'Requisição inválida';
            break;
          case 401:
            errorMessage = 'Não autorizado. Por favor, faça login novamente.';
            break;
          case 403:
            errorMessage = 'Você não tem permissão para ativar esta conta.';
            break;
          case 404:
            errorMessage = 'Usuário não encontrado.';
            break;
          case 500:
            errorMessage = 'Erro interno do servidor. Por favor, tente novamente mais tarde.';
            break;
          default:
            errorMessage = 'Falha ao ativar conta. Por favor, tente novamente.';
        }
  
        console.error('Resposta do servidor:', {
          status: response.status,
          statusText: response.statusText,
          ok: response.ok
        });
  
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Erro ao ativar conta:', error);
      throw error;
    }
  };
  
  

  const checkAuthToken = useCallback(async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        await fetchUserData(token);
      } catch (error) {
        console.error('Error checking auth token:', error);
        logout();
      }
    }
  }, [fetchUserData]);

  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          await fetchUserData(token);
          await fetchCategories();
        } catch (error) {
          console.error('Erro ao verificar autenticação:', error);
        }
      }
    };

    checkAuthAndFetchData();
  }, [fetchUserData, fetchCategories]);

  useEffect(() => {
    checkAuthToken();
  }, [checkAuthToken]);

  return (
    <ForumContext.Provider value={{ 
      categories, 
      alterarPermissaoUsuario,
      criarCurtida,
      setCategories, 
      cadastrarUsuario, 
      fetchUserProfile,
      loginUser, 
      searchAll,
      user, 
      criarCategoria,
      topicos,
      deleteUser,
      fetchTopicos,
      criarTopico,
      logout,
      fetchCategories,
      activateUserAccount,
      currentTopic,
      respostas,
      isLoading,
      error,
      fetchAllUsers,
      allUsers,
      fetchTopicoById,
      criarResposta,
      deletarCurtida,
      deletarResposta,
      checkAuthToken,
      setUser,
      setError,
      setIsLoading,
      fetchUserData
    }}>
      {children}
    </ForumContext.Provider>
  );
};

export default ForumProvider;