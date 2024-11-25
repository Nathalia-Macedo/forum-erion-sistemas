



// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// function App() {
//   return (
//     <Router>
//       <ForumProvider>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/home" element={<ForumHome />} />
//           <Route path="/category/:categoryId" element={<CategoryTopics />} />
//           <Route path="/topic/:idTopico" element={<TopicDetail />} />
//         </Routes>
//       </ForumProvider>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopicPage from '../Pages/TopicPage'
import ForumProvider from '../Context/Dados';
import Login from '../Pages/Login';
import ForumHome from '../Pages/FormHome';
import CategoryTopics from '../Pages/CategoryTopics';
import TopicDetail from '../Pages/TopicDetails';
import Cadastro from '../Pages/Cadastro';


function App() {
  return (
    <Router>
      <ForumProvider>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
           <Route path="/home" element={<ForumHome />} />
           <Route path="/category/:categoryId" element={<CategoryTopics />} />
          <Route path="/" element={<TopicPage />} />
          <Route path="/topic/:idTopico" element={<TopicDetail />} />
        </Routes>
      </ForumProvider>
    </Router>
  );
}

export default App;

