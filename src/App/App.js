// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from '../Pages/Login';
// import Cadastro from '../Pages/Cadastro';
// import './App.css'; // Importa o CSS geral para o App (caso tenha)
// import ForumHome from '../Pages/FormHome';
// import { ForumProvider } from '../Context/Dados';
// import ForumPage from '../Pages/TopicPage';
// function App() {
//   return (
//     <ForumProvider>
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<Login />} /> {/* Login na raiz */}
//           <Route path="/cadastro" element={<Cadastro />} /> {/* Cadastro em outra rota */}
//           <Route path="/home" element={<ForumHome/>}/>
//           <Route path="/forum" element={<ForumPage/>}/>
//         </Routes>
        
//       </div>
//     </Router>
//     </ForumProvider>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../Pages/Login';
import Cadastro from '../Pages/Cadastro';
import './App.css'; // Importa o CSS geral para o App (caso tenha)
import ForumHome from '../Pages/FormHome';
import { ForumProvider } from '../Context/Dados';
import ForumPage from '../Pages/TopicPage';
import CategoryTopics from '../Pages/CategoryTopics'; // Importe o novo componente

function App() {
  return (
    <ForumProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/home" element={<ForumHome />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/category/:categoryId" element={<CategoryTopics />} /> {/* Nova rota para CategoryTopics */}
          </Routes>
        </div>
      </Router>
    </ForumProvider>
  );
}

export default App;