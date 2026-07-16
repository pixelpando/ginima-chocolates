import styles from './GestionProductos.module.css'
import { useState, useEffect } from 'react'
import { db } from '../../firebase/config.js'
import { collection, getDocs, deleteDoc, doc, addDoc, updateDoc } from "firebase/firestore"
import FormularioProducto from '../FormularioProducto/FormularioProducto.jsx'

const GestionProductos = () => {
    const [productos, setProductos] = useState([])

    const estadoInicialForm = {
        sku: '',
        nombre: '',
        categoria: '',
        precio: '',
        stock: '',
        detalle: '',
        imagen: '',
        destacado: false
    }

    const [datosForm, setDatosForm] = useState(estadoInicialForm)

    const [imagenFile, setImagenFile] = useState(null)

    const [loading, setLoading] = useState(null)

    const [productoAEditar, setProductoAEditar] = useState(null)

    const manejarCambio = (evento) => {
        const { name, value } = evento.target
        setDatosForm({
            ...datosForm,
            [name]: value
        })
    }

    const manejarCambioImagen = (evento) => {
        setImagenFile(evento.target.files[0])
    }

    const cargarProductos = async () => {
        const productosRef = collection(db, "productos")
        const resp = await getDocs(productosRef)
        setProductos(
            resp.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id // <-- ID Firestore
            }))
        )
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        cargarProductos()
    }, [])

    const handleDelete = async (id) => {
        console.log("ID para eliminar: ", id)
        const confirmacion = window.confirm("¿Está seguro de que desea eliminar este producto?")
        
        if (confirmacion) {
            try {
                const docRef = doc(db, "productos", id)
                await deleteDoc(docRef)
                setProductos(productos.filter(prod => prod.id !== id))
                alert("Producto eliminado.")
            } catch (error) {
                console.error("Error al eliminar el producto:", error)
                alert("No se pudo eliminar el producto de la base de datos.")
            }
        }
    }
    
    const manejarEditar = (producto) => {
        setProductoAEditar(producto)
        setDatosForm(producto)
    }

    const modoEdicion = productoAEditar !== null

    const manejarEnvio = async (evento) => {
        evento.preventDefault()

        if (!imagenFile && !productoAEditar) {
            alert('Por favor, selecciona una imagen para el producto.')
            return
        }

        setLoading(true)
        console.log("Loading...")

        let urlImagen = datosForm.imagen

        try {
            if (imagenFile) {
                console.log('Subiendo imagen a Imgbb...')

                // Subir imagen a imgbb
                const apiKey = '4ccd614b9d3b94619ff3c8ebd31358b9'
                const formData = new FormData()
                formData.append('image', imagenFile)

                const respuestaImgbb = await
                    fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                        method: 'POST',
                        body: formData,
                    })

                const datosImgbb = await respuestaImgbb.json()

                if (datosImgbb.success) {
                    console.log('Imagen subida con exito. URL:', datosImgbb.data.url)
                    urlImagen = datosImgbb.data.url
                } else {
                    throw new Error('La subida de la imagen a Imgbb falló.')
                }   
            }

            const productoCompleto = {
                ...datosForm,
                sku: Number(datosForm.sku),
                precio: Number(datosForm.precio),
                stock: Number(datosForm.stock),
                imagen: urlImagen
            }

            console.log('Enviando producto a Firebase:', productoCompleto)

            const productosCollection = collection(db, "productos")

            if (productoAEditar) {
                const docRef = doc(db, "productos", productoAEditar.id)
                // eslint-disable-next-line no-unused-vars
                const { id, ...datosAGuardar } = productoCompleto
                await updateDoc(docRef, datosAGuardar)
            } else {
                await addDoc(productosCollection, productoCompleto)
            }

            await cargarProductos()
            setDatosForm(estadoInicialForm)
            setImagenFile(null)
            setProductoAEditar(null)

        } catch (error) {
            console.error('Error en el proceso de envío:', error)
            alert('Hubo un error al subir la imagen. Por favor, intentá de nuevo.')
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h2>Gestión de Productos</h2>
            <FormularioProducto
                datosForm={datosForm}
                manejarCambio={manejarCambio}
                manejarCambioImagen={manejarCambioImagen}
                manejarEnvio={manejarEnvio}
                manejarEditar={manejarEditar}
                modoEdicion={modoEdicion}
                loading={loading}
            />
            <h3 className={styles.h3}>Lista de Productos</h3>
            <ul className={styles.prodEdit}>
                {productos.map((prod) => (
                    <li key={prod.id}>
                        {/* <small>ID {prod.id}</small> */}
                        <div className={styles.sku}>
                            <small>{prod.sku || 'Sin SKU'}</small>
                            {/* <small>{prod.id}</small> */}
                        </div>
                        <img className={styles.imagen} src={prod.imagen} alt={prod.nombre} />
                        <span>{prod.nombre}</span>
                        <span>${prod.precio}</span>
                        <span>Stock: {prod.stock}</span>
                        <button onClick={() => manejarEditar(prod)} className={styles.btnEditar}>Editar</button>
                        {/* <button onClick={() => handleDelete(prod.id)} className={styles.btnEliminar}>Eliminar</button> */}
                        <button 
                            onClick={() => handleDelete(prod.id)} 
                            className={styles.btnEliminar}
                            disabled={prod.sku && Number(prod.id) <= 12}
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default GestionProductos