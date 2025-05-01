import React, { useState } from 'react';
import './App.css';
import { sections } from './data/products'; // Importa os dados de sections

const App: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  // Adicionamos um estado para simular a visualização de um produto específico
  const [selectedProduct, setSelectedProduct] = useState<null | {
    id: number;
    name: string;
    model?: string;
    color?: string;
    size?: string;
    price: string;
    imageUrl: string;
    hoverImages?: string[];
  }>(null);
  
  // Novo estado para controlar os itens no carrinho
  const [cartItems, setCartItems] = useState<{
    id: number;
    name: string;
    price: string;
    quantity: number;
  }[]>([]);

  // Função para adicionar item ao carrinho
  const addToCart = (product: {id: number; name: string; price: string}) => {
    // Verifica se o produto já está no carrinho
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      // Se já estiver, aumenta a quantidade
      setCartItems(cartItems.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      // Se não estiver, adiciona com quantidade 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

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
  
  // Função para voltar da página de detalhes do produto
  const handleBackToHome = () => {
    setSelectedProduct(null);
  };

  // Calcula o total de itens no carrinho
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Simula a página de detalhes do produto quando um produto é selecionado
  if (selectedProduct) {
    return (
      <div className="app">
        <header className="header">
          <div className="left-side">
            <div className="brand">Lanay Modas</div>
          </div>

          <div className="icons">
            {/* Ícone voltar */}
            <button onClick={handleBackToHome} className="back-button">
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            
            {/* Ícone Carrinho com contador */}
            <div className="cart-icon-container">
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
              </svg>
              {totalCartItems > 0 && <span className="cart-counter">{totalCartItems}</span>}
            </div>
          </div>
        </header>

        <main className="main product-details-page">
          <div className="product-details-container">
            <div className="product-images-gallery">
              <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="product-main-image" />
              {/* Miniatura das imagens adicionais, se existirem */}
              {selectedProduct.hoverImages && (
                <div className="product-thumbnails">
                  {selectedProduct.hoverImages.map((img, index) => (
                    <img key={index} src={img} alt={`${selectedProduct.name} view ${index + 1}`} className="product-thumbnail" />
                  ))}
                </div>
              )}
            </div>
            <div className="product-info">
              <h1 className="product-title">{selectedProduct.name}</h1>
              <p className="product-model-info">Modelo: {selectedProduct.model || 'Padrão'}</p>
              <p className="product-color-info">Cor: {selectedProduct.color || 'Única'}</p>
              <p className="product-size-info">Tamanho disponível: {selectedProduct.size || 'P/M/G'}</p>
              <p className="product-price-info">R${selectedProduct.price}</p>
              <button 
                className="add-to-cart-button"
                onClick={() => addToCart({
                  id: selectedProduct.id,
                  name: selectedProduct.name,
                  price: selectedProduct.price
                })}
              >
                Adicionar ao Carrinho
              </button>
              <div className="product-description">
                <h3>Descrição do Produto</h3>
                <p>Este produto faz parte da nossa exclusiva coleção Lanay Modas. Peça de alta qualidade e design moderno, ideal para diversas ocasiões.</p>
              </div>
            </div>
          </div>
        </main>

        <footer className="footer">
          <div className="contact">Entre em contato: contato@lanaymodas.com</div>
          <div className="copyright">© 2025 Lanay Modas. Todos os direitos reservados.</div>
        </footer>
      </div>
    );
  }

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
              <button onClick={() => setSearchOpen(true)} className="search-button">
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="icons">
          {/* Ícone Loja */}
          <svg className="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2h-4a2 2 0 01-2-2V12H9v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>

          {/* Ícone Carrinho com contador */}
          <div className="cart-icon-container">
            <svg className="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
            </svg>
            {totalCartItems > 0 && <span className="cart-counter">{totalCartItems}</span>}
          </div>

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
                  <ProductCard 
                    product={product} 
                    onViewDetails={() => setSelectedProduct(product)}
                    onAddToCart={() => addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price
                    })}  
                  />
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
  onViewDetails: () => void; // Prop para lidar com o clique em "Ver detalhes"
  onAddToCart: () => void;   // Nova prop para adicionar ao carrinho
}

// Componente de card de produto modificado para ter botões "Ver detalhes" e "Adicionar ao Carrinho"
const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails, onAddToCart }) => {
  /* 
   * Adicionamos um botão "Adicionar ao Carrinho" ao lado do botão "Ver detalhes"
   * e implementamos um contador no ícone do carrinho para mostrar quantos itens foram adicionados.
   */
  return (
    <div className="product-image-container">
      <div className="product-image-wrapper">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
        />
      </div>

      <div className="product-details">
        <p className="product-name">{product.name}</p>
        <p className="product-price">R${product.price}</p>
        <div className="product-actions">
          <button 
            className="view-details-button"
            onClick={onViewDetails}
          >
            Ver detalhes
          </button>
          <button 
            className="add-to-cart-button-small"
            onClick={onAddToCart}
          >
            +🛒
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;