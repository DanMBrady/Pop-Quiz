import React, { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { logout } from "../../modules/authManager";
import logo from"../photos/logo.png"
import "./Header.css"

export default function Header({ isLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="headerColor" dark={true} light expand="md">
        <NavbarBrand >
          Pop Quiz
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
          
            {isLoggedIn && (
              <NavItem>
                <NavLink tag={RRNavLink} to="/">
                 Quizzes
                </NavLink>
              </NavItem>
            )}
            {isLoggedIn && (
              <NavItem>
                <NavLink tag={RRNavLink} to="/newQuiz">
                New Quiz
                </NavLink>
              </NavItem>
            )}
            {isLoggedIn && (
              <NavItem>
                <NavLink tag={RRNavLink} to="/profile">
                My Profile
                </NavLink>
              </NavItem>
            )}

          </Nav>
          <Nav navbar>
            {isLoggedIn && (
              <>
                <NavItem>
          
                    <NavLink tag={RRNavLink} to="/login"
                     aria-current="page"
                     className="nav-link"
                     style={{ cursor: "pointer" }}
                     onClick={logout}>
                    Logout
                    </NavLink>
                 
                </NavItem>
              </>
            )}
            {!isLoggedIn && (
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">
                    Register
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}