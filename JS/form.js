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

let validadorNombre = /^[A-Za-zÀ-Öà-ö][A-Za-zÀ-Öà-ö ]*$/;
let validadorEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let validadorTelefono = /^\d+$/;

if (validadorNombre.test(nombreYApellido)){
    if(validadorEmail.test(email)){
        if(validadorTelefono.test(telefono)){
            if(redes !== ""){
                if(mensaje.length <= 200){
                    document.getElementById("formulario").submit();
                }else{
                    alert("Solo se permiten hasta 200 caracteres");
                    event.preventDefault();
                    return false;
                }
            }else{
                alert("Seleccione una opcion de la lista.");
                event.preventDefault();
                return false;
            }
        }else{
            alert("Número de teléfono inválido. Por favor, ingrese solo números.");
            event.preventDefault();
            return false;
        }
    }else{
        alert("Correo electronico invalido.");
        event.preventDefault();
        return false;
    }
}else{
    alert("Nombre invalido.");
    event.preventDefault();
    return false;
}


});