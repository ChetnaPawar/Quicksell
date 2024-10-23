import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ grouping, sorting, onGroupingChange, onSortingChange }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="navbar">
      <div className="display-button" onClick={() => setShowMenu(!showMenu)}>
        <span className="button-icon">☰</span>
        <span>Display</span>
        <span className="button-icon">▼</span>
      </div>

      {showMenu && (
        <div className="display-menu">
          <div className="menu-item">
            <span>Grouping</span>
            <select 
              value={grouping}
              onChange={(e) => onGroupingChange(e.target.value)}
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="menu-item">
            <span>Ordering</span>
            <select 
              value={sorting}
              onChange={(e) => onSortingChange(e.target.value)}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;