import { useState, useEffect } from 'react'
import { getElectronics } from './services/api';
import { Navbar } from './components/Navbar';
import { PlatoCard } from './components/PlatoCard';
import './App.css';
function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getPlatos();
        setProducts(data);
      } catch (err) {
        setError("Error de conexin: No se pudo obtener la lista de productos.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []); //la petición se realiza solo al montar el componente.
  if (loading) return <div className="loader">Cargando catlogo...</div>;
  if (error) return <div className="error-msg">{error}</div>;
  return (
    <div className="main-container">
      { Navbar()}
      <div className="product-grid">
        {products.map(product => (
          <PlatoCard key={product.id} plato={product} />
        ))}
      </div>
    </div>
  );
}


export default App
