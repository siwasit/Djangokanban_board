import { HashRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import IndexPage from "./pages";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ProjectPage from "./pages/project";
import UserContext from "./userContext";
import TaskManagement from "./pages/cardmanage";

function App() {
  const [userData, setUserData] = useState(() => {
    // Try to get userData from localStorage on initial load
    const storedUserData = localStorage.getItem('userData');
    return storedUserData ? JSON.parse(storedUserData) : null;
  });

  useEffect(() => {
    // Save userData to localStorage whenever it changes
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  const handleLoginSuccess = (data) => {
    // Store the user data after successful login
    setUserData(data);
  };

  return (
    <UserContext.Provider value={{ userData, handleLoginSuccess }}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<IndexPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/authorize" element={<RegisterPage />}></Route>
          <Route path="/project" element={<ProjectPage />}></Route>
          <Route path="/project/:proj_id" element={<TaskManagement />} />
        </Routes>
      </HashRouter>
    </UserContext.Provider>
  );
}

export default App;
