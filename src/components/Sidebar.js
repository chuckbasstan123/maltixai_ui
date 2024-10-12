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
