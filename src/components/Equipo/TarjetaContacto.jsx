import styles from './TarjetaContacto.module.css'

function TarjetaContacto( { nombre, email, puesto, foto }) {
    return (
        <div className={styles.card}>
            <div>
                <img
                    src={foto}
                    alt={nombre}
                    className={styles.foto}
                />
                <div>
                    <h6 className={styles.nombre}>{nombre}</h6>
                    <p>{puesto}</p>
                    <small>{email}</small>
                </div>
            </div>
        </div>
    )
}

export default TarjetaContacto