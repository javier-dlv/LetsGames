let juegosRecomendados = document.getElementById("juegos-recomendados")
let cardPrincipal = document.getElementById("card-principal")
let juegos = JSON.parse(localStorage.getItem("juegos")) || []
let contenedorCategorias = document.getElementById("categorias-contenedor")

mostrarJuegosRecomendados()
juegoPrincipal()
//listarCategorias()