import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SiteProvider } from '../Context/SiteContext';
import { Header } from '../Components/Header';
import { Hero } from '../Components/Hero';
// import { About } from '../Components/About';
import AdminPage from '../Pages/Admin';

// Página inicial que combina todos os componentes
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
          <Route path="/admin" element={<AdminPage />} />
          {/* Adicione mais rotas conforme necessário */}
        </Routes>
      </BrowserRouter>
    </SiteProvider>
  );
}

export default App;

