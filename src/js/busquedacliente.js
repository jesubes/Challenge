import { eliminarCliente, obtenerClientes } from './API.js'

const listado = document.querySelector('#listado-clientes')
const dniBusqueda = document.querySelector('#dni')
const buscar = document.querySelector('#buscar')


buscar.addEventListener('submit', buscarCliente)

listado.addEventListener('click', confirmarEliminar);


async function buscarCliente(e) {
    e.preventDefault();
    const row = document.createElement('tr');
    const clientes = await obtenerClientes();

    listado.innerHTML = ''

    clientes.forEach(cliente => {
        let dniClientes = cliente.dni;

        if(dniClientes == dniBusqueda.value){
            
            const { dni, nombre, apellido, sexo, numeroTelefono, id } = cliente;
          
            row.innerHTML = `
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <p class="text-sm leading-10 text-gray-700"> ${dni} </p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                            <p class="text-gray-700">${nombre}</p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                            <p class="text-gray-700">${apellido}</p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                            <p class="text-gray-600">${sexo}</p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                            <p class="text-gray-600">${numeroTelefono}</p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                            <a href="../src/editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                            <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
                        </td>
            `;

            listado.appendChild(row);
        } 
    })
    
    if(row.innerHTML == ''){
        console.log('No encontrado...')

        ////////
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El cliente No se encuentra en la Base de Datos!',
          })


    }

}

function confirmarEliminar(e) {
    if(e.target.classList.contains('eliminar')){
        const clienteId = parseInt(e.target.dataset.cliente);

        const confirmar = confirm('Deseas eliminar este registro?');

        if(confirmar) {
            eliminarCliente(clienteId)
            window.location.href = '../public/index.html';
        }

    }
}