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

juegos = JSON.parse(localStorage.getItem("juegos")) || [] 
 let recomendados = JSON.parse(localStorage.getItem("recomendados")) || []
 let principal = JSON.parse(localStorage.getItem("principal")) || []
 let categorias = JSON.parse(localStorage.getItem("categorias")) || []
 let juegosAccion = JSON.parse(localStorage.getItem("Accion")) || []
 let juegosAventura = JSON.parse(localStorage.getItem("Aventura")) || []
 

const mostrarJuegosRecomendados = () => {
  let recomendadosJuegos = juegos.filter((juego)=> {
    return juego.recomendado == true
  })
  localStorage.setItem("recomendados",JSON.stringify(recomendadosJuegos))
  JSON.parse(localStorage.getItem("recomendados"))

  let carouselIner = document.getElementById("carousel-inner")

  for (let i = 0; i < recomendados.length; i+=4) {
    
    let carouselItem = document.createElement("div")
    carouselItem.classList="carousel-item"
    
    if (i === 0) {
      carouselItem.classList.add('active');
    }

    let row = document.createElement('div');
    row.classList.add('row');

    for (let j = i; j < i + 4 && j < recomendados.length; j++) {
     
      let col = document.createElement('div');
          col.classList=('col-3');

          let card = `<div class="card h-100">
               <div class="cont-img">
               <img src="${recomendados[j].imagen}" class="card-img-top img-card" alt="imagen">
               </div>
               <div class="card-body">
               <p class="card-title">${recomendados[j].nombre}</p>
               <h5 class="card-text">${recomendados[j].precio} Usd</h5>
               <a href="#" class="btn ">Ver detalle</a>
               </div>
               </div>`

          col.innerHTML=card
          row.appendChild(col);
      
    }
    carouselItem.appendChild(row);
    carouselIner.appendChild(carouselItem);
  }

// recomendados.forEach(juego => {
//     let columna = document.createElement("div")
//     columna.classList="col-12 col-md-2 mb-3 justify-content-center d-flex col-juego"

//     let cardJuego = `<div class="card h-100" style="width: 18rem;">
//     <div class="cont-img">
//     <img src="${juego.imagen}" class="card-img-top img-card" alt="imagen">
//     </div>
//     <div class="card-body">
//       <p class="card-title">${juego.nombre}</p>
//       <h5 class="card-text">${juego.precio} Usd</h5>
//       <a href="#" class="btn ">Ver detalle</a>
//     </div>
//   </div>`

//   columna.innerHTML=cardJuego
//   juegosRecomendados.append(columna )
// });
}


const juegoPrincipal = () => {
  let principalJuego = juegos.filter((juego)=> {
    return juego.destacado == true
  })

  localStorage.setItem("principal",JSON.stringify(principalJuego))
  JSON.parse(localStorage.getItem("principal"))

  principal.forEach((juego=>{
   let columna = document.createElement("div")
   columna.classList="col-md-11 d-none d-md-flex ms-5"
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
    columna.classList="col-12 col-md-4 mb-3"

    let cardCategoria = ` <div class="card h-100">
    <div class="card-body">
      <h4 class="card-title btn-danger">${categoria.nombre}</h4>
      <p class="card-text">Entre aqui para ver todos los juegos que tenemos de ${categoria.nombre}</p>
      <button type="button" class="btn fondo-botones">Entrar</button>
    </div>
  </div>`

  columna.innerHTML= cardCategoria
  contenedorCategorias.append(columna)
  })
}


let juegosDeAccion = juegos.filter((juego)=>{
  return juego.categoria === "Accion"
})
localStorage.setItem("Accion",JSON.stringify(juegosDeAccion))
JSON.parse(localStorage.getItem("Accion"))

let listarJuegosDeAccion = () => {

  let carouselInerAccion = document.getElementById("carousel-inner-accion")

  for (let i = 0; i < juegosAccion.length; i+=4) {
    
    let carouselItem = document.createElement("div")
    carouselItem.classList="carousel-item"
    
    if (i === 0) {
      carouselItem.classList.add('active');
    }

    let row = document.createElement('div');
    row.classList.add('row');

    for (let j = i; j < i + 4 && j < juegosAccion.length; j++) {
     
      let col = document.createElement('div');
          col.classList=('col-6 col-md-3 d-flex');

          let card = `<div class="card h-100">
               <div class="cont-img">
               <img src="${juegosAccion[j].imagen}" class="card-img-top img-card" alt="imagen">
               </div>
               <div class="card-body">
               <p class="card-title">${juegosAccion[j].nombre}</p>
               <h5 class="card-text">${juegosAccion[j].precio} Usd</h5>
               <a href="#" class="btn ">Ver detalle</a>
               </div>
               </div>`

          col.innerHTML=card
          row.appendChild(col);
      
    }
    carouselItem.appendChild(row);
    carouselInerAccion.appendChild(carouselItem);
  }
}


let listarJuegosDeAccionCelular = () => {
  let juegosAccionCelular = document.getElementById("juegos-accion-celular")
  juegosAccion.forEach(juego => {
  let columna = document.createElement("div")
   columna.classList="col-6 mb-3 justify-content-center d-flex"
      
   let cardJuego = `<div class="card h-100" style="width: 18rem;">
   <div class="cont-img">
   <img src="${juego.imagen}" class="card-img-top img-card" alt="imagen">
   </div>
   <div class="card-body">
     <p class="card-title">${juego.nombre}</p>
     <h5 class="card-text">${juego.precio} Usd</h5>
     <a href="#" class="btn ">Ver detalle</a>
   </div>
 </div>`
      
 columna.innerHTML=cardJuego
 juegosAccionCelular.append(columna )
   });
  
     }

    let juegosDeAventura = juegos.filter((juego)=>{
      return juego.categoria === "Aventura"
    })
    localStorage.setItem("Aventura",JSON.stringify(juegosDeAventura))
    JSON.parse(localStorage.getItem("Aventura"))


    let listarJuegosDeAventura = () => {
      let carouselInerAventura = document.getElementById("carousel-inner-aventura")

  for (let i = 0; i < juegosAventura.length; i+=4) {
    
    let carouselItem = document.createElement("div")
    carouselItem.classList="carousel-item"
    
    if (i === 0) {
      carouselItem.classList.add('active');
    }

    let row = document.createElement('div');
    row.classList.add('row');

    for (let j = i; j < i + 4 && j < juegosAventura.length; j++) {
     
      let col = document.createElement('div');
          col.classList=('col-6 col-md-3 d-flex');

          let card = `<div class="card h-100">
               <div class="cont-img">
               <img src="${juegosAventura[j].imagen}" class="card-img-top img-card" alt="imagen">
               </div>
               <div class="card-body">
               <p class="card-title">${juegosAventura[j].nombre}</p>
               <h5 class="card-text">${juegosAventura[j].precio} Usd</h5>
               <a href="#" class="btn ">Ver detalle</a>
               </div>
               </div>`

          col.innerHTML=card
          row.appendChild(col);
      
    }
    carouselItem.appendChild(row);
    carouselInerAventura.appendChild(carouselItem);
  }
    }


  let listarJuegosDeAventuraCelular = () => {
    let juegosAventuraCelular = document.getElementById("juegos-aventura-celular")
  juegosAventura.forEach(juego => {
  let columna = document.createElement("div")
   columna.classList="col-6 mb-3 justify-content-center d-flex"
      
   let cardJuego = `<div class="card h-100" style="width: 18rem;">
   <div class="cont-img">
   <img src="${juego.imagen}" class="card-img-top img-card" alt="imagen">
   </div>
   <div class="card-body">
     <p class="card-title">${juego.nombre}</p>
     <h5 class="card-text">${juego.precio} Usd</h5>
     <a href="#" class="btn ">Ver detalle</a>
   </div>
 </div>`
      
 columna.innerHTML=cardJuego
 juegosAventuraCelular.append(columna )
   });
  
  }
agregarASelectCategoria()