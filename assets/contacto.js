document.getElementById("formulario").addEventListener("submit" , function(event) {
event.preventDefault();


let nombreYApellido =document.getElementById('nombreYApellido').value;
let email =document.getElementById("email").value;
let telefono =document.getElementById("telefono").value;
let mensaje =document.getElementById("mensaje").value;

let lista = document.getElementById("redes");
let indiceSeleccion = lista.value;
let redes = lista.options[indiceSeleccion].textContent;

let miembro = document.getElementById("socio");
let socio = miembro.checked;

let imagenAdjunta = document.getElementById("imagen").files.length > 0;

let validadorNombre = /^[A-Za-zÀ-Öà-ö][A-Za-zÀ-Öà-ö ]*$/;
let validadorEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let validadorTelefono = /^\d+$/;

if (validadorNombre.test(nombreYApellido)){
    if(validadorEmail.test(email)){
        if(validadorTelefono.test(telefono)){
            if(redes != "Seleccione una opción"){
                if(mensaje.length <= 450 && mensaje.length != 0){
                    if (socio && imagenAdjunta) {
                            document.getElementById("formulario").submit();
                            alert("FORMULARIO ENVIADO CORRECTAMENTE");
                        
                        }else if (socio == true && imagenAdjunta == 0) {
                        alert("Debes cargar la imagen de su carnet de socio antes de continuar");
                        event.preventDefault();
                        return false;
                    }else{
                        imagenAdjunta.value ="";
                        document.getElementById("formulario").submit();
                        alert("FORMULARIO ENVIADO CORRECTAMENTE");
                        }
                    
                }else{
                    alert("Debe escribir un mensaje o no superar los 450 caracteres");
                    event.preventDefault();
                    return false;
                }  
            }else{
                alert("Seleccione una opcion de la lista.");
                event.preventDefault();
                return false;
            }
        }else{
            alert("Número de teléfono vacio o inválido. Por favor, ingrese solo números.");
            event.preventDefault();
            return false;
        }
    }else{
        alert("Correo electrónico vacio o inválido.");
        event.preventDefault();
        return false;
    }
}else{
    alert("Nombre y apellido vacio o inválido.");
    event.preventDefault();
    return false;
}
});

function habilitar() {
    var imagen = document.getElementById("imagen");
    let miembro = document.getElementById("socio");

    if (miembro.checked) {
        imagen.disabled = false;
    } else {
        imagen.disabled = true;
    }
}
document.getElementById("socio").addEventListener("change", habilitar);

// CONTADOR DE CARACTERES RESTANTES

let textArea = document.getElementById("mensaje");
let contador = document.getElementById("contador");

// Añadir un evento de escucha para el evento input
textArea.addEventListener("input", function() {
    // Obtener la longitud del texto en el textarea
    let longitud = textArea.value.length;
    // Calcular los caracteres restantes
    let restantes = 450 - longitud;
    // Actualizar el contador de caracteres restantes
    contador.textContent = restantes;
  });

  document.getElementById('imagen').addEventListener('change', function() {
    var fileName = this.value.split('\\').pop();
    var label = document.querySelector('label[for="imagen"]');
    label.textContent = fileName ? fileName : 'Sin archivos seleccionados';
});