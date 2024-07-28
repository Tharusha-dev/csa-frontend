import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from "../src/pages/loginPage"
import SignupPage from './pages/signupPage';
import { AuthProvider } from './auth/authContext';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <SignupPage />
        <LoginPage />
      </div>
    </AuthProvider>

  );
}

export default App;
