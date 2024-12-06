import React, { useContext } from 'react';
import { User, LogOut, ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ForumContext } from '../../Context/Dados';

const SimplifiedHeader = ({ overrideBackNavigation }) => {
  const { logout } = useContext(ForumContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleUser = () => {
    navigate('/user');
  };

  const handleBack = () => {
    if (overrideBackNavigation) {
      overrideBackNavigation();
    } else if (location.pathname === '/user') {
      navigate('/home');
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="bg-[#0A0E45] p-5 flex justify-between items-center">
      <h1 className="text-white text-2xl font-semibold">ERION SISTEMAS</h1>
      <div className="flex space-x-4">
        <ArrowLeft 
          className="text-white cursor-pointer"
          onClick={handleBack}
        />
        {location.pathname !== '/user' && (
          <User
            className="text-white cursor-pointer"
            onClick={handleUser}
          />
        )}
        <LogOut
          className="text-white cursor-pointer"
          onClick={handleLogout}
        />
      </div>
    </header>
  );
};

export default SimplifiedHeader;

