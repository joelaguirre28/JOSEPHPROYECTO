const URL = "https://fakestoreapi.com/products";
let productos = document.getElementById("productos")
let tabla = "<div class='card'>";
function getData(){
    fetch(URL)
    .then( response => response.json() )
    .then( data => {
        console.log("Datos de la api: ", data)
        for(let i = 0; i < data.length; i++ ){
             let bloqueHtml = 
             `
             <div class='card-item'>
                <div class='cabecera' ></div>
                <img src="${data[i].image}" />
                <p class='titulo'>${data[i].title}</p>
                <p>$${data[i].price}</p>
                <label>${data[i].category}</label>
             </div>
             `;
             tabla += bloqueHtml;
        }
        tabla +="</div>";
        productos.innerHTML = tabla;
    })
}
getData();