import styles from './Header.module.css'

function Header() {
    return (
        <>
            <header className={styles.header}>
                <div className={styles.marca}>
                    <img src="/images/logo.png" alt="Logo Ginima Chocolates" />
                    <h1>Ginima Chocolates</h1>
                </div>

                <nav>
                    <ul className={styles.menu}>
                        <li><a href="#">Inicio</a></li>
                        <li><a href="#">Productos</a></li>
                        <li><a href="#">Contacto</a></li>
                        <li><a href="#">Carrito</a></li>
                    </ul>
                </nav>

            </header>
        </>
    )
}

export default Header