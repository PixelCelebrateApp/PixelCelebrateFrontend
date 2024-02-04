import React, { useContext } from "react";
import "../../index.css";
import { Nav, Navbar, NavbarBrand, NavLink } from "reactstrap";
import logo from "../../logo.svg";
import { AppContext } from "../../App.js";
import "./navigation-bar.css";
import { useNavigate } from "react-router-dom";

function NavigationBar() {
  const { isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } =
    useContext(AppContext);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);

    localStorage.removeItem("isAdmin");
    setIsAdmin(false);

    localStorage.removeItem("loggedUser");
    navigate("/");
  }

  return (
    <div>
      {isLoggedIn && (
        <>
          <Navbar className="navbar-style" expand="md">
            <NavbarBrand>
              <img src={logo} width={"38vmax"} height={"38vmax"} alt={"logo"} />
            </NavbarBrand>
            <Nav className="me-auto" navbar>
              <NavLink href="/profile" className="navLinks navbar-text-style">
                Profile
              </NavLink>

              <NavLink href="/users" className="navLinks navbar-text-style">
                Users
              </NavLink>
              {isAdmin && (
                <>
                  <NavLink href="/admin" className="navLinks navbar-text-style">
                    Admin
                  </NavLink>
                </>
              )}
            </Nav>
            <Nav>
              <NavLink
                href="/"
                className="navLinks navbar-text-style"
                onClick={logout}
              >
                Logout
              </NavLink>
            </Nav>
          </Navbar>
        </>
      )}
    </div>
  );
}

export default NavigationBar;
