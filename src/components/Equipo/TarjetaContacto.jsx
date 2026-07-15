import styles from './TarjetaContacto.module.css'

function TarjetaContacto( { nombre, email, puesto, foto, linkedin }) {
    return (
        <div className={styles.card}>
            <img
                src={foto}
                alt={nombre}
                className={styles.foto}
            />
            <div>
                <h6 className={styles.nombre}>{nombre}</h6>
                <p><strong>{puesto}</strong></p>
                <p>{email}</p>
                <small><a className={styles.link} href={linkedin} target="_blank" rel="noopener noreferrer">Perfil LinkedIn</a></small>
            </div>
        </div>
    )
}

export default TarjetaContacto