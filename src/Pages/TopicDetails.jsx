import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ForumContext } from '../Context/Dados';
import { FileText } from 'lucide-react'; // Importando ícone para arquivos
import './TopicDetails.css';

const TopicDetail = () => {
  const { idTopico } = useParams();
  const { 
    currentTopic, 
    fetchTopicoById,
    criarResposta, 
    respostas,
    isLoading,
    error
  } = useContext(ForumContext);
  const [descricaoResposta, setDescricaoResposta] = useState('');
  const [localLoading, setLocalLoading] = useState(true);
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    const loadTopic = async () => {
      setLocalLoading(true);
      setLocalError(null);
      try {
        await fetchTopicoById(idTopico);
      } catch (err) {
        setLocalError('Erro ao carregar o tópico. Por favor, tente novamente.');
      } finally {
        setLocalLoading(false);
      }
    };

    loadTopic();
  }, [idTopico, fetchTopicoById]);

  const handleResponder = async (e) => {
    e.preventDefault();
    if (!descricaoResposta.trim()) return;
    try {
      await criarResposta(idTopico, descricaoResposta);
      setDescricaoResposta('');
      await fetchTopicoById(idTopico);
    } catch (error) {
      console.error('Erro ao enviar resposta:', error);
      setLocalError('Erro ao enviar resposta. Por favor, tente novamente.');
    }
  };

  if (localLoading || isLoading) {
    return <div className="loading">Carregando...</div>;
  }

  if (localError || error) {
    return <div className="error">{localError || error}</div>;
  }

  if (!currentTopic) {
    return <div className="not-found">Tópico não encontrado</div>;
  }

  const topicoRespostas = currentTopic.respostas || [];

  return (
    <div className="topic-detail-container">
      <h2 className="topic-title">{currentTopic.titulo}</h2>
      <p className="topic-description">{currentTopic.descricao}</p>
      <div className="topic-meta">
        <span>Por: {currentTopic.criadoPor.nome}</span>
        <span>Data: {new Date(currentTopic.criadoEm).toLocaleDateString()}</span>
      </div>

      {/* Seção de Anexos */}
      {currentTopic.anexos && currentTopic.anexos.length > 0 && (
        <div className="attachments-section">
          <h3>Anexos</h3>
          <div className="attachments-list">
            {currentTopic.anexos.map((anexo) => (
              <a
                key={anexo.idAnexo}
                href={anexo.anexo}
                target="_blank"
                rel="noopener noreferrer"
                className="attachment-item"
              >
                <FileText size={20} />
                <span>{anexo.nomeArquivo}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="responses-section">
        <h3>Respostas</h3>
        {topicoRespostas.length === 0 ? (
          <p>Nenhuma resposta ainda. Seja o primeiro a responder!</p>
        ) : (
          topicoRespostas.map((resposta, index) => (
            <div key={resposta.idResposta || index} className="response-card">
              <p>{resposta.descricao}</p>
              <div className="response-footer">
                <span>Por: {resposta.criadoPor.nome}</span>
                <span>Data: {new Date(resposta.criadoEm).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
      <form onSubmit={handleResponder} className="response-form">
        <textarea
          value={descricaoResposta}
          onChange={(e) => setDescricaoResposta(e.target.value)}
          placeholder="Escreva sua resposta..."
          required
        />
        <button type="submit">Responder</button>
      </form>
    </div>
  );
};

export default TopicDetail;

