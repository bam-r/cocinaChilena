import { useState } from 'react';

export const PlatoCard = ({ plato, onEliminar, onEditarPrecio }) => {
    const [editando, setEditando] = useState(false);
    const [nuevoPrecio, setNuevoPrecio] = useState(plato.precio);

    const guardarPrecio = () => {
        onEditarPrecio(plato.idMeal, nuevoPrecio);
        setEditando(false);
    };

    return (
        <div className="platocard">
            <img src={plato.strMealThumb} alt={plato.strMeal} />
            <h3>{plato.strMeal}</h3>

            {editando ? (
                <div className="edit-precio">
                    <input
                        type="number"
                        value={nuevoPrecio}
                        onChange={(e) => setNuevoPrecio(e.target.value)}
                        autoFocus
                    />
                    <button onClick={guardarPrecio}>Guardar</button>
                    <button onClick={() => setEditando(false)}>Cancelar</button>
                </div>
            ) : (
                <>
                    <p className="price">${plato.precio}</p>
                    <button onClick={() => setEditando(true)}>Editar precio</button>
                </>
            )}

            <button onClick={() => onEliminar(plato.idMeal)}>Eliminar</button>
        </div>
    );
};