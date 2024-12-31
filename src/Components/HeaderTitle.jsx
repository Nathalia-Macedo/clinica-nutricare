import React from 'react';

const Header = ({ activeTab }) => {
  return (
    <header className="bg-white shadow-sm z-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-center">
        <h1 className="text-lg font-semibold text-gray-900">
          {activeTab === 'header' ? 'Configurações do Cabeçalho' : 'Gerenciar Slides'}
        </h1>
      </div>
    </header>
  );
};

export default Header;

