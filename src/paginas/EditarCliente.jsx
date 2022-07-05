
import Formulario from '../components/Formulario'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const EditarCliente = () => {

  const { id } = useParams();
  const [cliente, setCliente] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(() => {

      setCargando(true);

      const obtenerClientesApi = async () => {

          try {

              const url = `http://localhost:4000/clientes/${id}`
              const respuesta = await fetch(url);
              const resultado = await respuesta.json()

              setCliente(resultado);

          } catch (error) {
              console.log(error)
          }

          setCargando(false);
      }

      obtenerClientesApi()

  }, [])


  return (
    <>
        <h1 className="font-black text-4xl text-orange-800">Editar Cliente</h1>
        <p className="mt-3">Modifica los datos del cliente</p>

        {cliente?.nombre ? 
        (
          <Formulario
            cliente={cliente}
            cargando={cargando}
          />
        ) : <p className='text-center text-3xl font-bold text-orange-800 mt-10'>Cliente ID no válido</p>}

    </>
  )
}

export default EditarCliente
