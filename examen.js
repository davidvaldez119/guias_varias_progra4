const url="http://localhost:3000/montanias";

async function get() {
    try{
        const respuesta=await fetch(url);
        return await respuesta.json();
    }catch(error){
          console.log("error");
    }
}

async function post(montania) {
    return(await fetch(url,{
        method:"POST",
        body:JSON.stringify(montania)
    })).json() 
}

 async function put(montania,id) {
    return(await fetch(`${url}/${id}`,{
        method:"PATCH",
        body:JSON.stringify(montania)
    })).json()
 }

 async function eliminar(id) {
    return await fetch(`${url}/${id}`,{
       method:"DELETE" 
    }).json()
 }

let montanias=[];
document.addEventListener("DOMContentLoaded",mostrar);

async function mostrar() {
    try{
        montanias=await get();
        console.log(montanias);
    }
    catch(error){
        console.log("error");
    }

    const constenedor = document.getElementById("contenedor-datos");


    const p = constenedor.getElementsByTagName("p")[0];  //cartelito de cargando
    if (montanias.length === 0) {
        p.innerHTML = "no hay datos";
    }
    p.remove();

    montanias.forEach(montania => {

        const tarjetaMontania = renderizar(montania);
        const [editar, eliminar] = tarjetaMontania.getElementsByTagName("button");

        eliminar.addEventListener("click", async () => {

            try {

                await eliminar(tarjetaMontania.dataset.id);

            } catch (error) {
                console.log(error);
            }


        })


        constenedor.appendChild(tarjetaMontania);



    })



}

function renderizar(montania) {

    const articulo = document.createElement("articulo");
    articulo.className = "tarjeta-montania";
    articulo.dataset.id = montania.id;

    articulo.innerHTML = 
                `
                    <article class="tarjeta-montania">

                    <div class="datos-montania">
                        <h3>${montania.name}</h3>
                        <p><strong>altura:</strong> ${montania.height}</p>
                        <p><strong>lugar:</strong> ${montania.place}</p>
                    </div>
                    
                    <div class="acciones-tarjeta">
                        <button class="editar">Editar</button>
                        <button class="eliminar">Eliminar</button>
                    </div>

                    </article>
                `


    return articulo;
}


const formulario = document.getElementById("formulario-montania");

formulario.addEventListener("submit", async (e) => {
    e.preventDefault();
    const montania = crear();

    if (montania) { // solo si la validación pasa
        await post(montania);
        console.log("montania agregado:", montania);
    }

});

function crear() {
    let name = document.getElementById("name")
    let heigth = document.getElementById("heigth");
    let place = document.getElementById("place");

    if (!name|| !heigth || !place) {
        alert("Por favor complete todos los campos.");
        return null; // corto acá
    }

    const montania = {
        "name": name.value,
        "heigth": heigth.value,
        "place": place.value

    }

    return montania;


}
