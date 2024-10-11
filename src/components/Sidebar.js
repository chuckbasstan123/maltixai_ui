import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      style={{
        width: isCollapsed ? '60px' : '250px', // Collapse to 60px, expand to 250px
        transition: 'width 0.3s ease',
        backgroundColor: '#f8f9fa',
        height: '100%',
        borderRight: '1px solid #ccc',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        padding: isCollapsed ? '10px' : '20px',
      }}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        style={{
          position: 'absolute',
          top: '10px',
          right: isCollapsed ? '-15px' : '-25px',
          width: '30px',
          height: '30px',
          backgroundColor: '#00c875',
          border: 'none',
          color: '#fff',
          borderRadius: '50%',
          cursor: 'pointer',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isCollapsed ? '>' : '<'}
      </button>

      {/* Sidebar Navigation Items */}
      <Nav vertical style={{ opacity: isCollapsed ? 0 : 1, transition: 'opacity 0.3s ease' }}>
        <NavItem style={{ display: isCollapsed ? 'none' : 'block' }}>
          <NavLink href="/my-work">My Work</NavLink>
        </NavItem>
        <NavItem style={{ display: isCollapsed ? 'none' : 'block' }}>
          <NavLink href="/favorites">Favorites</NavLink>
        </NavItem>
        <NavItem style={{ display: isCollapsed ? 'none' : 'block' }}>
          <NavLink href="/workspace">Main Workspace</NavLink>
        </NavItem>
      </Nav>
    </div>
  );
}
