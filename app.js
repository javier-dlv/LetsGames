let juegosRecomendados = document.getElementById("juegos-recomendados")
let juegos = JSON.parse(localStorage.getItem("juegos")) || []


mostrarJuegosRecomendados()