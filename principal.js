let imagenes = [];
imagenes[0] = "imagenes/carrusel/1.png"
imagenes[1] = "imagenes/carrusel/2.png"
imagenes[2] = "imagenes/carrusel/3.png"
imagenes[3] = "imagenes/carrusel/4.png"
imagenes[4] = "imagenes/carrusel/5.png"
imagenes[5] = "imagenes/carrusel/6.png"
imagenes[6] = "imagenes/carrusel/7.png"
imagenes[7] = "imagenes/carrusel/8.png"
let x = 0;

function siguiente(){
    x++;
    let photo = document.getElementById("fotos");
    if (x < imagenes.length){
        photo.setAttribute("src",imagenes[x]);
        console.log("entra if");
    } else {
        console.log("entra else");
        x = 0;
        photo.setAttribute("src",imagenes[x]);
    }
}

function prev(){
    x--;
    let photo = document.getElementById("fotos");
    if (x >= 0){
        photo.setAttribute("src",imagenes[x]);
    } else {
        x = [imagenes.length-1];
        photo.setAttribute("src",imagenes[x]);
    }
}
window.setInterval(siguiente,4000);