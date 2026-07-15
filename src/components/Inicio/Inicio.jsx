import ItemListContainer from "../Productos/ItemListContainer/ItemListContainer"


function Inicio() {
    return (
        <>
            <h1>¡Bienvenidos a Ginima!</h1>
            <p>La mejor calidad en chocolates artesanales</p>

            <ItemListContainer Mensaje="Productos Destacados" Destacados={true} />
        </>
    )
}

export default Inicio