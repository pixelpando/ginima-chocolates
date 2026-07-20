import styles from './GestionCupones.module.css'
import { useState, useEffect } from 'react'
import { db } from '../../firebase/config.js'
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'

const estadoInicial = {
    codigo: "",
    descuento: ""
}

const GestionCupones = () => {

    const [datosForm, setDatosForm] = useState(estadoInicial)
    const [cupones, setCupones] = useState([])
    const [cuponAEditar, setCuponAEditar] = useState(null)

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

    // Manejo de los cambios en el formulario
    const manejarCambio = (e) => {

        setDatosForm({
            ...datosForm,
            [e.target.name]: e.target.value
        })
    }


    // CRUD Create
    const manejarEnvio = async (e) => {
        e.preventDefault()

        if (!datosForm.codigo || !datosForm.descuento) {
            alert("Complete todos los campos.")
            return
        }

        if (cuponAEditar) {
            try {
                await updateDoc(doc(db, "cupones", cuponAEditar.id),
                    {
                        codigo: datosForm.codigo,
                        descuento: Number(datosForm.descuento)
                    }
                )

                alert("El cupón se ha actualizado correctamente.")

            } catch (error) {
                console.error(error)
                alert("Se produjo un error al querer editar el cupón. Vuelva a intentarlo.")
            }

        } else {
            try {
                await addDoc(collection(db, "cupones"),
                    {
                        codigo: datosForm.codigo,
                        descuento: Number(datosForm.descuento)
                    }
                )

                alert("El cupón se creo correctamente.")

            } catch (error) {
                console.error(error)
                alert("Error al crear el cupón.")
            }
        }

        setDatosForm(estadoInicial)
        setCuponAEditar(null)
        obtenerCupones()

    }

    // CRUD Editar
    const editarCupon = (cupon) => {
        setCuponAEditar(cupon)

        setDatosForm(
            {
                codigo: cupon.codigo,
                descuento: cupon.descuento
            }
        )
    }

    // CRUD Delete
    const eliminarCupon = async (id) => {
        try {
            await deleteDoc(doc(db, "cupones", id))
            alert("El cupón ha sido eliminado correctamente.")

            if (cuponAEditar?.id === id) {
                setCuponAEditar(null),
                    setDatosForm(estadoInicial)
            }

            obtenerCupones()

        } catch (error) {
            console.log(error)
            alert("Hubo un error al querer eliminar el cupón.")
        }
    }

    const cancelarEdicion = () => {
        setCuponAEditar(null)
        setDatosForm(estadoInicial)
    }

    return (
        <div className={styles.adminCupones}>
            <h2>Administración de Cupones</h2>

            <form className={styles.formulario} onSubmit={manejarEnvio}>
                <h3>Agregar nuevo cupón</h3>
                <div>
                    <label htmlFor="codigo">Código</label>
                    <input
                        type="text"
                        placeholder="Código"
                        required
                        name='codigo'
                        id='codigo'
                        value={datosForm.codigo}
                        onChange={manejarCambio}
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
                        name='descuento'
                        id='descuento'
                        value={datosForm.descuento}
                        onChange={manejarCambio}
                    />
                </div>

                <button className={styles.btnGuardar} type="submit">
                    {cuponAEditar ? "Actualizar Cupón" : "Crear Cupón"}
                </button>

                {cuponAEditar &&
                    <button className={styles.btnCancelar} type="button" onClick={cancelarEdicion}>
                        Cancelar
                    </button>
                }
            </form>

            <h3>Listado de cupones</h3>
            <div className={styles.cupones}>
                {
                    cupones.map((cupon) => (
                        <div className={styles.cupon} key={cupon.id}>
                            <p>Código</p>
                            <span>{cupon.codigo}</span>
                            <p>Descuento</p>
                            <span className={styles.descuento}>{cupon.descuento}%</span>
                            <div>
                                <button onClick={() => editarCupon(cupon)} className={styles.btnEditar}>
                                    Editar
                                </button>
                                <button onClick={() => eliminarCupon(cupon.id)} className={styles.btnEliminar}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default GestionCupones