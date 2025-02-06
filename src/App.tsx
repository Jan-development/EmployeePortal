/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import {
  BrowserRouter as Router, Routes, Route, Navigate
} from "react-router-dom";
import EmployeeTable from "./Components/EmployeeTable/EmployeeTable";
import { AuthProvider, useAuth } from "./Context/AuthContext";
import Login from "./Pages/Login";
import ProtectedRoute from "./Routes/ProtectedRoute";
import Navbar from "./Components/Navbar/Navbar";

// Redirect based on authentication status
const AuthRedirect: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/tasks" replace /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<AuthRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/tasks" element={<EmployeeTable />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
