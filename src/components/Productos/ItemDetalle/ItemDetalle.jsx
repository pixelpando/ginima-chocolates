import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './ItemDetalle.module.css'
import { useCart } from '../../../context/CartContext'
import { collection, getDocs, where, query } from 'firebase/firestore'
import { db } from '../../../firebase/config.js'

const ItemDetalle = () => {
    const { id } = useParams()
    const [producto, setProducto] = useState(null)
    const [esFavorito, setEsFavorito] = useState(false);

    const marcarComoFavorito = () => {
        setEsFavorito(!esFavorito)
    }

    const [cantidad] = useState(1)
    const { addToCart } = useCart()

    const handleAddToCart = () => {
        addToCart(producto, cantidad)
        alert(`Agregaste ${cantidad} unidad de ${producto.nombre} al carrito.`)
    }
    /*
    useEffect(() => {
        fetch('/data/productos.json')
            .then(response => response.json())
            .then(data => {
                const productoEncontrado = data.find(p => p.id === parseInt(id))
                setProducto(productoEncontrado)
            })
            .catch(error => console.error("Error al cargar el producto:", error))
    }, [id])
    */

    useEffect(() => {
        if (!id) return
        // Para buscar por id de Firestore
        // const docRef = doc(db, "productos", id);
        
        // Para buscar por id del producto
        const queryId = query(
            collection(db, "productos"),
            where("id", "==", Number(id))
        )

        getDocs(queryId)
            .then((resp) => {
                if (resp.empty) {
                    console.log("No se encontró el producto")
                    return
                }

                setProducto({
                    ...resp.docs[0].data(),
                    idFirestore: resp.docs[0].id
                })
            })
            .catch((error) => {
                console.log("Error al cargar el producto: ", error)
            })
    }, [id])


    if (!producto) {
        return <p style={{ margin: '3rem', color: 'white' }}>Cargando detalle del producto...</p>
    }
    
    if (!producto.id) {
        return <p style={{ margin: '3rem', color: 'white' }}>Producto no encontrado.</p>
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
                <p className={styles.detalle}>{producto.detalle}</p>
                <button className={styles.btnComprar} onClick={handleAddToCart}>Añadir producto</button>
            </div>
        </div>
    )
}

export default ItemDetalle;