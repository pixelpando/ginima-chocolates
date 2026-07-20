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
import Registro from './components/Registro/Registro.jsx'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Inicio />} />
        <Route path='/productos' element={<Productos />} />
        <Route path='/productos/:sku' element={<ItemDetalle />} />
        {/* <Route path='/gestion/productos' element={<GestionProductos />} /> */}
        {/* <Route path='/gestion/cupones' element={<GestionCupones />} /> */}
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/registro' element={<Registro />} />

        <Route path='/gestion/productos' element={
            <ProtectedRoute rolesPermitidos={["admin"]}>
              <GestionProductos />
            </ProtectedRoute>
          }
        />

        <Route path='/gestion/cupones' element={
            <ProtectedRoute rolesPermitidos={["admin"]}>
              <GestionCupones />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
