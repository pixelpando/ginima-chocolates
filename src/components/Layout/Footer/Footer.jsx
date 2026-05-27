import styles from './Footer.module.css'
import Directorio from '../../Equipo/Directorio.jsx'

function Footer() {
    return (
        <>
            <footer className={styles.footer}>
                <Directorio />
                <p>2026® Todos los derechos reservados.</p>
            </footer>
        </>
    )
}

export default Footer