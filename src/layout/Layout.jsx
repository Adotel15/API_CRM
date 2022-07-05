
// Oulet => Son todos los Componentes que se imprimirán desde el Layout que es la página principal, 1/4 siempre sera igual porque es el Layout, el resto depende del componente
// Link => Otra versión de <a> pero que es más eficiente porque no recarga toda la página, en vez de href para el link se usa to
// useLocation es un Hook que te da información sobre la página actual mostrandose en pantalla, con el .pathName tenemos justo la dirección la cual podemos usar para comparar
import { Outlet, Link, useLocation } from 'react-router-dom'

const Layout = () => {

    // Uso del Hook de location
    const location = useLocation();
    // Cogemos la dirección exacta
    const urlActual = location.pathname

    return (
        // Toda la Página estará dentro de este div
        <div className='md:flex md:min-h-screen'>

            {/* Barra Lateral -> Igual en todas las páginas 1/4 de página, este es el div del Layout se imprime siempre*/}
            <div className='md:w-1/4 bg-orange-300 px-5 py-10'>

                <h2 className='text-4xl font-black text-center text-white'>CRM - Clientes</h2>

                {/* Crea una barra de navegación donde poder clickar a varios sitios en este caso Links */}
                <nav className='mt-10'>
                    {/* Link te permite sustituir <a> de tal manera que no se recarga la página
                    para cargar los componentes, en vez de href= se usa to=*/}
                    <Link
                        className={`${urlActual === '/clientes' ? 'text-orange-800' : 'text-white' } text-xl block mt-2 font-black hover:text-orange-800`}
                        to='/clientes'
                    >
                        Clientes
                    </Link>

                    <Link
                        className={`${urlActual === '/clientes/nuevo' ? 'text-orange-800' : 'text-white' } text-xl block mt-2 font-black hover:text-orange-800`}
                        to='/clientes/nuevo'
                    >
                        Nuevo Cliente
                    </Link>
                </nav>

            </div>

            {/* Esta es la página que cambia depende del componente 3/4 de página, se imprimirá al lado del Layout */}
            <div className='md: w-3/4 p-10 md:h-screen overflow-scroll'>
                <Outlet />
            </div>

        </div>
    )
}

export default Layout
