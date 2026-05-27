import styles from './Layout.module.css'
import Header from './Header/Header.jsx'
import Footer from './Footer/Footer.jsx'
import Directorio from '../Equipo/Directorio.jsx'

function Layout({ children }) {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
            <Footer>
                
            </Footer>
        </>
    )
}

export default Layout