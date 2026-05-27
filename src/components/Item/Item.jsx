import { useState, useEffect } from 'react';
import styles from './Item.module.css'

function Item({ nombre, precio, stock, imagen }) {
    const [esFavorito, setEsFavorito] = useState(false); 

    const CompraClick = () => {
        alert(`¡Agregaste ${nombre} al carrito!`);
    }

    const marcarComoFavorito = () => {
        setEsFavorito(!esFavorito)
    }

    return (
        <div className={styles.producto}>
            <img className={styles.imagen} src={imagen} alt="Duo Pistacho"/>
            <h3 className={styles.nombre}>{nombre}</h3>
            <p>Precio: ${precio}</p>
            <p>Stock disponible: {stock}</p>
            <button className={styles.btnComprar} onClick={CompraClick}>Comprar</button>
            <span className={styles.favorito}
                onClick={marcarComoFavorito}
            >
                {esFavorito ? <span className={styles.esFavorito}>★</span> : <span className={styles.noEsFavorito}>☆</span>}
            </span>
        </div>
    )
}

export default Item

// ★☆