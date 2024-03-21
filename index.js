const URL = "https://fakestoreapi.com/products";


let productos = document.getElementById("productos");


let overlay = document.getElementById("overlay");


let mostrarFormularioBtn = document.getElementById("mostrar-formulario");


let cerrarFormularioBtn = document.getElementById("cerrar-formulario");


function getData() {
    
    let productosGuardados = JSON.parse(localStorage.getItem('productos'));

    
    if (productosGuardados && productosGuardados.length > 0) {
        mostrarProductos(productosGuardados);
    }

    
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            
            mostrarProductos(data);

            
            localStorage.setItem('productos', JSON.stringify(data));
        });
}


function mostrarProductos(productosArray) {
    
    let tabla = "<div class='card'>";
    
    
    for (let i = 0; i < productosArray.length; i++) {
        
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        
        
        let precio = productosArray[i].price;
        
        
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


cerrarFormularioBtn.addEventListener("click", function() {
    overlay.style.display = "none";
});


document.getElementById("formulario-producto").addEventListener("submit", agregarProducto);


getData();