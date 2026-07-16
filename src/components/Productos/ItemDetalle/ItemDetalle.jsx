import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './ItemDetalle.module.css'
import { useCart } from '../../../context/CartContext'
import { collection, getDocs, where, query } from 'firebase/firestore'
import { db } from '../../../firebase/config.js'

const ItemDetalle = () => {
    const { sku } = useParams()
    const [producto, setProducto] = useState(null)
    const [esFavorito, setEsFavorito] = useState(false);
    const [error, setError] = useState(false)

    const marcarComoFavorito = () => {
        setEsFavorito(!esFavorito)
    }

    const [cantidad] = useState(1)
    const { addToCart } = useCart()

    const handleAddToCart = () => {
        addToCart(producto, cantidad)
        alert(`Agregaste ${cantidad} unidad de ${producto.nombre} al carrito.`)
    }

    useEffect(() => {
        if (!sku) return
        // Para buscar por id de Firestore
        // const docRef = doc(db, "productos", id);
        
        // Para buscar por id del producto
        const querySku = query(
            collection(db, "productos"),
            where("sku", "==", Number(sku))
        )

        getDocs(querySku)
            .then((resp) => {
                if (resp.empty) {
                    console.log("No se encontró ningún producto con el SKU:", sku)
                    setError(true)
                    return
                }

                setProducto({
                    ...resp.docs[0].data(),
                    idFirestore: resp.docs[0].id
                })
                setError(false)
            })
            .catch((err) => {
                console.error("Error al cargar el producto: ", err)
                setError(true)
            })
    }, [sku])


    if (error) {
        return <p style={{ margin: '3rem', color: 'white' }}>Producto no encontrado.</p>
    }
    
    if (!producto) {
        return <p style={{ margin: '3rem', color: 'white' }}>Cargando detalle del producto...</p>
    }

    return (
        <div className={styles.productoInfo}>
            <img className={styles.imagen} src={producto.imagen} alt={producto.nombre} />
            <div className={styles.infoDetalle}>

                <p className={styles.volver}><Link to='/productos'><svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="var(--accent-comp)"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" /></svg> Volver a todos los productos</Link></p>
                <h2 className={styles.nombre}>{producto.nombre}</h2>
                <h3 className={styles.precio}>$ {producto.precio}</h3>

                <span className={styles.favorito} onClick={marcarComoFavorito}>
                    {esFavorito ? <span className={styles.esFavorito}>★</span> : <span className={styles.noEsFavorito}>☆</span>}
                    <span className={styles.favText}>Agregar a favoritos </span>
                </span>

                <small>SKU {producto.sku}</small>
                <p className={styles.detalle}>{producto.detalle}</p>

                <button className={styles.btnComprar} onClick={handleAddToCart}>Añadir producto</button>
            </div>
        </div>
    )
}

export default ItemDetalle