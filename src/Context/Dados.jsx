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

  const deletarCategoria = async (idCategoria) => {

    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Usuário não autenticado');
    }
  
    try {
      const response = await fetch(`${BASE_URL}/categoria/${idCategoria}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response)
      if (!response.ok) {
        throw new Error('Falha ao deletar categoria');
      }
  
      // Atualizar o estado local após a deleção bem-sucedida
      setCategories(prevCategories => prevCategories.filter(cat => cat.idCategoria !== idCategoria));
      return true;
    } catch (error) {
      console.error('Erro ao deletar categoria:', error);
      throw error;
    }
  };



  const updateProfilePhoto = async (file) => {
    const token = localStorage.getItem('authToken');
    if (!token || !user) {
      throw new Error('Usuário não autenticado');
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await fetch(`${BASE_URL}/usuario/${user.idUsuario}/foto`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
  
      if (!response.ok) {
        throw new Error('Falha ao atualizar foto do perfil');
      }
  
      // Refresh user data to get the updated photo
      await fetchUserData(token);
      return true;
    } catch (error) {
      console.error('Erro ao atualizar foto do perfil:', error);
      throw error;
    }
  };
  

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
      console.log(categoriesData)
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
      // Fetch all users
      const usersResponse = await fetch(`${BASE_URL}/usuario/lista`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
  
      if (!usersResponse.ok) {
        throw new Error('Falha ao buscar usuários');
      }
  
      const allUsers = await usersResponse.json();
      
      // Find the specific user
      const userData = allUsers.find(user => user.idUsuario === userId);
  
      if (!userData) {
        throw new Error('Usuário não encontrado');
      }
  
      // Fetch all topics
      const topicsResponse = await fetch(`${BASE_URL}/topico`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
  
      if (!topicsResponse.ok) {
        throw new Error('Falha ao buscar tópicos');
      }
  
      const allTopics = await topicsResponse.json();
      const userTopics = allTopics.filter(topic => topic.criadoPor.idUsuario === userId);
  
      // Fetch all categories
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
        categories:   userCategories
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

      console.log(response)

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

      console.log(response)
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Acesso negado. Sua conta pode não estar ativada ou você não tem permissão para acessar.');
        }
        throw new Error(`Falha na autenticação: ${response.status}`);
      }

      const data = await response.json();
      console.log(data)
      
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
        idUsuario: user.idUsuario,
        nome: user.nome // Include the user's name
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
  
      console.log('Resposta da API:', response);
  
      if (response.status === 201 && response.ok) {
        const novaCategoria = {
          ...categoriaData,
          idCategoria: Date.now(), // Temporary ID until we can fetch the real one
          criadoEm: new Date().toISOString()
        };
        
        setCategories(prevCategories => [...prevCategories, novaCategoria]);
        
        return novaCategoria;
      } else {
        throw new Error('Erro ao criar categoria');
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

  
  

  
const criarTopico = async (titulo, idCategoria, descricao, arquivos, links = []) => {
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
    },
    links: links
  };

  const formData = new FormData();
  formData.append('topico', JSON.stringify(topicoData));
  
  if (arquivos && arquivos.length > 0) {
    arquivos.forEach((arquivo, index) => {
      if (arquivo.isLink) {
        formData.append(`link_${index}`, arquivo.file);
      } else if (arquivo instanceof File) {
        formData.append(`file_${index}`, arquivo);
      }
    });
  }

  console.log('Dados do tópico:', topicoData);
  console.log('Arquivos:', arquivos);
  
  const formDataEntries = [];
  for (let pair of formData.entries()) {
    formDataEntries.push({
      key: pair[0],
      value: pair[1] instanceof File ? `File: ${pair[1].name}` : pair[1]
    });
  }
  console.log('FormData entries:', formDataEntries);

  try {
    const response = await fetch(`${BASE_URL}/topico`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    console.log('Response:', response);
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

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result;
        resolve({
          name: file.name,
          type: file.type,
          base64Content: base64String
        });
      };
      reader.onerror = (error) => reject(error);
    });
  };
 

//   const criarResposta = useCallback(async (idTopico, descricao, arquivos = []) => {
//   console.log('Iniciando criação de resposta');
//   const token = localStorage.getItem('authToken');
//   if (!token || !user) {
//     console.log('Usuário não autenticado');
//     throw new Error('Usuário não autenticado');
//   }

//   const formData = new FormData();

//   const respostaData = {
//     descricao,
//     topico: {
//       idTopico
//     },
//     criadoPor: {
//       idUsuario: user.idUsuario
//     }
//   };

//   // Append the JSON data for 'resposta'
//   formData.append('resposta', JSON.stringify(respostaData));

//   // Append files to the 'file' key
//   arquivos.forEach((arquivo, index) => {
//     // Extract the base64 data (remove the data URL prefix)
//     const base64Data = arquivo.base64Content.split(',')[1];
//     const blob = new Blob([atob(base64Data)], { type: arquivo.type });
//     formData.append(`file`, blob, arquivo.name);
//   });

//   console.log('Dados da resposta:', respostaData);
//   console.log('Número de arquivos:', arquivos.length);

//   try {
//     console.log('Iniciando requisição para:', `${BASE_URL}/resposta`);
//     const response = await fetch(`${BASE_URL}/resposta`, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${token}`
//       },
//       body: formData
//     });

//     console.log('Resposta recebida. Status:', response.status);
//     console.log('Headers da resposta:', Object.fromEntries(response.headers.entries()));

//     if (response.status === 201) {
//       console.log('Resposta criada com sucesso');
      
//       // Create a new response object with the data we have
//       const novaResposta = {
//         idResposta: Date.now(), // Use a temporary ID
//         descricao,
//         criadoPor: {
//           idUsuario: user.idUsuario,
//           nome: user.nome
//         },
//         criadoEm: new Date().toISOString(),
//         anexos: arquivos.map(arquivo => ({
//           nomeArquivo: arquivo.name,
//           anexo: arquivo.base64Content
//         }))
//       };

//       setRespostas(prev => ({
//         ...prev,
//         [idTopico]: [novaResposta, ...(prev[idTopico] || [])]
//       }));

//       return true;
//     } else {
//       console.error('Falha ao criar resposta. Status:', response.status);
//       const errorText = await response.text();
//       console.error('Detalhes do erro:', errorText);
//       throw new Error(`Falha ao criar resposta: ${response.status}`);
//     }
//   } catch (error) {
//     console.error('Erro ao criar resposta:', error);
//     throw error;
//   }
// }, [user]);

const criarResposta = useCallback(async (idTopico, descricao, arquivos = []) => {
  console.log('Iniciando criação de resposta');
  
  const token = localStorage.getItem('authToken');
  if (!token || !user) {
    console.log('Usuário não autenticado');
    throw new Error('Usuário não autenticado');
  }

  const formData = new FormData();

  // Estrutura da resposta
  const respostaData = {
    descricao,
    topico: {
      idTopico
    },
    criadoPor: {
      idUsuario: user.idUsuario
    }
  };

  // Adiciona os dados da resposta ao FormData
  formData.append('resposta', JSON.stringify(respostaData));
  console.log('Dados da resposta adicionados ao FormData:', respostaData);

  // Adiciona os arquivos ao FormData
  arquivos.forEach((arquivo) => {
    const base64Data = arquivo.anexo.split(',')[1]; // Remove o prefixo do Data URL
    const blob = new Blob([atob(base64Data)], { type: arquivo.nomeArquivo.split('.').pop() }); // Cria um blob a partir do base64
    formData.append('file', blob, arquivo.nomeArquivo); // Adiciona o arquivo ao FormData
    console.log(`Arquivo adicionado ao FormData: ${arquivo.nomeArquivo}`);
  });

  console.log('FormData preparado para envio:', formData);

  try {
    console.log('Iniciando requisição para:', `${BASE_URL}/resposta`);
    const response = await fetch(`${BASE_URL}/resposta`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    console.log('Resposta recebida. Status:', response.status);
    const responseText = await response.text(); // Captura o texto da resposta para depuração
    console.log('Texto da resposta:', responseText);

    if (response.status === 201) {
      console.log('Resposta criada com sucesso');
      
      // Cria um novo objeto de resposta com os dados que temos
      const novaResposta = {
        idResposta: Date.now(), // Use um ID temporário
        descricao,
        criadoPor: {
          idUsuario: user.idUsuario,
          nome: user.nome
        },
        criadoEm: new Date().toISOString(),
        anexos: arquivos.map(arquivo => ({
          nomeArquivo: arquivo.nomeArquivo,
          anexo: arquivo.anexo
        }))
      };

      setRespostas(prev => ({
        ...prev,
        [idTopico]: [novaResposta, ...(prev[idTopico] || [])]
      }));

      console.log('Nova resposta adicionada ao estado:', novaResposta);
      return novaResposta; // Retorna o novo objeto de resposta
    } else {
      console.error('Falha ao criar resposta. Status:', response.status);
      throw new Error(`Falha ao criar resposta: ${response.status}. Detalhes: ${responseText}`);
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

    const matchingUsers = allUsers.filter(u => 
      u.nome.toLowerCase().includes(lowercaseTerm) ||
      u.email.toLowerCase().includes(lowercaseTerm)
    ).map(u => ({ ...u, type: 'Usuário' }));

    return [...matchingTopics, ...matchingCategories, ...matchingUsers];
  }, [topicos, categories, allUsers]);

 
  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token not found');
      }
      console.log(`${BASE_URL}/usuario/${userId}`);
      const response = await fetch(`${BASE_URL}/usuario/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      console.log(response);
      
      if (response.ok && response.status === 200) {
        // User deleted successfully
        return true;
      } else if (response.status === 500) {
                  throw new Error('Não é possível excluir o usuário porque ele possui tópicos existentes.');
        } else {
          throw new Error('Erro interno do servidor ao tentar excluir o usuário.');
        }
      } 
     catch (error) {
      console.error('Erro ao excluir usuário:', error);
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


  const updatePassword = async (idUsuario, senhaAtual, novaSenha) => {
    console.log('updatePassword called', { idUsuario, senhaAtual, novaSenha });
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Token não encontrado');
      throw new Error('Usuário não autenticado');
    }
  
    try {
      const response = await fetch(`${BASE_URL}/usuario/alterar-senha-admin/${idUsuario}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          idUsuario,
          senhaAtual,
          novaSenha,
          confirmaSenha: novaSenha
        })
      });
  
      console.log('Response received:', response);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.message || 'Falha ao atualizar senha');
      }
  
      console.log('Password update successful');
      return true;
    } catch (error) {
      console.error('Erro ao atualizar senha:', error);
      throw error;
    }
  };
  
  const deleteTopic = async (topicId) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Token de autenticação não encontrado');
      }
  
      const url = `https://ander4793.c44.integrator.host/api/v1/topico/${topicId}`;
      
      // Primeira tentativa: usando JSON
      let response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ topico: { idTopico: topicId } })
      });
  
      // Se a primeira tentativa falhar, tenta com FormData
      if (!response.ok) {
        console.log('Primeira tentativa falhou, tentando com FormData');
        const formData = new FormData();
        formData.append('topico', JSON.stringify({ idTopico: topicId }));
  
        response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });
      }
  
      // Se ainda não for bem-sucedido, tenta sem body
      if (!response.ok) {
        console.log('Segunda tentativa falhou, tentando sem body');
        response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Resposta da API:', errorText);
        throw new Error(`Erro ao deletar tópico: ${response.status} ${response.statusText}`);
      }
  
      console.log('Tópico deletado com sucesso');
      return true;
    } catch (error) {
      console.error('Erro ao deletar tópico:', error);
      throw error;
    }
  };


  const editarTopico = async (idTopico, titulo, idCategoria, descricao, anexos = [], links = []) => {
    const token = localStorage.getItem("authToken");
    try {
      const topicoData = {
        titulo,
        idCategoria,
        descricao,
        links: links || []
      };
  
      const formData = new FormData();
      formData.append('topico', JSON.stringify(topicoData));
  
      // Handle file attachments
      if (anexos && anexos.length > 0) {
        anexos.forEach((anexo) => {
          if (anexo instanceof File) {
            formData.append('file', anexo);
          }
        });
      }
  
      // Important: Do NOT set Content-Type header when sending FormData
      // Let the browser set it automatically with the correct boundary
      const response = await fetch(`${BASE_URL}/topico/${idTopico}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
          // Remove any Content-Type header
        },
        body: formData
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // Get raw response text for better error debugging
        console.error('Response error:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
        throw new Error(errorText || 'Erro ao editar tópico');
      }
  
      const data = await response.json();
      await fetchTopicos();
      return data;
    } catch (error) {
      console.error('Erro ao editar tópico:', error);
      throw error;
    }
  };
  
  const solicitarAlteracaoSenha = async (email) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${BASE_URL}/usuario/emitir-alterar-senha/${email}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao solicitar alteração de senha');
      }
  
      return true;
    } catch (error) {
      console.error('Erro ao solicitar alteração de senha:', error);
      throw error;
    }
  };  
  
  
  

  return (
    <ForumContext.Provider value={{ 
      categories, 
      alterarPermissaoUsuario,
      criarCurtida,
      setCategories, 
      updatePassword,
      cadastrarUsuario, 
      solicitarAlteracaoSenha,
      fetchUserProfile,
      loginUser, 
      searchAll,
      editarTopico,
      user, 
      criarCategoria,
      topicos,
      deletarCategoria,
      deleteUser,
      fetchTopicos,
      criarTopico,
      logout,
      fetchCategories,
      updateProfilePhoto,
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
      deleteTopic,
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