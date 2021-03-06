
import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from '../components/Spinner'

// Componente para el Formulario, se reutiliza para Agregar o para Editar
const Formulario = ({cliente, cargando}) => {

  const navigate = useNavigate();

  // Esto es para las validaciones
  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
                  .min(3, "El nombre es muy corto")
                  .max(40, "El nombre es muy largo")
                  .required("El nombre es obligatorio"),
    empresa: Yup.string()
                  .required("El nombre de la Empresa es Obligatorio"),
    email: Yup.string()
                  .required("El email es obligatorio")
                  .email("Email no válido"),
    telefono: Yup.number()
                  .integer("Número no válido")
                  .positive("El número tiene que ser positivo")
                  .typeError("El número no es válido")
  })

  // Para el formulario en vez de usar un formulario hecho a mano, y que validamos con una función propia cogemos una libreria hecha que es Formik, y Yup para las validaciones

    const handleSubmit = async (valores) => {
        try {

          let respuesta

          if(cliente.id)
          {
            // Editando, sobreescribimos los valors con PUT
            const url = `http://localhost:4000/clientes/${cliente.id}`;

              respuesta = await fetch(url, {
              method: "PUT",
              body: JSON.stringify(valores),
              headers: {
                'Content-Type': 'application/json' 
              }}
            )

          } else {
            // Nuevo registro, creamos un nuevo registro con POST
            const url = "http://localhost:4000/clientes";

              respuesta = await fetch(url, {
              method: "POST",
              body: JSON.stringify(valores),
              headers: {
                'Content-Type': 'application/json' 
              }
            })
          }

          console.log(respuesta)
          const resultado = await respuesta.json()
          console.log(resultado)

          navigate('/clientes')

        } catch (error) {
          console.log(error);
        }
    }

  return (
    // Si esta cargando ponemos el Spinner sino mostramos el formulario
    cargando ? <Spinner />
    :
    (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
      <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente' }</h1>

      {/* 
        Abrimos el formulario de Formik, y las varibles que queremos en el formulario se guardan en initalValues 
        Si existen variables en cliente, las ponemos sino dejamos vacio, se rellena automaticamente

      */}
      <Formik
        initialValues={{
            nombre: cliente?.nombre ?? '',
            empresa: cliente?.empresa ?? '',
            email: cliente?.email ?? '',
            telefono: cliente?.telefono ?? '',
            notas: cliente?.notas ?? ''
        }}

        enableReinitialize={true}

        onSubmit={ async (valores, {resetForm}) => {
            await handleSubmit(valores);

            resetForm();
        }}

        validationSchema = {nuevoClienteSchema}
      >
          {/* Abrimos como tal el formulario, cada field es el input, el label se hace a mano, el form se abre dentro de un arrow function*/}
          {({errors, touched}) => {
            
            return ( 
            <Form className='mt-10'>

              <div className='mb-4'>
                    <label className='text-gray-800'
                            htmlFor='nombre'>Nombre :</label>
                    <Field 
                        id="nombre"
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Nombre del Cliente"
                        name="nombre"
                    />

                    {errors.nombre && touched.nombre ?
                    (
                      <Alerta>{errors.nombre}</Alerta>
                    )
                    :
                    null
                    }
                    
              </div>

              <div className='mb-4'>
                    <label className='text-gray-800'
                            htmlFor='empresa'>Empresa :</label>
                    <Field 
                        id="empresa"
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Empresa del Cliente"
                        name="empresa"
                    />

                    {errors.empresa && touched.empresa ?
                    (
                      <Alerta>{errors.empresa}</Alerta>
                    )
                    :
                    null
                    }
                    


              </div>

              <div className='mb-4'>
                    <label className='text-gray-800'
                            htmlFor='email'>Email :</label>
                    <Field 
                        id="email"
                        type="email"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Email del Cliente"
                        name="email"
                    />

                  {errors.email && touched.email ?
                    (
                      <Alerta>{errors.email}</Alerta>
                    )
                    :
                    null
                    }



              </div>

              <div className='mb-4'>
                    <label className='text-gray-800'
                            htmlFor='telefono'>Teléfono :</label>
                    <Field 
                        id="telefono"
                        type="tel"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Teléfono del Cliente"
                        name="telefono"
                    />

                    {errors.telefono && touched.telefono ?
                    (
                      <Alerta>{errors.telefono}</Alerta>
                    )
                    :
                    null
                    }



              </div>

              <div className='mb-4'>
                    <label className='text-gray-800'
                            htmlFor='notas'>Notas :</label>
                    <Field 
                        as="textarea"
                        id="notas"
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-50 h-40"
                        placeholder="Notas del Cliente"
                        name="notas"
                    />
              </div>

              <input 
                type="submit"
                value={cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
                className="mt-5 w-full bg-orange-600 p-3 text-white uppercase font-bold text-lg  hover:bg-orange-900 cursor-pointer transition-all"
              />

          </Form>
          )}}

      </Formik>
    </div>
    )
  )
}

Formulario.defaultProps = {
  cliente: {},
  cargando: false
}

export default Formulario
