
import { mostrarAlerta, validar } from './funciones.js'
import { nuevoCliente } from './API.js'



(function() {
    const fromulario = document.querySelector('#formulario');
    fromulario.addEventListener('submit', validarCliente);

    function validarCliente(e){
        e.preventDefault();

        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        const cliente = {
            nombre,
            email,
            telefono,
            empresa
        }


        if(validar(cliente)) {
            // Mostrar mensaje de campos incompletos
            console.log('Todos los campost son obligatorios!!!');
            mostrarAlerta('Todos los campost son obligatorios!!!');
            return
        }
        
        nuevoCliente(cliente);
        console.log('Si se paso la validacion!!!')
    }




})();