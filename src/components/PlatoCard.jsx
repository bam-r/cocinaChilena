export const PlatoCard = ({ plato }) => {
    return (
        <div className="plato-card">
            <img src={plato.image} alt={plato.title} />
            <h3>{plato.title}</h3>
            <p className="price">${plato.price}</p>
            <p className="description">{plato.description}</p>

        </div>
    );
}
