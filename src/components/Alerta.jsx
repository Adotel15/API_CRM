
import React from 'react'

// Componente que sale para avisar que algun parámetro del formulario no es válido
const Alerta = ({children}) => {
  return (
    <div className='text-center p-3 my-4 bg-red-600 text-white font-bold uppercase'> 
        {children}
    </div>
  )
}

export default Alerta
