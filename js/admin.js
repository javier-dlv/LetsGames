let main = document.getElementById("main")
let acordion = document.getElementById("accordionExample")
let selectCategoria = document.getElementById("categoria")
const myModal = new bootstrap.Modal(document.getElementById('modal-categoria'))
const myModal2 = new bootstrap.Modal(document.getElementById('modal-categorias'))


let juegos = JSON.parse(localStorage.getItem("juegos")) || []
let categorias = JSON.parse(localStorage.getItem("categorias")) || []


categorias.forEach((categoria)=>{
    let opcionCategoria =document.createElement("option")
    opcionCategoria.value= categoria.nombre
    opcionCategoria.innerText=categoria.nombre
    selectCategoria.append(opcionCategoria)
  })
//CREAR EL PRODUCTO
const crearProducto = (event) => {
  event.preventDefault()

  let idJuego = new Date().getTime()
  let nombre = document.getElementById("nombre").value
  let descripcion = document.getElementById("descripcion").value
  let categoria = document.getElementById("categoria").value
  let precio = document.getElementById("precio").value
  let imagen = document.getElementById("imagen").value

  //juegosTotales = JSON.parse(localStorage.getItem("juego"))
  juegos.push(new Juego(idJuego,nombre,categoria,descripcion,precio,imagen))
  localStorage.setItem("juegos",JSON.stringify(juegos))

   document.getElementById("nombre").value = ""
   document.getElementById("descripcion").value = ""
   document.getElementById("categoria").value = ""
   document.getElementById("precio").value = ""
   document.getElementById("imagen").value = ""

   cargarTabla()

}



//CARGAR TABLA
const cargarTabla = () => {

  acordion.innerHTML=""
  juegos.forEach((juego, index) => {
    let cuerpoTabla2 = document.createElement("div");
    let idUnico = `collapse${index}`; // Genera un identificador único

    let infoJuego = `
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#${idUnico}" aria-expanded="false" aria-controls="${idUnico}">
                    ${juego.nombre}
                </button>
            </h2>
            <div id="${idUnico}" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    Codigo: <h5>${juego.id}</h5>
                    <hr/>
                    Descripcion: <h5>${juego.descripcion}</h5>
                    <hr/>
                    Categoria: <h5>${juego.categoria}</h5>
                    <hr/>
                    Precio: <h5>${juego.precio} usd</h5> 
                    <hr/>
                    <div class="opciones">
                    <div class="d-flex align-items-center">
                    <i class="fa-solid fa-pen-to-square fa-xl"></i><p class="align-items-center mb-0">Editar</p>
                    </div>
                    <div class="d-flex align-items-center">
                    <i class="fa-solid fa-trash fa-xl" onclick="eliminarProducto(${juego.id},${1})"></i><p class="align-items-center mb-0">Eliminar</p>
                    </div>
                    <div class="d-flex align-items-center">
                    <i class="fa-regular fa-heart fa-xl"></i> <p class="align-items-center mb-0">Añadir a favoritos</p>
                    </div>
                    </div>
                    <hr/>
                    <div class="d-flex gap-3">
                    <button type="button" class="btn btn-outline-danger" onclick="añadirARecomendados(${index})">${juego.recomendado ? "Quitar de recomendados" : "Añadir a recomendados"}</button>
                    <button type="button" class="btn btn-outline-danger" onclick="destacarJuego(${index})">${juego.destacado ? "Quitar destacado" : "Destacar juego"}</button>
                    </div>
                </div>
            </div>
        </div>
       <hr/>
     `
     cuerpoTabla2.innerHTML=infoJuego
     acordion.append(cuerpoTabla2)
   });

}

const eliminarProducto = (id,numero) => {

    if (numero === 0) {
       let posicion =  categorias.findIndex((categoria)=>{
            return categoria.id === id
        })

        categorias.splice(posicion,1)
        localStorage.setItem("categorias",JSON.stringify(categorias))

    } else if(numero === 1) {
       let pos = juegos.findIndex((juego)=>{
            return juego.id === id
        })

        juegos.splice(pos,1)
        localStorage.setItem("juegos",JSON.stringify(juegos))
        cargarTabla()
    }

}


const añadirARecomendados = (index) => {
  
    if (recomendados.length >= 5 && juegos[index].recomendado == false) {
        alert("No tiene mas espacio para agregar a recomendados")
    } else {
        juegos[index].recomendado = !juegos[index].recomendado;
        localStorage.setItem("juegos",JSON.stringify(juegos))
        cargarTabla()
    }
    
}

const destacarJuego = (index) => {    
        juegos[index].destacado = !juegos[index].destacado;
        localStorage.setItem("juegos",JSON.stringify(juegos))
        cargarTabla()
  }

const verCategorias = () => {

    let modalCategorias = document.getElementById("categorias-modal")
    myModal2.show()

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

const crearCategoria = () => {
    myModal.show()

    let idCategoria = new Date().getTime()
    let nombre = document.getElementById("nombre-categoria").value
    let descripcion = document.getElementById("descripcion-categoria").value

    if (nombre !== "" && descripcion !== "" ) {
    let categoria = new Categoria(idCategoria,nombre,descripcion)
    categorias.push(categoria)
    categorias=JSON.parse(localStorage.getItem("categorias")) 
    localStorage.setItem("categorias",JSON.stringify(categorias))

    document.getElementById("nombre-categoria").value=""
    document.getElementById("descripcion-categoria").value=""
    }  
  }


cargarTabla()
