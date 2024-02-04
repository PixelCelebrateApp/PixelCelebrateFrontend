import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/login/login-page.js";
import ViewProfilePage from "./pages/profile/view-profile-page.js";
import UsersPage from "./pages/users/users-page.js";
import NavigationBar from "./components/navigation/navigation-bar.js";
import AdminPage from "./pages/admin/admin-page.js";

export const AppContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== null) {
      setIsLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn")));
    }
    if (localStorage.getItem("isAdmin") !== null) {
      setIsAdmin(JSON.parse(localStorage.getItem("isAdmin")));
    }
  }, []);

  return (
    <AppContext.Provider
      value={{ isAdmin, isLoggedIn, setIsLoggedIn, setIsAdmin }}
    >
      <div>
        <Router>
          <NavigationBar />
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/profile" element={<ViewProfilePage />} />
            <Route exact path="users" element={<UsersPage />} />
            <Route exact path="/admin" element={<AdminPage />} />
          </Routes>
        </Router>
      </div>
    </AppContext.Provider>
  );
}

export default App;
