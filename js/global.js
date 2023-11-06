class Juego {
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
}

let juegosTotales = []