import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout.jsx'
import Inicio from './components/Inicio/Inicio.jsx'
import Productos from './components/Productos/Productos.jsx'
import ItemDetalle from './components/Productos/ItemDetalle/ItemDetalle.jsx'
import Cart from './components/Cart/Cart.jsx'
import GestionProductos from './components/GestionProductos/GestionProductos.jsx'
import GestionCupones from './components/GestionCupones/GestionCupones.jsx'
import Login from './components/Login/Login.jsx'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Inicio />} />
        <Route path='/productos' element={<Productos />} />
        <Route path='/productos/:sku' element={<ItemDetalle />} />
        <Route path='/admin/productos' element={<GestionProductos />} />
        <Route path='/admin/cupones' element={<GestionCupones />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />
      </Route>
    </Routes>
  )
}

export default App
