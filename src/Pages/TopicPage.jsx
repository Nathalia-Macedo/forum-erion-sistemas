// // ForumPage.js
// import React, { useContext, useEffect } from 'react';
// import { ForumContext } from '../Context/Dados';
// import TopicCard from '../Components/TopicCard/TopicCard';
// import './TopicPage.css';
// import Header from '../Components/Header/Header';

// const ForumPage = () => {
//   const { topicos, fetchTopicos } = useContext(ForumContext);

//   useEffect(() => {
//     fetchTopicos();
//   }, []);

//   return (
//     <>
    
    
    
//     <Header/>
//       <main className="forum-content">
//         <div className="topics-grid">
//           {topicos.map(topico => (
//             <TopicCard
//               key={topico.idTopico}
//               {...topico}
//             />
//           ))}
//         </div>
//       </main>
    
//     </>
    
//   );
// };

// export default ForumPage;

import React, { useContext, useEffect } from 'react';
import { ForumContext } from '../Context/Dados';
import TopicCard from '../Components/TopicCard/TopicCard';
import './TopicPage.css';
import Header from '../Components/Header/Header';
import { parseISO, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const ForumPage = () => {
  const { topicos, fetchTopicos } = useContext(ForumContext);

  useEffect(() => {
    fetchTopicos();
  }, [fetchTopicos]);

  // Ordena os tópicos do mais recente para o mais antigo e inverte a ordem
  const sortedTopicos = [...topicos]
    .sort((a, b) => parseISO(b.criadoEm) - parseISO(a.criadoEm))
    .reverse();

  return (
    <>
      <Header />
      <main className="forum-content">
        <div className="topics-grid">
          {sortedTopicos.map(topico => (
            <TopicCard
              key={topico.idTopico}
              {...topico}
              criadoEm={format(parseISO(topico.criadoEm), "d 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default ForumPage;



