import React, { useState } from 'react';
import './App.css';
import { sections } from './data/products'; // Importa os dados de sections

const App: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
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
              <button onClick={() => setSearchOpen(true)}>🔍</button>
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
        {sections.map((section) => (
          <section key={section.title} className="product-section">
            <h2 className="section-title">{section.title}</h2>
            <div className="product-grid">
              {section.products.map((product) => (
                <div key={product.id} className="product-card">
                  <ProductCard product={product} />
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

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    model?: string;
    color?: string;
    size?: string;
    price: string;
    imageUrl: string;
    hoverImages?: string[];
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [hovering, setHovering] = useState(false);
  const hoverImage = hovering && product.hoverImages ? product.hoverImages[0] : product.imageUrl;

  return (
    <div
      className="product-image-container"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="product-image-wrapper">
        {/* A imagem de hover troca suavemente com a imagem normal */}
        <img
          src={hoverImage}
          alt={product.name}
          className="product-image"
          style={{ opacity: hovering ? 1 : 1, transition: 'opacity 0.3s ease' }} // Controle da transição de opacidade
        />
      </div>

      <div className={`product-details ${hovering ? 'hover' : ''}`}>
        <p className="product-name">{product.name}</p>
        {hovering && (
          <>
            <p className="product-model">Modelo: {product.model || 'Desconhecido'}</p>
            <p className="product-color">Cor: {product.color || 'Desconhecida'}</p>
            <p className="product-size">Tamanho: {product.size || 'P/M/G'}</p>
            <p className="product-price">Por apenas R${product.price}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
