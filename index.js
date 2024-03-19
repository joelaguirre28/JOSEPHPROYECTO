// URL de la API que proporciona los productos
const URL = "https://fakestoreapi.com/products";

// Elemento HTML donde se mostrarán los productos
let productos = document.getElementById("productos");

// Elemento HTML del overlay que contiene el formulario
let overlay = document.getElementById("overlay");

// Elemento HTML del botón para mostrar el formulario
let mostrarFormularioBtn = document.getElementById("mostrar-formulario");

// Elemento HTML del botón para cerrar el formulario
let cerrarFormularioBtn = document.getElementById("cerrar-formulario");

// Función para obtener los datos de la API y mostrar los productos
function getData() {
    // Obtener los productos almacenados localmente
    let productosGuardados = JSON.parse(localStorage.getItem('productos'));

    // Si hay productos almacenados localmente, mostrarlos
    if (productosGuardados && productosGuardados.length > 0) {
        mostrarProductos(productosGuardados);
    }

    // Obtener los datos de la API
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            // Mostrar los productos de la API
            mostrarProductos(data);

            // Guardar los productos obtenidos de la API en el almacenamiento local
            localStorage.setItem('productos', JSON.stringify(data));
        });
}

// Función para mostrar productos en la página
function mostrarProductos(productosArray) {
    // Inicializa una cadena que contendrá el HTML de la tabla de productos
    let tabla = "<div class='card'>";
    
    // Itera sobre el array de productos recibido como parámetro
    for (let i = 0; i < productosArray.length; i++) {
        // Genera valores aleatorios para los componentes de color RGB
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        
        // Obtiene el precio del producto actual
        let precio = productosArray[i].price;
        
        // Construye el bloque HTML para cada producto
        let bloqueHtml =
            `
            <div class='card-item'>
                <div class='cabecera' style="background: rgb(${r}, ${g}, ${b});"></div>
                <div class='cont-img'>
                    <img src="${productosArray[i].image}" />
                </div>
                <p class='titulo'>${productosArray[i].title}</p>
                <p>$${precio} <span class='precio-sd'>$${((precio * 0.1) + precio).toFixed(2)}</span> </p>
                <label class='categoria'>${productosArray[i].category}</label>
                <button class='btn-eliminar' onclick='eliminarProducto(${i})'>Eliminar</button>
            </div>
            `;
        
        // Agrega el bloque HTML generado al contenido de la tabla
        tabla += bloqueHtml;
    }
    
    // Cierra la etiqueta de div que envuelve todos los productos
    tabla += "</div>";
    
    // Inserta el HTML generado en el contenedor de productos en la página
    productos.innerHTML = tabla;
  }

// Función para eliminar un producto de la lista
function eliminarProducto(index) {
  // Obtener los productos almacenados localmente
  let productosGuardados = JSON.parse(localStorage.getItem('productos'));

  // Eliminar el producto del array
  productosGuardados.splice(index, 1);

  // Actualizar los productos en la página
  mostrarProductos(productosGuardados);

  // Guardar los productos actualizados en el almacenamiento local
  localStorage.setItem('productos', JSON.stringify(productosGuardados));
}

// Función para agregar un nuevo producto desde el formulario
function agregarProducto(event) {
    event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

    // Obtener los valores del formulario
    let title = document.getElementById("titulo").value;
    let price = parseFloat(document.getElementById("precio").value);
    let category = document.getElementById("categoria").value;
    let image = document.getElementById("imagen").value;

    // Crear un objeto con los datos del nuevo producto
    let nuevoProducto = {
        title: title,
        price: price,
        category: category,
        image: image
    };

    // Obtener los productos almacenados localmente
    let productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];

    // Agregar el nuevo producto al array de productos
    productosGuardados.push(nuevoProducto);

    // Actualizar los productos en la página
    mostrarProductos(productosGuardados);

    // Guardar los productos actualizados en el almacenamiento local
    localStorage.setItem('productos', JSON.stringify(productosGuardados));

    // Ocultar el formulario
    overlay.style.display = "none";

    // Limpiar el formulario después de agregar el producto
    document.getElementById("formulario-producto").reset();
}

// Mostrar formulario al hacer clic en el botón "+"
mostrarFormularioBtn.addEventListener("click", function() {
    overlay.style.display = "block";
});

// Ocultar formulario al hacer clic en el botón "Cerrar"
cerrarFormularioBtn.addEventListener("click", function() {
    overlay.style.display = "none";
});

// Agregar evento de escucha para el envío del formulario
document.getElementById("formulario-producto").addEventListener("submit", agregarProducto);

// Llamar a la función getData para mostrar los productos iniciales
getData();