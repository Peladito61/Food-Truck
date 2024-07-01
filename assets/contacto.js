document.getElementById("formulario").addEventListener("submit", function (event) {
   event.preventDefault();

   let nombreYApellido = document.getElementById('nombreYApellido').value;
   let email = document.getElementById("email").value;
   let telefono = document.getElementById("telefono").value;
   let mensaje = document.getElementById("mensaje").value;

   let lista = document.getElementById("redes");
   let indiceSeleccion = lista.value;
   let redes = lista.options[indiceSeleccion].textContent;

   let validadorNombre = /^[A-Za-zÀ-Öà-ö][A-Za-zÀ-Öà-ö ]*$/;
   let validadorEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
   let validadorTelefono = /^\d+$/;

   if (validadorNombre.test(nombreYApellido)) {
      if (validadorEmail.test(email)) {
         if (validadorTelefono.test(telefono)) {
            if (redes != "Seleccione una opción") {
               if (mensaje.length <= 450 && mensaje.length != 0) {
                  alert("¡Formulario enviado correctamente!");
                  document.getElementById("formulario").reset();
               } else {
                  alert("Debe escribir un mensaje o no superar los 450 caracteres");
               }
            } else {
               alert("Seleccione una opción de la lista.");
            }
         } else {
            alert("Número de teléfono vacío o inválido. Por favor, ingrese solo números.");
         }
      } else {
         alert("Correo electrónico vacío o inválido.");
      }
   } else {
      alert("Nombre y apellido vacío o inválido.");
   }
});
