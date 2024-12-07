
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import TopicPage from '../Pages/TopicPage'
// import ForumProvider from '../Context/Dados';
// import Login from '../Pages/Login';
// import ForumHome from '../Pages/FormHome';
// import CategoryTopics from '../Pages/CategoryTopics';
// import TopicDetail from '../Pages/TopicDetails';
// import Cadastro from '../Pages/Cadastro';
// import UserInfoScreen from '../Pages/UserPage/UserPage';
// import UserProfile from '../Pages/UserProfile/UserProfile';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function App() {
//   return (
//     <Router>
//       <ForumProvider>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/cadastro" element={<Cadastro />} />
//           <Route path="/home" element={<ForumHome />} />
//           <Route path="/category/:categoryId" element={<CategoryTopics />} />
//           <Route path="/topic" element={<TopicPage />} />
//           <Route path="/topic/:idTopico" element={<TopicDetail />} />
//           <Route path="/user" element={<UserInfoScreen />} />
//           <Route path="/user/:idUsuario" element={<UserProfile />} />
//         </Routes>
//         <ToastContainer 
//           position="top-right"
//           autoClose={5000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="light"
//         />
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
import UserInfoScreen from '../Pages/UserPage/UserPage';
import AccountActivationPending from '../Components/PendenteAtivacao/PendenteAtivacao';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProfile from '../Pages/UserProfile/UserProfile';
import PasswordChangeRequest from '../Pages/AlterarSenha/AlterarSenha';

function App() {
  return (
    <Router>
      <ForumProvider>
        <Routes>
        <Route path="/user/:idUsuario" element={<UserProfile />} />
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/home" element={<ForumHome />} />
          <Route path="/category/:categoryId" element={<CategoryTopics />} />
          <Route path="/topic" element={<TopicPage />} />
          <Route path="/topic/:idTopico" element={<TopicDetail />} />
          <Route path="/user" element={<UserInfoScreen />} />
          <Route path="/account-activation-pending" element={<AccountActivationPending />} />
          <Route path="/solicitar-alteracao-senha" element={<PasswordChangeRequest />} />

        </Routes>
        <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </ForumProvider>
    </Router>
  );
}

export default App;


