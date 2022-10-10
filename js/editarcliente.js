import { obtenerCliente, editarCliente } from './API.js';
import { mostrarAlerta, validar } from './funciones.js'

(function() {

    //campos que carga en el formulario
    const nombreInput = document.querySelector('#nombre')
    const emailInput = document.querySelector('#email')
    const empresaInput = document.querySelector('#empresa')
    const telefonoInput = document.querySelector('#telefono')
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
        const {nombre, empresa, email, telefono, id} = cliente

        nombreInput.value = nombre
        emailInput.value = email
        telefonoInput.value = telefono
        empresaInput.value = empresa
        idInput.value = id

    }


    function validarCliente(e) {
        e.preventDefault()


        const cliente = {
            nombre: nombreInput.value,
            email: emailInput.value,
            telefono: telefonoInput.value,
            empresa: empresaInput.value,
            id: parseInt(idInput.value)
        }


        if(validar(cliente)) {
            // Mostrar mensaje de campos incompletos
            console.log('Todos los campost son obligatorios!!!');
            mostrarAlerta('Todos los campos son obligatorios!!!');
            return
        }

        //Reescribe el objeto
        editarCliente(cliente)
    }
})();