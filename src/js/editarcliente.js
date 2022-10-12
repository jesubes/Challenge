import { obtenerCliente, editarCliente } from './API.js';
import { mostrarAlerta, validar } from './funciones.js'

(function() {

    //campos que carga en el formulario
    const dniInput = document.querySelector('#dni')
    const nombreInput = document.querySelector('#nombre')
    const apellidoInput = document.querySelector('#apellido')
    const sexoInput = document.querySelector('#sexo')
    const numeroTelefonoInput = document.querySelector('#numeroTelefono')
    const idInput = document.querySelector('#id')



    document.addEventListener('DOMContentLoaded', async () => {
        const parametrosURL = new URLSearchParams(window.location.search);
    
        const idCliente = parseInt( parametrosURL.get('id'));

       const cliente = await obtenerCliente(idCliente);

       mostrarCliente(cliente)

       //Submit al formulario
       const formulario = document.querySelector('#formulario')
       formulario.addEventListener('submit', validarCliente)

    })

    
    function mostrarCliente(cliente) {
        const { dni, nombre, apellido, sexo, numeroTelefono, id} = cliente

        dniInput.value = dni
        nombreInput.value = nombre
        apellidoInput.value = apellido
        sexoInput.value = sexo
        numeroTelefonoInput.value = numeroTelefono
        idInput.value = id

    }


    function validarCliente(e) {
        e.preventDefault()


        const cliente = {
            dni: dniInput.value,
            nombre: nombreInput.value,
            apellido: apellidoInput.value,
            sexo: sexoInput.value,
            numeroTelefono: numeroTelefonoInput.value,
            id: parseInt(idInput.value)
        }


        if(validar(cliente)) {
            // Mostrar mensaje de campos incompletos
            console.log('Todos los campost son obligatorios!!!');
            mostrarAlerta('Todos los campos son obligatorios!!!');
            return
        }


        // ////////
        Swal.fire({
             position: 'center',
            icon: 'success',
            title: 'Guardado con Exito!',
            showConfirmButton: true,
            timer: 1500
        })


        //Reescribe el objeto
        setTimeout(()=>{
            editarCliente(cliente)
        }, 1400); 
    }
})();