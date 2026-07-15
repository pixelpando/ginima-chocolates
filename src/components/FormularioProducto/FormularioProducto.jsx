import styles from './FormularioProducto.module.css'

function FormularioProducto({
    datosForm,
    manejarCambio,
    manejarEnvio,
    manejarCambioImagen,
    loading,
    modoEdicion
}) {
    // console.log(datosForm);
    return (
        <form className={styles.formulario} onSubmit={manejarEnvio}>
            <h3>
                {modoEdicion ? "Editar Producto" : "Agregar nuevo producto"}
            </h3>
            <div>
                <label>ID</label>
                <input
                    type="number"
                    placeholder="Ej: 25"
                    name="id"
                    min="1"
                    value={datosForm.id}
                    onChange={manejarCambio}
                    required
                />
                <small>ATENCIÓN: No usar un mismo ID en los productos.</small>
            </div>
            <div>
                <label>Nombre del producto</label>
                <input
                    type="text"
                    placeholder="Ej: Barra de chocolate con leche"
                    name="nombre"
                    value={datosForm.nombre}
                    onChange={manejarCambio}
                    required
                />
            </div>
            <div>
                <label>Categoria</label>
                <input
                    type="text"
                    placeholder="Ej: Semiamargo"
                    name="categoria"
                    value={datosForm.categoria}
                    onChange={manejarCambio}
                    required
                />
            </div>
            <div>
                <label>Detalle</label>
                <textarea
                    type="text"
                    placeholder="Ej: Barra de chocolate con leche cubierto con una crocante capa de almendras acarameladas..."
                    name="detalle"
                    value={datosForm.detalle}
                    onChange={manejarCambio}
                    required
                />
            </div>
            <div>
                <label>Precio</label>
                <input
                    type="number"
                    placeholder="Ej: 15000"
                    name="precio"
                    value={datosForm.precio}
                    onChange={manejarCambio}
                    required
                />
            </div>
            <div>
                <label>Stock</label>
                <input
                    type="number"
                    placeholder="Ej. 7"
                    name="stock"
                    min="0"
                    value={datosForm.stock}
                    onChange={manejarCambio}
                    required
                />
            </div>
            <div>
                <label>Imagen</label>
                <input
                    type="file"
                    onChange={manejarCambioImagen}
                    required={!modoEdicion}
                />
            </div>
            <button
                className={styles.btnGuardar}
                type="submit"
                disabled={loading}
            >
                {
                    loading
                        ? "Procesando..."
                        : modoEdicion
                            ?  "Actualizar Producto"
                            : "Guardar Producto"
                }
            </button>
        </form>
    )
}

export default FormularioProducto