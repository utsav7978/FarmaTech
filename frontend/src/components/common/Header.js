// components/common/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, LogOut, Home } from 'lucide-react';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <Home className="logo-icon" />
            FarmaTech
          </Link>
          
          <nav className="nav">
            {isAuthenticated() ? (
              <>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                <div className="user-menu">
                  <User className="user-icon" />
                  <span className="user-name">{user.name}</span>
                  <span className="user-role">({user.role})</span>
                  <button onClick={handleLogout} className="logout-btn">
                    <LogOut className="logout-icon" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/register" className="nav-link btn-primary">Register</Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;