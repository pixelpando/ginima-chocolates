import styles from './GestionCupones.module.css'
import { useState, useEffect } from 'react'
import { db } from '../../firebase/config.js'
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'

const GestionCupones = () => {

    const [cupones, setCupones] = useState([])
    const [codigo, setCodigo] = useState("")
    const [descuento, setDescuento] = useState("")

    // CRUD Read
    const obtenerCupones = async () => {
        try {
            const respuesta = await getDocs(collection(db, "cupones"))

            const lista = respuesta.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))

            setCupones(lista)

        } catch (error) {
            console.log("Error al obtener los cupones:", error)
            alert("Ocurrió un error al cargar los cupones.")
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        obtenerCupones()
    }, [])


    // CRUD Create
    const crearCupon = async (e) => {
        e.preventDefault()

        if (!codigo || !descuento) {
            alert("Complete todos los campos")
            return
        }

        const porcentaje = Number(descuento)

        if (porcentaje < 1 || porcentaje > 100) {
            alert("El descuento debe estar entre 1 y 100")
            return
        }

        try {
            await addDoc(collection(db, "cupones"), {
                codigo,
                descuento: Number(descuento)
            })

            alert("El cupón se creo correctamente.")

            setCodigo('')
            setDescuento('')

            await obtenerCupones()

        } catch (error) {
            console.error(error)
            alert("Error al crear el cupón.")
        }
    }

    // CRUD Delete
    const eliminarCupon = async (id) => {
        try {
            await deleteDoc(doc(db, "cupones", id))
            alert("El cupón ha sido eliminado correctamente.")

            await obtenerCupones()

        } catch (error) {
            console.log(error)
            alert("Error al eliminar cupón.")
        }
    }

    return (
        <div className={styles.adminCupones}>
            <h2>Administración de Cupones</h2>

            <form className={styles.formulario} onSubmit={crearCupon}>
                <h3>Agregar nuevo cupón</h3>
                <div>
                    <label htmlFor="codigo">Código</label>
                    <input
                        type="text"
                        placeholder="Código"
                        required
                        id='codigo'
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="descuento">Descuento</label>
                    <input
                        type="number"
                        placeholder="Descuento"
                        min="1"
                        max="100"
                        required
                        id='descuento'
                        value={descuento}
                        onChange={(e) => setDescuento(e.target.value)}
                    />
                </div>

                <button className={styles.btnGuardar} type="submit">
                    Crear Cupón
                </button>
            </form>

            <h3>Listado de cupones</h3>
            <div className={styles.cupones}>
            {
                cupones.map((cupon) => (
                    <div className={styles.cupon} key={cupon.id}>
                        <p>Código</p>
                        <span>{cupon.codigo}</span>
                        <p>Descuento</p>
                        <span>{cupon.descuento}%</span>
                        <button onClick={() => eliminarCupon(cupon.id)} className={styles.btnEliminar}>
                            Eliminar
                        </button>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default GestionCupones