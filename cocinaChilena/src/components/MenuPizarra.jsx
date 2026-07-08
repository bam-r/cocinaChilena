import { PlatoCard } from './PlatoCard';

export const MenuPizarra = ({ menu, onEliminar, onEditarPrecio }) => {
    return (
        <div className="menu-pizarra">
            {menu.map((plato) => (
                <PlatoCard
                    key={plato.idMeal}
                    plato={plato}
                    onEliminar={onEliminar}
                    onEditarPrecio={onEditarPrecio}
                />
            ))}
        </div>
    );
};