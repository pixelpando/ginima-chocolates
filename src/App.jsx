import { useState } from 'react'
import './App.css'
import Layout from './components/Layout/Layout.jsx'
import ItemListContainer from './components/ItemListContainer/ItemListContainer.jsx'
import Productos from './components/Productos/Productos.jsx'
import { FormularioContenedor } from './components/FormularioProducto/FormularioContenedor.jsx'

function App() {
  return (
    <>
      <Layout>
        {/* Todo esto es children */}

        <h2>¡Bienvenidos a Ginima! La mejor chocolatería de autor</h2>
        <p>Te proponemos experiencias dulces e innovadoras que llenen tu alma de chocolate.</p>

        <ItemListContainer Mensaje='Nuestros productos destacados' />
        <Productos Mensaje='Mirá todos nuestros productos'/>
        <FormularioContenedor />

      </Layout>
    </>
  )
}

export default App
