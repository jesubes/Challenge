
import { mostrarAlerta, validar } from './funciones.js'
import { nuevoCliente } from './API.js'



(function() {
    const fromulario = document.querySelector('#formulario');
    fromulario.addEventListener('submit', validarCliente);

    function validarCliente(e){
        e.preventDefault();

        const dni = document.querySelector('#dni').value;
        const nombre = document.querySelector('#nombre').value;
        const apellido = document.querySelector('#apellido').value;
        const sexo = document.querySelector('#sexo').value;
        const numeroTelefono = document.querySelector('#numeroTelefono').value;

        const cliente = {
            dni,
            nombre,
            apellido,
            sexo,
            numeroTelefono
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