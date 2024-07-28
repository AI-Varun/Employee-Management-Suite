
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import Signup from './Components/Signup';
import WelcomePage from './Components/WelcomePage';
import Header from './Components/Header';
import EmployeeList from './Components/EmployeeList';
import EmployeeForm from './Components/EmployeeForm';
const App = () => {
  const user = localStorage.getItem("token");
  const userName = localStorage.getItem("username");
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {!user && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate replace to="/login" />} />
          </>
        )}

        {user && (
          <>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/employee-list" element={<EmployeeList />} />
            <Route path="/create-employee" element={<EmployeeForm />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
