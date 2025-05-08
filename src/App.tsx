import { useState, useEffect } from 'react';
import './App.css';
import CustomAddToCartButton from './CustomAddToCartButton';
import { BadgeCheck } from 'lucide-react';
import { toast } from 'sonner';
// Interfaces
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  description?: string;
  colors?: string[];
  sizes?: string[];
  reference?: string;
  additionalImages?: string[];
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  selectedSize?: string;
  selectedColor?: string;
}

// Dados dos produtos
const mockProducts: Product[] = [
  // Blusas
  {
    id: 1,
    name: "BLUSA ACETINADA COM RENDA",
    category: "Blusas",
    price: 399.00,
    imageUrl: "./images/blusa1.jpg",
    description: "Blusa confeccionada em fiação de 100 % viscose. gola com lapela e manga comprida com punho. Detalhe de faixas laterais com aplique de renda do mesmo tom combinando.",
    colors: ["Bege", "Preto", "Rosa"],
    sizes: ["P", "M", "G"],
    reference: "BL001",
    additionalImages: [
      "./images/blusa1detalhes1.jpg",
      "./images/blusa1detalhes2.jpg",
      "./images/blusa1detalhes3.jpg"
    ]
  },
  {
    id: 2,
    name: "BLUSA COM BORDADOS",
    category: "Blusas",
    price: 300.00,
    imageUrl: "./images/blusa2.jpg",
    description: "Blusa com gola alta e sem mangas. Detalhe de bordados do mesmo tom combinando. Fecho atrás com abertura e botões.",
    colors: ["Branco", "Verde", "Bege"],
    sizes: ["P", "M", "G", "GG"],
    reference: "BL002",
    additionalImages: [
      "./images/blusa2detalhes1.jpg",
      "./images/blusa2detalhes2.jpg",
      "./images/blusa2detalhes3.jpg"
    ]
  },
  {
    id: 3,
    name: "COLETE CURTO COM A BARRA ELÁSTICA",
    category: "Blusas",
    price: 269.00,
    imageUrl: "./images/blusa3.jpg",
    description: "Colete de gola redonda e sem mangas. Bolsos frontais de patch com aba. Bainha ajustável com cordões elásticos. Fecho frontal com botões de pressão.",
    colors: ["Marrom", "Amarelo", "Cinza"],
    sizes: ["PP", "P", "M", "G"],
    reference: "BL003",
    additionalImages: [
      "./images/blusa3detalhes1.jpg",
      "./images/blusa3detalhes2.jpg",
      "./images/blusa3detalhes3.jpg"
    ]
  },
  
  // Calças
  {
    id: 4,
    name: "CALÇA DE CINTURA ALTA",
    category: "Calças",
    price: 269.00,
    imageUrl: "./images/calca1.jpg",
    description: "Calça de cintura alta com detalhe de costuras marcadas na frente e atrás. Bolsos frontais de linha viva. fecho frontal de ziper, botão interior e gancho metálico.",
    colors: ["Cinza", "Azul Marinho"],
    sizes: ["36", "38", "40", "42", "44"],
    reference: "CA001",
    additionalImages: [
      "./images/calca1detalhes1.jpg",
      "./images/calca1detalhes2.jpg",
      "./images/calca1detalhes3.jpg"
    ]
  },
  {
    id: 5,
    name: "CALÇA COM PREGAS",
    category: "Calças",
    price: 220.99,
    imageUrl: "./images/calca2.jpg",
    description: "Calça de cintura média com presilhas. Bolsos laterais e com abertura debruada atrás. Detalhe de pinças na frente. fecho frontal com zíper, botão e gancho metálico.",
    colors: ["Marrom", "Preto", "Azul Claro"],
    sizes: ["34", "36", "38", "40", "42"],
    reference: "CA002",
    additionalImages: [
      "./images/calca2detalhes1.jpg",
      "./images/calca2detalhes2.jpg",
      "./images/calca2detalhes3.jpg"
    ]
  },
  {
    id: 6,
    name: "CALÇA JEANS",
    category: "Calças",
    price: 250.00,
    imageUrl: "./images/calca3.jpg",
    description: "Jeans de cintura alta com cinco bolsos. Efeito de lavagem. pernas retas e parte inferior com acabamento sem costura. Ziper e botão a frente.",
    colors: ["Preto", "Cinza", "Roxo"],
    sizes: ["P", "M", "G"],
    reference: "CA003",
    additionalImages: [
      "./images/calca3detalhes1.jpg",
      "./images/calca3detalhes2.jpg",
      "./images/calca3detalhes3.jpg"
    ]
  },
  
  // Shorts
  {
    id: 7,
    name: "SHORT DENIM TRF",
    category: "Shorts",
    price: 199.00,
    imageUrl: "./images/short1.jpg",
    description: "Short de cintura alta com cinco bolsos. Bainha com dobra. Fecho frontal com botões metálicos.",
    colors: ["Cinza", "Preto", "Branco"],
    sizes: ["36", "38", "40", "42"],
    reference: "SH001",
    additionalImages: [
      "./images/short1detalhes1.jpg",
      "./images/short1detalhes2.jpg",
      "./images/short1detalhes3.jpg"
    ]
  },
  {
    id: 8,
    name: "SHORT-SAIA CURTO COM ABERTURAS",
    category: "Shorts",
    price: 250.00,
    imageUrl: "./images/short2.jpg",
    description: "Short-saia confeccionado com fiação 100% algodão. cintura média e com presilhas. Bolsos laterais falsos e de patch atrás.",
    colors: ["Verde","Preto", "Bege"],
    sizes: ["P", "M", "G"],
    reference: "SH002",
    additionalImages: [
      "./images/short2detalhes1.jpg",
      "./images/short2detalhes2.jpg",
      "./images/short2detalhes3.jpg"
    ]
  },
  {
    id: 9,
    name: "SHORT DENIM TRF DOBRADO COM RASGOS",
    category: "Shorts",
    price: 199.00,
    imageUrl: "./images/short3.jpg",
    description: "Short de cintura alta com cinco bolsos. Detalhe de rasgos. Bainha com acabamento em dobra e desfiado. fecho frontal com ziper e botão metálico.",
    colors: ["Branco", "Cinza", "Rosa"],
    sizes: ["P", "M", "G"],
    reference: "SH003",
    additionalImages: [
      "./images/short3detalhes1.jpg",
      "./images/short3detalhes2.jpg",
      "./images/short3detalhes3.jpg"
    ]
  },
  
  // Vestidos
  {
    id: 10,
    name: "VESTIDO DE TULE COM FRANZIDOS",
    category: "Vestidos",
    price: 270.00,
    imageUrl: "./images/vestido1.jpg",
    description: "Vestido midi de gola alta e sem mangas. Detalhes franzidos. Parte inferior com acabamento assimétrico. Forro interior combinado.",
    colors: ["Marrom", "Preto", "Azul Royal"],
    sizes: ["P", "M", "G"],
    reference: "VE001",
    additionalImages: [
      "./images/vestido1detalhes1.jpg",
      "./images/vestido1detalhes2.jpg",
      "./images/vestido1detalhes3.jpg"
    ]
  },
  {
    id: 11,
    name: "VESTIDO CURTO COM LANTEJOULAS",
    category: "Vestidos",
    price: 500.00,
    imageUrl: "./images/vestido2.jpg",
    description: "Vestido curto de gola redonda e sem mangas. Detalhe de aplique de lantejoulas. Fecho nas costas com ziper oculto na costura.",
    colors: ["Preto", "Bege", "Verde"],
    sizes: ["P", "M", "G", "GG"],
    reference: "VE002",
    additionalImages: [
      "./images/vestido2detalhes1.jpg",
      "./images/vestido2detalhes2.jpg",
      "./images/vestido2detalhes3.jpg"
    ]
  },
  {
    id: 12,
    name: "VESTIDO COM OMBROS DESCOBERTOS",
    category: "Vestidos",
    price: 299.00,
    imageUrl: "./images/vestido3.jpg",
    description: "Vestido curto de decote reto e ombros descobertos. Detalhes de abas na frente. Forro interior tipo short. Fecho atrás com zíper oculto na costura.",
    colors: ["Vermelho", "Listrado", "Azul"],
    sizes: ["P", "M", "G"],
    reference: "VE003",
    additionalImages: [
      "./images/vestido3detalhes1.jpg",
      "./images/vestido3detalhes2.jpg",
      "./images/vestido3detalhes3.jpg"
    ]
  }
];

// Componente App principal
function App() {
  // Estados
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [finished, setFinished] = useState(false);


  // Carregar produtos
  useEffect(() => {
    setIsLoading(true);
    
    // Simulando uma API
    setTimeout(() => {
      setProducts(mockProducts);
      
      // Extrair categorias únicas
      const uniqueCategories = ['Todos', ...Array.from(new Set(mockProducts.map(product => product.category)))];
      setCategories(uniqueCategories);
      
      setIsLoading(false);
    }, 600);
  }, []);

  // Função para selecionar um produto e ver detalhes
  const viewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setSelectedImage(null); // Reset a imagem selecionada
    setSelectedSize(product.sizes ? product.sizes[0] : '');
    setSelectedColor(product.colors ? product.colors[0] : '');
  };

  // Filtrar produtos por categoria
  const filteredProducts = activeCategory === 'Todos'
    ? products
    : products.filter(product => product.category === activeCategory);

  // Função para adicionar ao carrinho
  const addToCart = (product: Product) => {
    // Verifica se estamos na página de detalhes do produto ou na página principal
    if (selectedProduct) {
      // Na página de detalhes: use o tamanho/cor que o usuário selecionou
      const existingItem = cartItems.find(item => 
        item.id === product.id && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
      );
      
      if (existingItem) {
        // Se já existe com esse tamanho/cor, apenas atualize a quantidade
        updateQuantity(existingItem.id, existingItem.selectedSize, existingItem.selectedColor, existingItem.quantity + 1);
        toast.success('Quantidade atualizada no carrinho!');
      } else {
        // Se não, adicione um novo item ao carrinho com o tamanho/cor selecionados
        setCartItems(prevItems => [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            imageUrl: product.imageUrl,
            selectedSize: selectedSize,
            selectedColor: selectedColor,
          }
        ]);
        toast.success('Produto adicionado ao carrinho!');
      }
    } else {
      // Na página principal: adicione com tamanho/cor padrão e deixe o usuário escolher depois
      // Primeiro verifica se já existe algum item desse produto no carrinho (independente do tamanho)
      const existingItemAnySize = cartItems.find(item => item.id === product.id);
      
      if (!existingItemAnySize) {
        // Adicione o produto com tamanho/cor padrão que serão escolhidos depois
        setCartItems(prevItems => [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            imageUrl: product.imageUrl,
            selectedSize: product.sizes ? product.sizes[0] : '',
            selectedColor: product.colors ? product.colors[0] : '',
          }
        ]);
        toast.success('Produto adicionado ao carrinho!');
      } else {
        // Se já existe, apenas atualize a quantidade do item existente
        updateQuantity(existingItemAnySize.id, existingItemAnySize.selectedSize, existingItemAnySize.selectedColor, existingItemAnySize.quantity + 1);
        toast.success('Quantidade atualizada no carrinho!');
      }
    }
    
    // Abre o carrinho após adicionar o produto
    setIsCartOpen(true);
  };
 
  // Função para remover do carrinho - corrigida para aceitar undefined
  const removeFromCart = (productId: number, size: string | undefined, color: string | undefined) => {
    setCartItems(prevItems => prevItems.filter(item => 
      !(item.id === productId && 
        item.selectedSize === size && 
        item.selectedColor === color)
    ));
  };

  // Função para atualizar quantidade - corrigida para aceitar undefined
  const updateQuantity = (productId: number, size: string | undefined, color: string | undefined, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId && 
        item.selectedSize === size && 
        item.selectedColor === color
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };

  // Total de itens no carrinho
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo" onClick={() => {
            setActiveCategory('Todos')
            setSelectedProduct(null)
            setIsLoginOpen(false)
          }}>
            <h1>Lanay Modas</h1>
          </div>
          
          <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          
          <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
            <ul>
              {categories.map(category => (
                <li key={category}>
                  <button 
                    className={activeCategory === category ? 'active' : ''}
                    onClick={() => {
                      setActiveCategory(category);
                      setIsMenuOpen(false);
                      setIsLoginOpen(false);
                    }}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="header-actions">
            <button className="cart-button" onClick={() => setIsCartOpen(true)} title="Carrinho">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
            </button>
            <button className="icon-button user-button" title="Minha Conta" onClick={() => {
              setSelectedProduct(null) 
              setIsLoginOpen(true)
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="main-content">
        {selectedProduct ? 
          (
            /* Product Detail Page */
            <div className="product-detail-page">
              <button className="back-button" onClick={() => setSelectedProduct(null)}>
                ← Voltar
              </button>
              
              <div className="product-detail">
                <div className="product-gallery">
                  <img 
                    src={selectedImage || selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                    className="product-main-image"
                  />
                  
                  {selectedProduct.additionalImages && (
                    <div className="product-thumbnails">
                      {/* Miniatura da imagem principal */}
                      <img 
                        src={selectedProduct.imageUrl}
                        alt={`${selectedProduct.name} - principal`}
                        className={`product-thumbnail ${selectedImage === null ? 'active' : ''}`}
                        onClick={() => setSelectedImage(null)}
                      />
                      
                      {/* Miniaturas das imagens adicionais */}
                      {selectedProduct.additionalImages.map((img, index) => (
                        <img 
                          key={index}
                          src={img}
                          alt={`${selectedProduct.name} - detalhe ${index + 1}`}
                          className={`product-thumbnail ${selectedImage === img ? 'active' : ''}`}
                          onClick={() => setSelectedImage(img)}
                        />
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="product-info">
                  <h1 className="product-title">{selectedProduct.name}</h1>
                  <p className="product-price">
                    {selectedProduct.price.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </p>
                  
                  <div className="product-description">
                    <p>{selectedProduct.description}</p>
                  </div>
                  
                  {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                    <div className="product-sizes">
                      <h3>Tamanhos</h3>
                      <div className="size-options">
                        {selectedProduct.sizes.map(size => (
                          <button 
                            key={size} 
                            className={`size-option ${selectedSize === size ? 'active' : ''}`}
                            onClick={() => setSelectedSize(size)}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                    <div className="product-colors">
                      <h3>Cores</h3>
                      <div className="color-options">
                        {selectedProduct.colors.map(color => (
                          <button 
                            key={color} 
                            className={`color-option ${selectedColor === color ? 'active' : ''}`}
                            onClick={() => setSelectedColor(color)}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <CustomAddToCartButton onClick={() => addToCart(selectedProduct)} />
                </div>
              </div>
            </div>
          ) : isLoginOpen ? (
            <section className="account-section">
              <h2>Entrar na sua conta</h2>
              <div className="account-form">
                <input
                  type="text"
                  placeholder="Usuário"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />

                <button className="login-button">
                  Entrar
                </button>
              </div>
            </section>
          ) : (
            /* Product Grid */
            <div className="products-grid">
              {isLoading ? (
                <div className="loading">Carregando produtos...</div>
              ) : (
                <>
                  <h2 className="category-title">{activeCategory}</h2>
                  <div className="product-list">
                    {filteredProducts.map(product => (
                      <div key={product.id} className="product-card">
                        <div 
                          className="product-image" 
                          onClick={() => viewProductDetails(product)}
                        >
                          <img src={product.imageUrl} alt={product.name} />
                          <div className="product-overlay">
                            <button className="view-details">Ver detalhes</button>
                          </div>
                        </div>
                        <div className="product-info">
                          <h3 className="product-title">{product.name}</h3>
                          <p className="product-price">
                            {product.price.toLocaleString('pt-BR', {
                              style: 'currency', 
                              currency: 'BRL'
                            })}
                          </p>
                          <CustomAddToCartButton onClick={() => addToCart(product)} />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
      </main>
      
      {/* Shopping Cart */}
      {isCartOpen && (
        <div className="cart-overlay">
          <div className="cart-content">
            <div className="cart-header">
              <h2>Seu Carrinho</h2>
              <button className="close-cart" onClick={() => {
                setIsCartOpen(false)
                setFinished(false)
              }}>
                ×
              </button>
            </div>
            
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <p>Seu carrinho está vazio</p>
                <button 
                  className="continue-shopping"
                  onClick={() => setIsCartOpen(false)}
                >
                  Continuar Comprando
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cartItems.map(item => {
                    const product = products.find(product => product.id === item.id);

                    return (
                      <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="cart-item">
                        <img src={item.imageUrl} alt={item.name} />
                        <div className="item-details">
                          <h3>{item.name}</h3>
                          <p className="item-price">
                            {item.price.toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            })}
                          </p>
                          
                          {/* Seleção de tamanho com destaque visual */}
                          {product?.sizes && product.sizes.length > 0 && (
                            <div className="item-size-selection">
                              <span className="item-size-label">Tamanho:</span>
                              <div className="size-options">
                                {product.sizes.map(size => (
                                  <button 
                                    key={size} 
                                    className={`size-option ${item.selectedSize === size ? 'active' : ''}`}
                                    onClick={() => {
                                      // Atualiza o tamanho do item no carrinho
                                      setCartItems(prevItems => 
                                        prevItems.map(cartItem => 
                                          cartItem.id === item.id && 
                                          cartItem.selectedColor === item.selectedColor && 
                                          cartItem.selectedSize === item.selectedSize
                                            ? { ...cartItem, selectedSize: size } 
                                            : cartItem
                                        )
                                      );
                                    }}
                                  >
                                    {size}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Seleção de cor */}
                          {product?.colors && product.colors.length > 0 && (
                            <div className="item-color-selection">
                              <span className="item-color-label">Cor:</span>
                              <select 
                                value={item.selectedColor}
                                onChange={(e) => {
                                  // Atualiza a cor do item no carrinho
                                  setCartItems(prevItems => 
                                    prevItems.map(cartItem => 
                                      cartItem.id === item.id && 
                                      cartItem.selectedColor === item.selectedColor && 
                                      cartItem.selectedSize === item.selectedSize
                                        ? { ...cartItem, selectedColor: e.target.value } 
                                        : cartItem
                                    )
                                  );
                                }}
                              >
                                {product.colors.map(color => (
                                  <option key={color} value={color}>{color}</option>
                                ))}
                              </select>
                            </div>
                          )}
                          
                          <div className="quantity-control">
                            <button 
                              onClick={() => updateQuantity(
                                item.id, 
                                item.selectedSize, 
                                item.selectedColor, 
                                item.quantity - 1
                              )}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQuantity(
                              item.id, 
                              item.selectedSize, 
                              item.selectedColor, 
                              item.quantity + 1
                            )}>
                              +
                            </button>
                          </div>
                        </div>
                        
                        <button 
                          className="remove-item"
                          onClick={() => removeFromCart(
                            item.id, 
                            item.selectedSize, 
                            item.selectedColor
                          )}
                        >
                          Remover
                        </button>
                      </div>
                    );
                  })}
                </div>
                
                <div className="cart-footer">
                  <div className="cart-total">
                    <span>Total:</span>
                    <span>
                      {cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
                        .toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })
                      }
                    </span>
                  </div>
                  
                  {!finished && (
                    <button className="checkout-button" onClick={() => {
                      setFinished(true)
                      toast.success('Compra finalizada com sucesso!')
                    }}>
                      Finalizar Compra
                    </button>
                  )}

                  {finished && (
                    <button className="done-button">
                      <BadgeCheck /> 
                      Compra finalizada
                    </button>
                  )}
                  
                  <button 
                    className="continue-shopping"
                    onClick={() => {
                      setIsCartOpen(false)
                      setFinished(false)
                    }}
                  >
                    Continuar Comprando
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Lanay Modas</h3>
            <p>Moda feminina com estilo e qualidade.</p>
          </div>
          
          <div className="footer-section">
            <h3>Links Rápidos</h3>
            <ul>
              <li><a href="#sobre">Sobre Nós</a></li>
              <li><a href="#termos">Termos e Condições</a></li>
              <li><a href="#politica">Política de Privacidade</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contato</h3>
            <p>Email: contato@lanaymodas.com</p>
            <p>Telefone: (11) 9999-9999</p>
          </div>
        </div>
        
        <div className="copyright">
          &copy; 2025 Lanay Modas. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}

export default App;