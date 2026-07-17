import styles from './FormularioProducto.module.css'

function FormularioProducto({
    datosForm,
    manejarCambio,
    manejarEnvio,
    manejarCambioImagen,
    loading,
    modoEdicion,
    skuDuplicado,
    handleCancelar
}) {
    // console.log(datosForm);
    return (
        <form
            className={styles.formulario}
            onSubmit={manejarEnvio}
            style={{
                border: skuDuplicado ? '1px solid #e74c3c' : ''
            }}
        >
            <h3>
                {modoEdicion ? "Editar Producto" : "Agregar nuevo producto"}
            </h3>
            <div>
                <label htmlFor="sku">SKU</label>
                <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]+"
                    placeholder="Ej: 2856"
                    name="sku"
                    id="sku"
                    value={datosForm.sku || ''}
                    onChange={manejarCambio}
                    required
                    disabled={modoEdicion}
                    style={skuDuplicado ? {borderColor: '#e74c3c'} : {}}
                />

                {skuDuplicado && (
                    <p className={styles.skuDuplicado}>
                        🚫 Este SKU ya está en uso. Por favor elija otro.
                    </p>
                )}

                {modoEdicion ? (
                    <small>⚠️ El SKU no puede modificarse porque se utiliza en la URL. Para modificarlo debes crear un <em>producto nuevo</em>.</small>
                ) : (    
                    !skuDuplicado && <small>Ingrese solo números sin espacios ni guiones.</small>
                )}

            </div>
            <div>
                <label htmlFor="nombre">Nombre del producto</label>
                <input
                    type="text"
                    placeholder="Ej: Barra de chocolate con leche"
                    name="nombre"
                    id="nombre"
                    value={datosForm.nombre}
                    onChange={manejarCambio}
                    required
                />
            </div>
            <div>
                <label htmlFor="categoria">Categoría</label>
                <input
                    type="text"
                    placeholder="Ej: Semiamargo"
                    name="categoria"
                    id="categoria"
                    value={datosForm.categoria}
                    onChange={manejarCambio}
                    required
                />
            </div>
            <div>
                <label htmlFor="detalle">Detalle</label>
                <textarea
                    type="text"
                    placeholder="Ej: Barra de chocolate con leche cubierto con una crocante capa de almendras acarameladas..."
                    name="detalle"
                    id="detalle"
                    value={datosForm.detalle}
                    onChange={manejarCambio}
                    required
                />
            </div>
            <div>
                <label htmlFor="precio">Precio</label>
                <input
                    type="number"
                    placeholder="Ej: 15000"
                    name="precio"
                    id="precio"
                    min="0"
                    value={datosForm.precio}
                    onChange={manejarCambio}
                    required
                />
            </div>
            <div>
                <label htmlFor="stock">Stock</label>
                <input
                    type="number"
                    placeholder="Ej. 7"
                    name="stock"
                    id="stock"
                    min="0"
                    value={datosForm.stock}
                    onChange={manejarCambio}
                    required
                />
            </div>
            <div>
                <label htmlFor="imagen">Imagen</label>
                <input
                    type="file"
                    id="imagen"
                    onChange={manejarCambioImagen}
                    required={!modoEdicion}
                />
            </div>
            <div className={styles.checkbox}>
                <label htmlFor="destacado">Producto Destacado</label>
                <input
                    type="checkbox"
                    name="destacado"
                    id="destacado"
                    checked={!!datosForm.destacado}
                    onChange={manejarCambio}
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
            <button
                className={styles.btnCancelar}
                type="button"
                disabled={loading}
                onClick={handleCancelar}
            >
                {modoEdicion ? "Salir del modo Edición" : "Limpiar formulario"}
            </button>
        </form>
    )
}

export default FormularioProducto