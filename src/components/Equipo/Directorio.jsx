/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import styles from './Directorio.module.css'
import TarjetaContacto from "./TarjetaContacto.jsx"
import { db } from '../../firebase/config.js'

function Directorio() {
    const [equipo, setEquipo] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)
 
    useEffect(() => {
        const propDB = collection(db, "equipo")

        getDocs(propDB)
            .then((resp) => {
                setEquipo(
                    resp.docs.map((doc) => {
                        return { id: doc.id, ...doc.data() }
                    })
                )
            })
            .catch((err) => {
                console.error("Error al obtener los miembros del equipo:", err)
                setError("No se pudieron los datos del equipo. Por favor, intenta de nuevo más tarde.")
            })
            .finally(() => {
                setCargando(false)
            })
    }, [])

    if (cargando) {
        return <p style={{ margin: '3rem', color: 'white' }}>Cargando miembros del equipo, por favor espere...</p>
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    return (
        <section>
            <div className={styles.autoGrid}>
                {equipo.map(contacto => (
                    <TarjetaContacto key={contacto.id} {...contacto} />
                ))}
            </div>
        </section>
    )
}

export default Directorio