
import { eliminarCliente, obtenerClientes } from './API.js'


(function () {
    const listado = document.querySelector('#listado-clientes');

    document.addEventListener('DOMContentLoaded', mostrarClientes);

    listado.addEventListener('click', confirmarEliminar);

    //mostando un cliente
    async function mostrarClientes() {
        const clientes = await obtenerClientes();

        clientes.forEach(cliente => {
            const { dni, nombre, apellido, sexo, numeroTelefono, id } = cliente;

            const row = document.createElement('tr');

            row.innerHTML += `
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
             

        });

    }



    function confirmarEliminar(e) {
        if(e.target.classList.contains('eliminar')){
            const clienteId = parseInt(e.target.dataset.cliente);

            
            ////////////////////
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success',
                  cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
              })
              
              swalWithBootstrapButtons.fire({
                title: 'Está seguro?',
                text: "No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, bórralo!',
                cancelButtonText: 'No, cancela!',
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {
                    
                    //elimina
                    eliminarCliente(clienteId)

                  swalWithBootstrapButtons.fire(
                    'Eliminado!',
                    'Su cliente ha sido eliminado.',
                    'success'
                  )
                } else if (
                  /* Read more about handling dismissals below */
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  swalWithBootstrapButtons.fire(
                    'Cancelado',
                    'Tu cliente está a salvo :)',
                    'error'
                  )
                }
              })



        }
    }

})();