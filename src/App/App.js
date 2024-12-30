import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SiteProvider } from '../Context/SiteContext';
import { Header } from '../Components/Header';
import { Hero } from '../Components/Hero';
// import { About } from './components/About';
import AdminPage from '../Pages/Admin';
import { Login } from '../Pages/Login';
import { ProtectedRoute } from '../Context/ProtectedRoute';

function Home() {
  return (
    <>
      <Header />
      <Hero />
      {/* Outros componentes da landing page */}
    </>
  );
}

function App() {
  return (
    <SiteProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </SiteProvider>
  );
}

export default App;

