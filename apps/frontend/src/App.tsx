import React from 'react';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './context/AuthContext';
import Header from './components/header';
import Footer from './components/footer';

function App() {
  return (
    <>
      <UserProvider>
        <Header />
        <Outlet />
        <ToastContainer />
        <Footer />
      </UserProvider>
    </>
  );
}

export default App;
