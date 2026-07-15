import ItemListContainer from "../Productos/ItemListContainer/ItemListContainer"


function Productos() {
    return (
        <>
            <h1>Todos los productos</h1>
            <p>Elegí entre barras macizas, rellenas, huevos, trufas, tortas, con frutas y más.</p>
            <ItemListContainer Mensaje="¡Llevate los productos que más te gusten!" Destacados={false} />
        </>
    )
}

export default Productos