class Juego {
    constructor(id,nombre,categoria,descripcion,precio,imagen,destacado=false,recomendado=false){
        this.id = id
        this.nombre = nombre
        this.categoria = categoria
        this.descripcion = descripcion
        this.precio = precio
        this.imagen = imagen
        this.destacado = destacado
        this.recomendado = recomendado
    }
}

let juegosTotales = []

let recomendados = JSON.parse(localStorage.getItem("recomendados")) || []


const mostrarJuegosRecomendados = () => {
  let recomendadosJuegos = juegos.filter((juego)=> {
    return juego.recomendado == true
  })

  localStorage.setItem("recomendados",JSON.stringify(recomendadosJuegos))
  JSON.parse(localStorage.getItem("recomendados"))

recomendados.forEach(juego => {
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