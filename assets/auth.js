document.addEventListener('DOMContentLoaded', function() {
const token = localStorage.getItem('token');

if (!token) {
    //si no hay token , enviarlo a que se logee
    window.location.href = "cositoParaAdministracion.html"
} else {
//si hay token , reliza comprbacion en el back si es valido
const xhr = new XMLHttpRequest();
const backendUrl = 'https://foodies-backend-three.vercel.app';

xhr.open('GET', backendUrl + '/auth/protected' , true);
xhr.setRequestHeader('Authorization', 'Bearer ' + token);

xhr.onload = function() {
    if (xhr.status === 200) {
        //token valido, permite el acceso al contenido protegido
        console.log('acceso permitido');
    } else{
        //token invalido o expirado, mandar a logear
        console.log('acceso no permitido, inicie sesion');
        windows.location.href = 'cositoParaAdministracion.html';
    }
};

xhr.onerror = function() {
    //error al comunicarse con el back end.
    console.error('error al verificar el token');
    window.location.href = 'cositoParaAdministracion.html'
};

xhr.send();
}

});