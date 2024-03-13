const URL = "https://fakestoreapi.com/products";
let productos = document.getElementById("productos")
let tabla = "<div class='card'>";
function getData(){
    fetch(URL)
    .then( response => response.json() )
    .then( data => {
        let productosCardSet = JSON.stringify(data)
        localStorage.setItem('productos', productosCardSet)
        console.log("productosCardSet: ",productosCardSet)

        let productosCardGet = localStorage.getItem('productos')
        let listaProducto = JSON.parse(productosCardGet)
        console.log("listaProducto: ",listaProducto)


        for(let i = 0; i < data.length; i++ ){
            //rgb(r g b)
            let r =Math.floor(Math.random()*256)
            let g =Math.floor(Math.random()*256)
            let b =Math.floor(Math.random()*256)
            let precio = data[i].price
            console.log("colo r:", r , g , b)

             let bloqueHtml = 
             `
             <div class='card-item'>
                <div class='cabecera' style="background: rgb(${r} ${g} ${b} );" ></div>
                <div class='cont-img'>
                    <img src="${data[i].image}" />
                </div>
                
                <p class='titulo'>${data[i].title}</p>
                <p>$${precio} <span class='precio-sd'>$${((precio * 0.1) + precio).toFixed(2)}</span></p>
                <label class='categoria'>${data[i].category}</label>
             </div>
             `;
             tabla += bloqueHtml;
        }
        tabla +="</div>";
        productos.innerHTML = tabla;
    })
}
getData();