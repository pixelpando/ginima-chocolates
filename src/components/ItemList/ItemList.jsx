import styles from './ItemList.module.css'
import Item from '../Item/Item.jsx'

function ItemList({ productos }) {
    return (
        <div className={styles.productos}>
            {productos.map(prod => (
                <Item key={prod.id} {...prod} />
            ))}
        </div>
    )
}

export default ItemList