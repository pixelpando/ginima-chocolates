import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/config.js'
import { useNavigate } from 'react-router-dom'

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
                navigate('/') //
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.error("Error en el login:", errorCode, errorMessage)
                alert("Los datos de usuario y contraseña no son correctos. Vuelve a intentarlo.")
            })
    }

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    name="email"
                    autoComplete="true"

                    placeholder="Correo electrónico"

                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    name="password"

                    placeholder="Contraseña"
                    value={password}

                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Ingresar</button>
            </form>
        </div>
    )
}

export default Login