
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Spinner from '../components/Spinner';

const VerCliente = () => {

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
        
        cargando ? <Spinner /> :
            Object.keys(cliente).lenght === 0 ? <p>No hay Resultados</p> : 
            (
                <>
                    <h1 className="font-black text-4xl text-orange-800">Ver Cliente : {cliente.nombre}</h1>
                    <p className="mt-3">Ver Información del Cliente</p>

                    <p className='text-xl text-gray-700 mt-10'>
                        <span className='uppercase font-bold'> Cliente : </span> 
                        {cliente.nombre}
                    </p>

                    <p className='text-xl text-gray-600 mt-4'>
                        <span className='text-gray-800 uppercase font-bold'> Email : </span> 
                        {cliente.email}
                    </p>

                    <p className='text-xl text-gray-600 mt-4'>
                        <span className='text-gray-800 uppercase font-bold'> Teléfono : </span> 
                        {cliente.telefono}
                    </p>

                    <p className='text-xl text-gray-600 mt-4'>
                        <span className='text-gray-800 uppercase font-bold'> Empresa : </span> 
                        {cliente.empresa}
                    </p>

                    {cliente.notas && (

                            <p className='text-xl text-gray-600 mt-4'>
                                <span className='text-gray-800 uppercase font-bold'> Notas : </span> 
                                {cliente.notas}
                            </p>
                    )}
                </>
            )
    )
}

export default VerCliente
