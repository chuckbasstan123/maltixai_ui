import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default function TopNavBar() {
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">LawyerOneStop</NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/my-work">My Work</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/search">Search</NavLink>
        </NavItem>
        {/* Add other items as necessary */}
      </Nav>
    </Navbar>
  );
}
