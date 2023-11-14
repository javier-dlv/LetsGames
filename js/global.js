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

class Categoria {
  constructor(id,nombre,descripcion){
    this.id=id
    this.nombre=nombre
    this.descripcion=descripcion
  }
}

 //let juegosTotales = [] 
 //let categorias = []

 let selectCategoria = document.getElementById("categoria")

 
 let recomendados = JSON.parse(localStorage.getItem("recomendados")) || []
 let principal = JSON.parse(localStorage.getItem("principal")) || []
 let categorias = JSON.parse(localStorage.getItem("categorias")) || []

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


const agregarASelectCategoria = () => {

categorias.forEach((categoria)=>{
  let opcionCategoria =document.createElement("option")
  opcionCategoria.value= categoria.nombre
  opcionCategoria.innerText=categoria.nombre
  selectCategoria.append(opcionCategoria)
})
}

const crearCategoria = () => {
  myModal.show()

  let idCategoria = new Date().getTime()
  let nombre = document.getElementById("nombre-categoria").value
  let descripcion = document.getElementById("descripcion-categoria").value

  if (nombre !== "" && descripcion !== "" ) {
  let categoria = new Categoria(idCategoria,nombre,descripcion)
  categorias.push(categoria)
  let categoriasGuardadas = JSON.parse(localStorage.getItem("categorias")) || [];
  categoriasGuardadas.push(categoria);
  localStorage.setItem("categorias", JSON.stringify(categoriasGuardadas));

  document.getElementById("nombre-categoria").value=""
  document.getElementById("descripcion-categoria").value=""

  selectCategoria.innerText=""
agregarASelectCategoria()

  }  
}

const verCategorias = () => {

  let modalCategorias = document.getElementById("categorias-modal")
  myModal2.show()
  document.getElementById("categorias-modal").innerText=""
  categorias.forEach((categoria)=>{
      let contenedor = document.createElement("div")
      let contenido = `
      <div class="d-flex mb-2 justify-content-between">
      <h5> ${categoria.nombre} </h5>
      <div class="d-flex align-items-center">
      <i class="fa-solid fa-trash fa-xl puntero" onclick="eliminarProducto(${categoria.id},${0})"></i><p class="align-items-center mb-0">Eliminar categoria</p>
      </div>
      </div>
      <hr/>
      `
      contenedor.innerHTML=contenido
      modalCategorias.append(contenedor)
  })
}

const eliminarProducto = (id,numero) => {

  if (numero === 0) {
     let posicion =  categorias.findIndex((categoria)=>{
          return categoria.id === id
      })

      categorias.splice(posicion,1)
      localStorage.setItem("categorias",JSON.stringify(categorias))
      verCategorias()

  } else if(numero === 1) {
     let pos = juegos.findIndex((juego)=>{
          return juego.id === id
      })

      juegos.splice(pos,1)
      localStorage.setItem("juegos",JSON.stringify(juegos))
      cargarTabla()
  }

}

const listarCategorias = () => {
  categorias.forEach((categoria)=>{
    let columna = document.createElement("div")
    columna.classList="col"

    let cardCategoria = `  <div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="$}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
        </div>
      </div>
    </div>
  </div>`

  columna.innerHTML= cardCategoria
  contenedorCategorias.append(columna)
  })
}

agregarASelectCategoria()