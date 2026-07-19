import { useState } from 'react'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import { useCart } from '../../../context/CartContext'

function Header() {
    const [menuAbierto, setMenuAbierto] = useState(false)

    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto)
    }

    const iconCart = (
        <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="currentColor"><path d="M223.5-103.5Q200-127 200-160t23.5-56.5Q247-240 280-240t56.5 23.5Q360-193 360-160t-23.5 56.5Q313-80 280-80t-56.5-23.5Zm400 0Q600-127 600-160t23.5-56.5Q647-240 680-240t56.5 23.5Q760-193 760-160t-23.5 56.5Q713-80 680-80t-56.5-23.5ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/></svg>
    )

    const { getCartQuantity } = useCart();
    const totalItems = getCartQuantity();
    
    return (
        <>
            <header className={styles.header}>
                <div className={styles.marca}>
                    <img src="/images/logo.png" alt="Logo Ginima Chocolates" />
                    <span>Ginima Chocolates</span>
                </div>

                <button className={styles.hamburger} onClick={toggleMenu}>
                    <span className={menuAbierto ? styles.linea1 : ''}></span>
                    <span className={menuAbierto ? styles.linea2 : ''}></span>
                    <span className={menuAbierto ? styles.linea3 : ''}></span>
                </button>

                <nav>
                    <ul className={`${styles.menu} ${menuAbierto ? styles.active : ''}`}>
                        <li><Link to="/" onClick={toggleMenu}>Inicio</Link></li>
                        <li><Link to="/productos" onClick={toggleMenu}>Productos</Link></li>
                        <li><Link to="/gestion" onClick={toggleMenu}>Gestión Productos</Link></li>
                        <li><Link to="/admin/cupones" onClick={toggleMenu}>Gestión Cupones</Link></li>
                        <li><Link to="/cart" onClick={toggleMenu} aria-label="Carrito de compras">{iconCart} {totalItems > 0 && <span className={styles.totalItems}>{totalItems}</span>}</Link></li>
                    </ul>
                </nav>

            </header>
        </>
    )
}

export default Header