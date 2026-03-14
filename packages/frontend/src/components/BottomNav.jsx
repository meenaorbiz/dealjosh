import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/dashboard', icon: '🏠' },
    { label: 'Deals', path: '/my-deals', icon: '🏷️' },
    { label: 'Profile', path: '/settings', icon: '👤' }
  ];

  return (
    <nav className="dj-bottom-nav">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;