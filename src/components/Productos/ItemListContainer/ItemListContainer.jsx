/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import styles from '../ItemListContainer/ItemListContainer.module.css'
import ItemList from '../ItemList/ItemList'
import { db } from '../../../firebase/config.js'

function ItemListContainer({ Mensaje, Destacados }) {
    const [productos, setProductos] = useState([])

    const [error, setError] = useState(null)
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        const propDB = collection(db, "productos")

        getDocs(propDB)
            .then((resp) => {
                setProductos(
                    resp.docs.map((doc) => {
                        return {
                            id: doc.id,
                            idFirestore: doc.id,
                            ...doc.data()
                        }
                    })
                )
            })
            .catch((err) => {
                console.error("Error al obtener los productos:", err)
                setError("No se pudieron cargar los productos. Por favor, intenta de nuevo más tarde.")
            })
            .finally(() => {
                setCargando(false)
            })
    }, [])

    if (cargando) {
        return <p style={{ margin: '3rem', color: 'white' }}>Cargando productos, por favor espere...</p>
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    const productosAMostar = Destacados ? productos.filter(prod => prod.destacado) : productos

    return (
        <section>
            <h2 className={styles.destacado}>{Mensaje}</h2>
            <div>
                <ItemList productos={productosAMostar} />
            </div>
        </section>
    )
}

export default ItemListContainer