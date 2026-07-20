import styles from './Login.module.css'
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/config.js'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                console.log("Usuario logueado:", user)
                alert("¡Inicio de sesión exitoso!")
                navigate('/')
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.error("Error en el login:", errorCode, errorMessage)
                alert("Los datos de usuario y contraseña no son correctos. Vuelve a intentarlo.")
            })
    }

    return (
        <div className={styles.iniciarSesion}>
            <h2>Iniciar Sesión</h2>
            
            <div className={styles.adminImg}>
                <p>Ver datos Admin</p>
            </div>

            <form onSubmit={handleLogin} className={styles.formulario}>
                <div>
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        type="email"
                        id="email"
                        autoComplete="true"

                        placeholder="Correo electrónico"

                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"

                        placeholder="Contraseña"
                        value={password}

                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className={styles.btnIngresar}>Ingresar</button>
            </form>

            <p>¿No tenés una cuenta? <Link to="/registro">Registrate aquí</Link></p>

        </div>
    )
}

export default Login