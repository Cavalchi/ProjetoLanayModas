import React, { useState } from 'react';
import './App.css';
import calca1 from './assets/calca1.jpg';
import calca2 from './assets/calca2.jpg';


interface Product {
  id: number;
  name: string;
  imageUrl: string;
}

interface Section {
  title: string;
  products: Product[];
}

const App: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const sections: Section[] = [
    {
      title: 'Blusas',
      products: [
        { id: 1, name: 'Blusa 1', imageUrl: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Blusa 2', imageUrl: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Blusa 3', imageUrl: 'https://via.placeholder.com/150' },
      ],
    },
    {
      title: 'Vestidos',
      products: [
        { id: 4, name: 'Vestido 1', imageUrl: 'https://via.placeholder.com/150' },
        { id: 5, name: 'Vestido 2', imageUrl: 'https://via.placeholder.com/150' },
        { id: 6, name: 'Vestido 3', imageUrl: 'https://via.placeholder.com/150' },
      ],
    },
    {
      title: 'Calças',
      products: [
        { id: 7, name: 'Calça 1', imageUrl: calca1 },
        { id: 8, name: 'Calça 2', imageUrl: calca2 },
      ],
    },
    {
      title: 'Bermudas',
      products: [
        { id: 9, name: 'Bermuda 1', imageUrl: 'https://via.placeholder.com/150' },
        { id: 10, name: 'Bermuda 2', imageUrl: 'https://via.placeholder.com/150' },
      ],
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simula busca por nome de produto
    const found = sections.some(section =>
      section.products.some(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    if (found) {
      alert(`Redirecionando para produto relacionado: ${searchQuery}`);
    } else {
      alert('Produto não encontrado.');
    }
    setSearchQuery('');
    setSearchOpen(false);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="left-side">
          <div className="brand">Lanay Modas</div>

          <div className="search-bar">
            {searchOpen ? (
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar produtos..."
                />
              </form>
            ) : (
              <button onClick={() => setSearchOpen(true)}>
                🔍
              </button>
            )}
          </div>
        </div>

        <div className="icons">
          {/* Ícone Loja */}
          <svg className="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2h-4a2 2 0 01-2-2V12H9v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>

          {/* Ícone Carrinho */}
          <svg className="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
          </svg>

          {/* Ícone Perfil */}
          <svg className="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 21v-2a4 4 0 00-3-3.87" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 21v-2a4 4 0 013-3.87" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      </header>

      <main className="main">
        {sections.map(section => (
          <section key={section.title} className="product-section">
            <h2>{section.title}</h2>
            <div className="product-grid">
              {section.products.map(product => (
                <div key={product.id} className="product-card">
                  <img src={product.imageUrl} alt={product.name} />
                  <p>{product.name}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      <footer className="footer">
        <div className="contact">Entre em contato: contato@lanaymodas.com</div>
        <div className="copyright">© 2025 Lanay Modas. Todos os direitos reservados.</div>
      </footer>
    </div>
  );
};

export default App;
