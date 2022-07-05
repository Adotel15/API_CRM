
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Inicio from './paginas/Inicio'
import NuevoCliente from './paginas/NuevoCliente'
import EditarCliente from './paginas/EditarCliente'
import VerCliente from './paginas/VerCliente'

function App() {

  // BrowserRouter, y Routes son las bases para crear diferentes páginas en REACT
  // Luego está las Route, de las cuales puedes decirle el path que tendrán, y si ponen un Route dentro de otro pasa a ser ruta hija
  // En este caso todas las rutas están todas dentros del path /clientes, que tiene el componente de Layout que es el navegador a la parte izquierda de la página
  // Así que este siempre saldrá, y luego en función del otro path /clientes/x cambiará el contenido de la derecha
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/clientes" element={<Layout />}>
          <Route index element={<Inicio />}/>
          <Route path="nuevo" element={<NuevoCliente />}/>
          <Route path="editar/:id" element={<EditarCliente />}/>
          <Route path=":id" element={<VerCliente />}/>
        </Route>

      </Routes>
    </BrowserRouter> 
  )
}

export default App
