import styles from './FormularioProducto.module.css'

function FormularioProducto({ datosForm, manejarCambio, manejarEnvio }) {
    console.log(datosForm);
    return (
        <form className={styles.formulario} onSubmit={manejarEnvio}>
            <h3>Agregar nuevo producto</h3>
            <div>
                <label>Nombre del producto: </label>
                <input
                    type="text"
                    placeholder="Ej: chocolate relleno"
                    name="nombre"
                    value={datosForm.nombre}
                    onChange={manejarCambio}
                />
            </div>
            <div>
                <label>Precio: </label>
                <input
                    type="number"
                    placeholder="Ej: 15000"
                    name="precio"
                    value={datosForm.precio}
                    onChange={manejarCambio}
                />
            </div>
            <div>
                <label>Stock: </label>
                <input
                    type="number"
                    placeholder="Ej. 7"
                    name="stock"
                    value={datosForm.stock}
                    onChange={manejarCambio}
                />
            </div>
            <div>
                <label>Imagen: </label>
                <input
                    type="file"
                    placeholder="https://..."
                    name="urlImagen"
                    value={datosForm.urlImagen}
                    onChange={manejarCambio}
                />
            </div>
            <button type="submit">Guardar producto</button>
        </form>
    )
}

export default FormularioProducto