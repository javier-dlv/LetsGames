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
 let principal = JSON.parse(localStorage.getItem("principal")) || []


const mostrarJuegosRecomendados = () => {
  let recomendadosJuegos = juegos.filter((juego)=> {
    return juego.recomendado == true
  })

  localStorage.setItem("recomendados",JSON.stringify(recomendadosJuegos))
  JSON.parse(localStorage.getItem("recomendados"))

recomendados.forEach(juego => {
    let columna = document.createElement("div")
    columna.classList="col-12 col-md-3 mb-3 justify-content-center d-flex"

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

const juegoPrincipal = () => {
  let principalJuego = juegos.filter((juego)=> {
    return juego.destacado == true
  })

  localStorage.setItem("principal",JSON.stringify(principalJuego))
  JSON.parse(localStorage.getItem("principal"))

  principal.forEach((juego=>{
   let columna = document.createElement("div")
   columna.classList=" d-none d-md-flex"
   let contenido = `
   <div class="col-md-6">
     <div class="img-principal">
         <img src="${juego.imagen}" class="imagen" alt="${juego.nombre}">
     </div>
 </div>
 <div class="col-md-6 bg-dark card-pricipal-body">
     <div class="text-light ms-3 card-pricipal-body">
         <h4 class="mt-4">${juego.nombre}</h4>
         <h4 class="mt-4">${juego.categoria}</h4>
         <p class="mt-4">${juego.descripcion}</p>
         <div class="d-flex justify-content-center">
         <button type="button" class="btn btn btn-outline-light mb-1">Ver detalle</button>
         </div>
         </div>
 </div>
 `
 columna.innerHTML=contenido
 cardPrincipal.append(columna)
  }))
}