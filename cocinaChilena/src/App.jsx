import { useState, useEffect } from 'react';
import { getPlatos } from './services/api';
import { Navbar } from './components/Navbar';
import { MenuPizarra } from './components/MenuPizarra';
import './App.css';

function App() {
    const [menu, setMenu] = useState(() => {
        try {
            const saved = localStorage.getItem('menu cocina');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error("error al cargar:", error);
            return [];
        }
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const cargarPlatos = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getPlatos();
            setMenu((menu) =>
                data.meals.map((platos) => {
                    const revisar = menu.find((p) => p.idMeal === platos.idMeal);
                    let precioFinal;
                    if(revisar) {
                        precioFinal = revisar.precio;
                    }
                    else {
                        precioFinal = 0;
                    }
                    return {
                        ...platos,
                        precio: precioFinal,
                        disponible: true,
                    };
                })
            );
        } catch (error) {
            setError("No se pudieron cargar los platos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarPlatos();
    }, []);

    useEffect(() => {
        localStorage.setItem('menu cocina', JSON.menu);
    }, [menu]);

    const editarPrecio = (id, nuevoPrecio) => {
        const precio = Number(nuevoPrecio);
        if (Number.isNaN(precio) || precio < 0) {
            alert("ingresa un valor valido");
            return; 
        }
        setMenu((prev) =>
            prev.map((p) => (p.idMeal === id ? { ...p, precio } : p))
        );
    };

    const eliminarPlato = (id) => {
        setMenu((prev) => prev.filter((p) => p.idMeal !== id));
    };

    if (loading) return <p>Cargando menú...</p>;

    if (error) {
        return (
            <div>
                <p>{error}</p>
                <button onClick={cargarPlatos}>Reintentar</button>
            </div>
        );
    }

    return (
        <div class="app">
            <Navbar />
            <MenuPizarra
                menu={menu}
                onEliminar={eliminarPlato}
                onEditarPrecio={editarPrecio}
            />
        </div>
    );
}

export default App;