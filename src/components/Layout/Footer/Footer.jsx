import styles from './Footer.module.css'
import Directorio from '../../Equipo/Directorio.jsx'

function Footer() {
    return (
        <>
            <footer className={styles.footer}>
                <div>
                    <Directorio />
                    <p className={styles.copyright}>2026® Todos los <strong>chocolates</strong> reservados.</p>
                </div>
            </footer>
        </>
    )
}

export default Footer