import styles from './Contador.module.css'
import { useState, useEffect } from "react";

function Contador() {
    const [contador, setContador] = useState(0);

    useEffect(() => {
        console.log("El componente se renderizó o el contador cambió.");
    }, [contador]);

    const incrementar = () => {
        setContador(contador + 1);
    }

    const decrementar = () => {
        if (contador < 1) {
            setContador(contador);
        } else {
            setContador(contador - 1);
        }
    }

    return (
        <div className={styles.contador}>
            <h3>Contador de ejemplo</h3>
            <button className={styles.btn} onClick={decrementar}>-</button>
            <span><strong style={{color: 'var(--accent)', fontSize: '1.25rem'}}>{contador}</strong></span>
            <button className={styles.btn} onClick={incrementar}>+</button>
        </div>
    )
}

export default Contador