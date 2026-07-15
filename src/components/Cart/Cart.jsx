import styles from './Cart.module.css'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'

const Cart = () => {
    const { cart, clearCart, getCartTotal, getCartQuantity, removeItem } = useCart()

    const handleVaciarCarrito = () => {
        const aceptar = confirm("¿Deseas borrar todos los productos del carrito?")
        if (aceptar) {
            clearCart()
        }
    }

    if (cart.length === 0) {
        return (
            <div>
                <h1>Carrito de Compras</h1>
                <p>Agrega los productos deseados para ver seguir con la compra.</p>
                <Link to="/productos" className={styles.volver}>Ver todos los productos</Link>
                <div className={styles.sinProductos}>No hay productos en el carrito</div>
            </div>
        )
    }

    return (
        <div>
            <h1>Carrito de Compras</h1>
            {cart.map(item => (
                <div key={item.id} className={styles.cartItem}>
                    <button className={styles.btnEliminar} onClick={() => removeItem(item.id)} title='Eliminar producto'>❌</button>
                    <img src={item.imagen} alt={item.nombre} />
                    <h3>{item.nombre}</h3>
                    <p>Cantidad <span>{item.quantity}</span></p>
                    <p>Precio <span>${item.precio}</span></p>
                    <p>Subtotal <span>${item.precio * item.quantity}</span></p>
                </div>
            ))}

            <div className={styles.total}>
                <p>Cantidad de productos: <strong>{getCartQuantity()}</strong></p>
                <p>Total a pagar: <strong>${getCartTotal()}</strong></p>
                <Link to="/" onClick={() => {
                        alert("¡Gracias por tu compra!\nTe mantendremos informado/a sobre nuevos productos.")
                        clearCart()
                    }}
                    className={styles.btnFinalizar}>Finalizar Compra</Link>
                <button className={styles.btnVaciar} onClick={handleVaciarCarrito}>Vaciar Carrito</button>
            </div>
        </div>
    )
}

export default Cart