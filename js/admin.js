let main = document.getElementById("main")
let acordion = document.getElementById("accordionExample")


let juegos = JSON.parse(localStorage.getItem("juegos")) || []

//CREAR EL PRODUCTO
const crearProducto = (event) => {
  event.preventDefault()

  let idJuego = new Date().getTime()
  let nombre = document.getElementById("nombre").value
  let descripcion = document.getElementById("descripcion").value
  let categoria = document.getElementById("categoria").value
  let precio = document.getElementById("precio").value
  let imagen = document.getElementById("imagen").value

  juegosTotales = JSON.parse(localStorage.getItem("juego"))
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
                    <i class="fa-solid fa-trash fa-xl"></i><p class="align-items-center mb-0">Eliminar</p>
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


cargarTabla()
