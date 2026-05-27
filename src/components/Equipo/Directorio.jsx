import { useState, useEffect } from "react";
import TarjetaContacto from "./TarjetaContacto.jsx";

function Directorio() {
    const [contactos, setContactos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/data/nosotros.json')
        .then(res => {
            if(!res.ok) throw new Error("Error de carga");
            return res.json();
        })
        .then(data => {
            setContactos(data);
            setCargando(false);
        })
        .catch(err => {
            setError(err.message);
            setCargando(false);
        })
    }, [])

    if (cargando) return <p>Cargando datos...</p>

    if (error) return <p>Error: {error}</p>

    return (
        <section>
            <div className="auto-grid" style={{gap: '2rem'}}>
                {contactos.map(contacto => (
                    <TarjetaContacto key={contacto.id} {... contacto} />
                ))}
            </div>
        </section>
    )
}

export default Directorio