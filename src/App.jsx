import React, { useState, useMemo } from "react";

export default function App() {
  const brand = {
    blue: "#0B6FFF",
    white: "#FFFFFF",
    gold: "#D4AF37",
    black: "#0B0B0B",
  };

  const initialProducts = [
    {
      id: "p1",
      title: "Relógio AstroLux",
      price: 799.0,
      category: "Relógios",
      img: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=7b8a3b7e6c4a2c3b6b9d1a7d1a3f2a2c",
      rating: 4.8,
    },
    {
      id: "p2",
      title: "Smartphone Nebula X",
      price: 3599.0,
      category: "Celulares",
      img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=9c7c1e6a0d2f6c4e8a2b0c3d4e5f6a7b",
      rating: 4.6,
    },
    {
      id: "p3",
      title: "Perfume Eclipse Noir",
      price: 249.9,
      category: "Perfumes",
      img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3d5b6b8c9f1a2b3c4d5e6f7a8b9c0d1e",
      rating: 4.7,
    },
    {
      id: "p4",
      title: "Relógio Celeste — Edição Lux",
      price: 1299.0,
      category: "Relógios",
      img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d",
      rating: 4.9,
    },
    {
      id: "p5",
      title: "Aurora Phone 12",
      price: 2199.0,
      category: "Celulares",
      img: "https://images.unsplash.com/photo-1510557880182-3a8353be9a6b?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e",
      rating: 4.5,
    },
    {
      id: "p6",
      title: "Perfume Luxx Signature",
      price: 329.0,
      category: "Perfumes",
      img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=7f6e5d4c3b2a1908f7e6d5c4b3a29108",
      rating: 4.4,
    },
  ];

  const [products] = useState(initialProducts);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [sort, setSort] = useState("relevance");

  const [cart, setCart] = useState({});
  const [isCartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(null);

  const categories = useMemo(() => ["Todas", ...Array.from(new Set(products.map((p) => p.category)))], [products]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "Todas" ? true : p.category === category;
      return matchesQuery && matchesCategory;
    });

    if (sort === "price-asc") list = list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list = list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [products, query, category, sort]);

  function addToCart(product, qty = 1) {
    setCart((c) => {
      const existing = c[product.id] || { ...product, qty: 0 };
      return { ...c, [product.id]: { ...existing, qty: existing.qty + qty } };
    });
  }

  function removeFromCart(productId) {
    setCart((c) => {
      const copy = { ...c };
      delete copy[productId];
      return copy;
    });
  }

  function changeQty(productId, qty) {
    setCart((c) => ({ ...c, [productId]: { ...c[productId], qty } }));
  }

  const cartItems = Object.values(cart);
  const cartTotal = cartItems.reduce((s, it) => s + it.price * it.qty, 0);

  function handleCheckout(info) {
    const order = {
      id: `ORD-${Math.floor(Math.random() * 900000) + 100000}`,
      items: cartItems,
      total: cartTotal,
      customer: info,
      date: new Date().toISOString(),
    };
    setOrderConfirmed(order);
    setCart({});
    setCheckoutOpen(false);
    setCartOpen(false);
  }

  function IconCart({ className = "w-6 h-6" }) {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 6m5-6v6m4-6v6m4-6l2 6" />
      </svg>
    );
  }

  return (
    <div style={{ background: `linear-gradient(180deg, ${brand.black} 0%, ${brand.blue} 40%, ${brand.white} 100%)` }} className="min-h-screen text-gray-800">
      <header className="backdrop-blur-sm bg-opacity-40" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full flex items-center justify-center" style={{ width: 56, height: 56, background: brand.white }}>
              <div style={{ width: 46, height: 46, borderRadius: 9999, background: brand.black, display: 'flex', alignItems: 'center', justifyContent: 'center', color: brand.gold, fontWeight: 800 }}>UL</div>
            </div>
            <div>
              <div className="text-white font-bold text-xl">Universo Luxx</div>
              <div className="text-sm text-gray-200">Relógios • Celulares • Perfumes</div>
            </div>
          </div>

          <div className="flex-1 mx-6">
            <div className="flex bg-white rounded-full items-center px-3 py-2 shadow-sm">
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar produtos, ex: relógio" className="flex-1 outline-none rounded-full px-3 text-sm" />
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="ml-3 text-sm">
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="ml-3 text-sm">
                <option value="relevance">Relevância</option>
                <option value="price-asc">Preço: menor</option>
                <option value="price-desc">Preço: maior</option>
                <option value="rating">Melhor avaliação</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setCartOpen(true)} className="relative p-2 rounded-full hover:bg-white/10 transition">
              <IconCart className="w-6 h-6 text-white" />
              {cartItems.length > 0 && <div className="absolute -top-1 -right-1 bg-gold text-black rounded-full px-2 text-xs" style={{ background: brand.gold, color: brand.black }}>{cartItems.length}</div>}
            </button>
            <button className="px-4 py-2 rounded-md text-sm font-medium" style={{ background: brand.gold, color: brand.black }}>Entrar</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-10">
        <section className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Universo Luxx — Onde o luxo encontra a tecnologia</h1>
            <p className="mt-4 text-lg text-gray-200 max-w-xl">Relógios refinados, celulares sofisticados e perfumes marcantes. Entrega rápida, embalagens premium e garantia de qualidade. Descubra a coleção.</p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })} className="px-6 py-3 rounded-md font-semibold" style={{ background: brand.gold, color: brand.black }}>Comprar agora</button>
              <button onClick={() => setSelectedProduct(products[0])} className="px-6 py-3 rounded-md border border-white/20 text-white">Ver lançamento</button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="p-4 bg-white/5 rounded-lg">Frete grátis acima de R$299</div>
              <div className="p-4 bg-white/5 rounded-lg">Embalagem presente grátis</div>
              <div className="p-4 bg-white/5 rounded-lg">Garantia oficial</div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition">
              <img src={products[1].img} alt="hero" className="w-full h-80 object-cover" />
            </div>
            <div className="absolute -bottom-6 left-6 bg-white rounded-xl p-4 shadow-lg" style={{ minWidth: 260 }}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Oferta Relâmpago</div>
                  <div className="text-sm text-gray-600">Nebula X — R$3.599</div>
                </div>
                <button onClick={() => addToCart(products[1])} className="px-3 py-2 rounded-md text-sm font-medium" style={{ background: brand.blue, color: brand.white }}>Adicionar</button>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Produtos em destaque</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <article key={p.id} className="bg-white/5 rounded-xl p-4 shadow-md hover:shadow-xl transition">
                <div className="rounded-lg overflow-hidden mb-3">
                  <img src={p.img} alt={p.title} className="w-full h-48 object-cover" />
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white font-semibold">{p.title}</h3>
                    <div className="text-sm text-gray-300">{p.category} • ⭐ {p.rating}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">R${p.price.toFixed(2)}</div>
                    <div className="mt-3 flex gap-2">
                      <button onClick={() => addToCart(p)} className="px-3 py-2 rounded-md text-sm font-medium" style={{ background: brand.gold, color: brand.black }}>Adicionar</button>
                      <button onClick={() => setSelectedProduct(p)} className="px-3 py-2 rounded-md text-sm border border-white/20 text-white">Ver</button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 p-8 rounded-xl" style={{ background: 'linear-gradient(90deg, rgba(13,17,23,0.6), rgba(11,111,255,0.08))' }}>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-white">
              <h3 className="text-2xl font-bold">Assine nossa newsletter</h3>
              <p className="text-sm text-gray-300">Receba 10% de desconto na primeira compra e lançamentos exclusivos.</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <input placeholder="Seu e-mail" className="px-4 py-2 rounded-md outline-none" />
              <button className="px-4 py-2 rounded-md font-semibold" style={{ background: brand.gold, color: brand.black }}>Inscrever</button>
            </div>
          </div>
        </section>

        {orderConfirmed && (
          <div className="mt-6 p-4 bg-white/5 rounded-lg text-white">
            Pedido {orderConfirmed.id} confirmado — Total R${orderConfirmed.total.toFixed(2)}. Obrigado!
          </div>
        )}
      </main>

      <aside className={`fixed top-0 right-0 h-full w-full md:w-96 bg-black/80 backdrop-blur-sm transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform`}>
        <div className="max-w-md h-full bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold">Seu carrinho</h4>
            <div className="flex items-center gap-2">
              <button onClick={() => { setCartOpen(false); setCheckoutOpen(false); }}>Fechar</button>
            </div>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-gray-600">Seu carrinho está vazio.</div>
          ) : (
            <div>
              <ul className="space-y-4">
                {cartItems.map((it) => (
                  <li key={it.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={it.img} alt={it.title} className="w-16 h-16 object-cover rounded" />
                      <div>
                        <div className="font-semibold">{it.title}</div>
                        <div className="text-sm text-gray-500">R${it.price.toFixed(2)}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="mb-2">x{it.qty}</div>
                      <div className="flex gap-2">
                        <button onClick={() => changeQty(it.id, Math.max(1, it.qty - 1))} className="px-2 py-1 border rounded">-</button>
                        <button onClick={() => changeQty(it.id, it.qty + 1)} className="px-2 py-1 border rounded">+</button>
                        <button onClick={() => removeFromCart(it.id)} className="px-2 py-1 border rounded">Remover</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <div className="flex items-center justify-between text-lg font-bold">Total <span>R${cartTotal.toFixed(2)}</span></div>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => setCheckoutOpen(true)} className="flex-1 px-4 py-2 rounded-md font-semibold" style={{ background: brand.blue, color: brand.white }}>Finalizar compra</button>
                  <button onClick={() => setCart({})} className="px-4 py-2 rounded-md border">Limpar</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full p-6">
            <div className="flex gap-6">
              <img src={selectedProduct.img} className="w-1/2 h-72 object-cover rounded-lg" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">{selectedProduct.title}</h3>
                  <div className="text-xl font-bold">R${selectedProduct.price.toFixed(2)}</div>
                </div>
                <p className="mt-3 text-gray-600">Categoria: {selectedProduct.category}</p>
                <p className="mt-3">Descrição elegante e curta sobre o produto — materiais premium, design pensado para durar.</p>
                <div className="mt-6 flex gap-2">
                  <button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }} className="px-4 py-2 rounded-md font-semibold" style={{ background: brand.gold, color: brand.black }}>Adicionar ao carrinho</button>
                  <button onClick={() => setSelectedProduct(null)} className="px-4 py-2 rounded-md border">Fechar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <h3 className="text-xl font-bold mb-4">Finalizar compra</h3>
            <CheckoutForm onCancel={() => setCheckoutOpen(false)} onConfirm={handleCheckout} total={cartTotal} />
          </div>
        </div>
      )}

      <footer className="mt-12 py-8 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between">
          <div>
            <div className="font-bold">Universo Luxx</div>
            <div className="text-sm text-gray-400">© {new Date().getFullYear()} Universo Luxx. Todos os direitos reservados.</div>
          </div>
          <div className="mt-4 md:mt-0 text-sm text-gray-400">Suporte • Política de privacidade • Trocas e devoluções</div>
        </div>
      </footer>
    </div>
  );
}

function CheckoutForm({ onCancel, onConfirm, total }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!name || !email || !address) return alert("Preencha todos os campos");
    onConfirm({ name, email, address });
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="text-sm">Nome</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-1 p-2 border rounded" />
      </div>
      <div>
        <label className="text-sm">E-mail</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full mt-1 p-2 border rounded" />
      </div>
      <div>
        <label className="text-sm">Endereço</label>
        <input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full mt-1 p-2 border rounded" />
      </div>

      <div className="flex items-center justify-between">
        <div>Total: <span className="font-bold">R${total.toFixed(2)}</span></div>
        <div className="flex gap-2">
          <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">Cancelar</button>
          <button type="submit" className="px-4 py-2 rounded-md font-semibold" style={{ background: '#0B6FFF', color: '#fff' }}>Confirmar</button>
        </div>
      </div>
    </form>
  );
}
