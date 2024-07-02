const url = 'https://foodies-backend-three.vercel.app/productos';
const contenedor = document.querySelector('tbody');
let resultados = '';

const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'));
const formArticulo = document.getElementById('formArticulo');
const nombre = document.getElementById('nombre');
const descripcion = document.getElementById('descripcion');
const precio = document.getElementById('precio');
const stock = document.getElementById('stock');
const imagenes = document.getElementById('imagenes');
let idForm = 0;
let opcion = '';


// Limpia los campos del formulario y abre el modal para la creación de un nuevo producto.
document.getElementById('btnCrear').addEventListener('click', () => {
    nombre.value = '';
    descripcion.value = '';
    precio.value = '';
    stock.value = '';
    imagenes.value = '';
    modalArticulo.show();
    opcion = 'crear';
});

// Muestra los productos en la tabla
const mostrar = (articulos) => {
    resultados = '';
    if (Array.isArray(articulos)) {
        articulos.forEach(articulo => {
            // Verifica si existe articulo.imagenes y es un array antes de usar map
            const imagenesHtml = articulo.imagenes && Array.isArray(articulo.imagenes)
                ? articulo.imagenes.map(img => `<img src="${img.url}" class="image-preview">`).join('')
                : '';
            resultados += `
            <tr>
                <td>${articulo.id}</td>
                <td>${articulo.nombre}</td>
                <td>${articulo.descripcion}</td>
                <td>${articulo.precio}</td>
                <td>${articulo.stock}</td>
                <td>${imagenesHtml}</td>
                <td class="text-center">
                    <a class="btnEditar btn btn-primary">Editar</a>
                    <a class="btnBorrar btn btn-danger">Borrar</a>
                </td>
            </tr>`;
        });
    } else {
        console.error('Los datos recibidos no son un array válido.');
    }
    contenedor.innerHTML = resultados;
};

// Realiza una solicitud GET al servidor para obtener la lista de productos
fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error));

// Función para manejar eventos delegados
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e);
        }
    });
};

// Eliminar producto
on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode;
    const id = fila.firstElementChild.innerHTML;
    alertify.confirm("Desea eliminar el producto.",
        function () {
            fetch(`${url}/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(() => location.reload())
                .catch(error => console.log(error));
            alertify.success('Ok');
        },
        function () {
            alertify.error('Cancel');
        });
});

// Editar producto
on(document, 'click', '.btnEditar', e => {
    const fila = e.target.parentNode.parentNode;
    idForm = fila.children[0].innerHTML;
    const nombreForm = fila.children[1].innerHTML;
    const descripcionForm = fila.children[2].innerHTML;
    const precioForm = fila.children[3].innerHTML;
    const stockForm = fila.children[4].innerHTML;
    const imagenesForm = Array.from(fila.children[5].querySelectorAll('img')).map(img => img.src).join(',');

    nombre.value = nombreForm;
    descripcion.value = descripcionForm;
    precio.value = precioForm;
    stock.value = stockForm;
    imagenes.value = imagenesForm;
    opcion = 'editar';
    modalArticulo.show();
});

// Crear y editar productos 
formArticulo.addEventListener('submit', (e) => {
    e.preventDefault();
    const imagenesArray = imagenes.value.split(',').map(url => ({ url }));

    if (opcion === 'crear') {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre.value,
                descripcion: descripcion.value,
                precio: precio.value,
                stock: stock.value,
                imagenes: imagenesArray
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la creación del producto');
            }
            return response.json();
        })
        .then(data => {
            mostrar([data]);
            alertify.success('Producto creado exitosamente');
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud Fetch:', error);
            alertify.error('Error al crear el producto');
        });
    }

    if (opcion === 'editar') {
        fetch(`${url}/${idForm}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre.value,
                descripcion: descripcion.value,
                precio: precio.value,
                stock: stock.value,
                imagenes: imagenesArray
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la edición del producto');
            }
            return response.json();
        })
        .then(() => {
            location.reload();
            alertify.success('Producto editado exitosamente');
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud Fetch:', error);
            alertify.error('Error al editar el producto');
        });
    }
    modalArticulo.hide();
});
