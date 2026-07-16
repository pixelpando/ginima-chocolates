import styles from './Item.module.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../../context/CartContext.jsx'

export function Item({ sku, nombre, precio, stock, imagen, idFirestore }) {
    const producto = { id: idFirestore || sku, sku, nombre, precio, stock, imagen }

    const [cantidad, setCantidad] = useState(1)

    const incrementar = () => {
        if (cantidad < stock) {
            setCantidad(cantidad + 1)
        }
    }

    const decrementar = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1)
        }
    }

    const [esFavorito, setEsFavorito] = useState(false)

    const marcarComoFavorito = () => {
        setEsFavorito(!esFavorito)
    }

    const { addToCart, getCantidadActual } = useCart()

    const handleAddToCart = () => {
        addToCart(producto, cantidad)
        alert(`Agregaste ${cantidad} unidades de ${producto.nombre} al carrito.`)
    }

    const cantidadActual = getCantidadActual(producto.id)

    return (
        <div className={styles.producto}>
            <span className={styles.favorito} onClick={marcarComoFavorito}>
                {esFavorito ? <span className={styles.esFavorito}>★</span> : <span className={styles.noEsFavorito}>☆</span>}
            </span>
            <img className={styles.imagen} src={imagen} alt={nombre} />
            <h3 className={styles.nombre}>{nombre}</h3>
            <p className={styles.precio}>$ {precio}</p>
            <p className={styles.stock}>En stock: <strong>{stock}</strong></p>
            <p className={styles.vermas}><Link className={styles.link} to={`/productos/${sku}`}>Ver más info</Link></p>
            <div>
                <button className={styles.btn} onClick={decrementar}>-</button>
                <span className={styles.cantidad}><strong>{cantidad}</strong></span>
                <button className={styles.btn} onClick={incrementar}>+</button>
            </div>
            <p className={styles.unidCart}>
                {cantidadActual > 0 ? <span>Agregaste <strong>{cantidadActual}</strong> unid. al carrito</span> : <span></span>}
            </p>
            <button className={styles.btnComprar} onClick={handleAddToCart}>Añadir producto</button>
        </div>
    )
}

export default Item