document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('pedidoForm');
    const totalPrecioSpan = document.getElementById('totalPrecio');
    const productosContainer = document.getElementById('productosContainer');
    const popupPedido = document.getElementById('popupPedido');
    const numeroPedido = document.getElementById('numeroPedido');

    // Variable para almacenar los productos con su información
    let productosData = [];

    // Hacer una solicitud al backend para obtener la lista de productos
    fetch('https://foodies-backend-three.vercel.app/productos')
        .then(response => response.json())
        .then(productos => {
            productosData = productos; // Almacenar los productos para referencia

            productos.forEach(producto => {
                // Crear elementos HTML para cada producto
                const divProducto = document.createElement('div');
                divProducto.classList.add('producto-item');

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = producto.id;
                checkbox.id = `producto-${producto.id}`;
                checkbox.addEventListener('change', actualizarTotal);

                const label = document.createElement('label');
                label.textContent = `${producto.nombre} - ${producto.precio} `;

                const cantidadInput = document.createElement('input');
                cantidadInput.type = 'number';
                cantidadInput.value = 0;
                cantidadInput.min = 0;
                cantidadInput.addEventListener('input', actualizarTotal);

                divProducto.appendChild(checkbox);
                divProducto.appendChild(label);
                divProducto.appendChild(cantidadInput);

                productosContainer.appendChild(divProducto);
            });
        });

    // Función para actualizar el total del pedido
    function actualizarTotal() {
        let total = 0;
        const productosSeleccionados = document.querySelectorAll('.producto-item input[type="checkbox"]:checked');

        productosSeleccionados.forEach(producto => {
            const id = producto.value;
            const cantidad = parseInt(producto.nextElementSibling.nextElementSibling.value);
            const precioUnitario = productosData.find(p => p.id === parseInt(id)).precio;
            total += precioUnitario * cantidad;
        });

        totalPrecioSpan.textContent = total.toFixed(2);
    }

    // Enviar el pedido al backend al enviar el formulario
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const productos = [];
        const productosSeleccionados = document.querySelectorAll('.producto-item input[type="checkbox"]:checked');

        productosSeleccionados.forEach(producto => {
            const id = producto.value;
            const cantidad = parseInt(producto.nextElementSibling.nextElementSibling.value);
            const precioUnitario = productosData.find(p => p.id === parseInt(id)).precio;
            productos.push({ id, cantidad, precioUnitario });
        });

        const nombreCliente = document.getElementById('nombreCliente').value;
        const emailCliente = document.getElementById('emailCliente').value;

        const precioTotal = parseFloat(totalPrecioSpan.textContent);

        const data = {
            nombreCliente,
            emailCliente,
            precioTotal,
            entregado: false,
            productos
        };

        fetch('https://foodies-backend-three.vercel.app/pedidos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(response => {
            // Mostrar popup con el número de pedido y vaciar el formulario
            numeroPedido.textContent = `¡Pedido realizado! # de pedido: ${response.pedidoId}`;
            popupPedido.style.display = 'block';
            form.reset(); // Vaciar el formulario después de enviar el pedido
        })
        .catch(error => {
            console.error('Error al crear pedido:', error);
            alert('Ocurrió un error al crear el pedido.');
        });
    });

    // Función para cerrar el popup de pedido
    const closeButton = document.querySelector('.popup-content .close');
    closeButton.addEventListener('click', cerrarPopupPedido);

    function cerrarPopupPedido() {
        popupPedido.style.display = 'none';
    }
});
