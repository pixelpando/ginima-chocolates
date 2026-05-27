import styles from './ItemListContainer.module.css'
import ItemList from '../ItemList/ItemList.jsx'

function ItemListContainer({ Mensaje }) {
    const productos = [
        {
            id: '101',
            nombre: 'Duo Pistacho',
            precio: 20000,
            stock: 15,
            imagen: '/images/duo-pistacho.jpg'
        },
        {
            id: '102',
            nombre: 'Luxury',
            precio: 42900,
            stock: 7,
            imagen: '/images/luxury.jpg'
        },
        {
            id: '103',
            nombre: 'Pure Mint',
            precio: 19000,
            stock: 13,
            imagen: '/images/pure-mint.jpg'
        }
    ];

    return (
        <section>
            <h2 className={styles.destacado}>{Mensaje}</h2>
            <div>
                <ItemList productos={productos} />
            </div>
        </section>
    )
}
export default ItemListContainer