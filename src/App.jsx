import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout.jsx'
import Inicio from './components/Inicio/Inicio.jsx'
import Productos from './components/Productos/Productos.jsx'
import ItemDetalle from './components/Productos/ItemDetalle/ItemDetalle.jsx'
import Cart from './components/Cart/Cart.jsx'
import GestionProductos from './components/GestionProductos/GestionProductos.jsx'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Inicio />} />
        <Route path='/productos' element={<Productos />} />
        <Route path='/productos/:id' element={<ItemDetalle />} />
        <Route path='/gestion' element={<GestionProductos />} />
        <Route path='/cart' element={<Cart />} />
      </Route>
    </Routes>
  )
}

export default App
