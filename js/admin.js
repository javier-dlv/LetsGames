let main = document.getElementById("main")
let cuerpoTabla = document.getElementById("cuerpo-tabla")


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

  cuerpoTabla.innerHTML=""
     juegos.forEach(juego=>{
     let cuerpoTabla2 = document.createElement("tr")
     let infoJuego = ` <th scope ="row">${juego.id}</th>
     <td scope ="col">${juego.nombre}</td>
     <td scope ="col">${juego.descripcion}</td>
     <td scope ="col">${juego.categoria}</td>
     <td scope ="col">
      <div class="opciones">
      <i class="fa-solid fa-pen-to-square fa-xl"></i>
      <i class="fa-solid fa-trash fa-xl"></i>
      <i class="fa-regular fa-heart fa-xl"></i>
      </div>
     </td>`

     cuerpoTabla2.innerHTML=infoJuego
     cuerpoTabla.append(cuerpoTabla2)
   });

}

cargarTabla()
