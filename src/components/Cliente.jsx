
import { useNavigate } from 'react-router-dom'

// Tarjeta del cliente en la sección de clientes
// Tiene adjunto tres botones uno para ver, otro para editar y otro para eliminar
// Es una tabla (tr), con 4 filas(td):
//  1. Nombre
//  2. Email y Teléfono
//  3. Empresa
//  4. Botones
const Cliente = ({cliente, handleEliminar}) => {

    // Hook para navegar
    const navigate = useNavigate();

    // Hacemos destructuring de las variables que nos viene como prop
    const {nombre, empresa, email, telefono, notas, id} = cliente
  
    return (
    <tr className='border-b hover:bg-gray-50'>
      <td className="p-3">{nombre}</td>
      <td className="p-3">
        <p><span className='text-gray-800 uppercase font-bold'>Email: </span> {email} </p>
        <p><span className='text-gray-800 uppercase font-bold'>Tel: </span> {telefono} </p>
      </td>
      <td className="p-3">{empresa}</td>
      <td className="p-3">

      <button 
            type="button"
            className='bg-yellow-500 hover:bg-yellow-700 block w-full text-white p-2 uppercase font-bold text-xs'
            onClick={() => navigate(`/clientes/${id}`)}
        >Ver</button>

        <button 
            type="button"
            className='bg-orange-600 mt-3 hover:bg-orange-700 block w-full text-white p-2 uppercase font-bold text-xs'
            onClick={() => navigate(`/clientes/editar/${id}`)}
        >Editar</button>

        <button 
            type="button"
            className='bg-blue-600 mt-3 hover:bg-blue-800 block w-full text-white p-2 uppercase font-bold text-xs'
            onClick={() => handleEliminar(id) // Llamamos a la función de eliminar con el id del cliente en cuestión
            }
            >Eliminar</button>

      </td>
    </tr>
  )
}

export default Cliente
