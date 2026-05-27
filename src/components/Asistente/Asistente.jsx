import styles from './Asistente.module.css'

const asistentes = [
    { nombre: 'Juan Pérez', tarea: 'Fronted Developer', emoji: '🖍️' },
    { nombre: 'Ana Gómez', tarea: 'Diseñadora UX/UI', emoji: '🎨' },
    { nombre: 'Carlos Ruiz', tarea: 'Backend Developer', emoji: '⌨️' }
];

function Asistente(props) {
    return (
        <div className={styles.asistente}>
            <h3 className={styles.nombre}>{props.nombre}</h3>
            <p className={styles.tarea}>{props.tarea} <span className={styles.emoji}>{props.emoji}</span></p>
        </div>
    );
}

function Asistentes() {
    return (
          <section>
            <h2>Equipo de trabajo</h2>
            <ul className='auto-grid'>
              {asistentes.map((asistente, index) => (
                <li  key={index}><Asistente {...asistente} /></li>
              ))}
            </ul>
          </section>
    );
}

export default Asistentes