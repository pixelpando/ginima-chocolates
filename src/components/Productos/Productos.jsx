import styles from './Productos.module.css'
import { useState, useEffect } from "react";

function Productos({ Mensaje }) {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        fetch('data/productos.json')
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error('No se pudo cargar la información de los productos');
                }
                return respuesta.json();
            })
            .then((datos) => {
                setProductos(datos);
                console.log('Productos obtenidos de la API');
            })
            .catch((error) => {
                setError(error.message);
                console.log('No hay productos');
            })
            .finally(() => {
                setCargando(false);
            });
    }, []);
    if (cargando) {
        return <p>Cargando productos, por favor espere...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }
    return (
        <section>
            <h1>{Mensaje}</h1>
            <ul className='auto-grid'>
                {productos.map((producto) => (
                    <li key={producto.id} className={styles.producto}>
                        <h2>{producto.nombre}</h2>
                        <img src={producto.imagen} alt={producto.nombre} className={styles.imagen}/>
                        <p>Precio ${producto.precio}</p>
                        <button className={styles.btnComprar}>Agregar al carrito</button>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Productos