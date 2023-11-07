let juegosRecomendados = document.getElementById("juegos-recomendados")
let juegos = JSON.parse(localStorage.getItem("juegos")) || []

/*class Juego {
    constructor(id,nombre,categoria,descripcion,precio,imagen,destacado=false,principal=false){
        this.id = id
        this.nombre = nombre
        this.categoria = categoria
        this.descripcion = descripcion
        this.precio = precio
        this.imagen = imagen
        this.destacado = destacado
        this.principal = principal
    }
} */

const mostrarJuegos = () => {
juegos.forEach(juego => {
    let columna = document.createElement("div")
    columna.classList="col-12 col-md-3 mb-3"

    let cardJuego = `<div class="card h-100" style="width: 18rem;">
    <div class="cont-img">
    <img src="${juego.imagen}" class="card-img-top img-card" alt="imagen">
    </div>
    <div class="card-body">
      <h5 class="card-title">${juego.nombre}</h5>
      <h5 class="card-text">${juego.precio} Usd</h5>
      <a href="#" class="btn ">Ver detalle</a>
    </div>
  </div>`

  columna.innerHTML=cardJuego
  juegosRecomendados.append(columna )
});
}

mostrarJuegos()