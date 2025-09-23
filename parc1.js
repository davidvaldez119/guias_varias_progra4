const url = "http://localhost:3000/extraterrestres";

export async function getExtraterrestres(){
    try{ 
        const respuesta =  await fetch(url);
        return   await respuesta.json();

    }catch(error){
        console.log(error);
    }

}


export async function postExtraterrestre(extraterrestre) {
    try {
        await fetch(url,
            {
                method: "POST",
                body: JSON.stringify(extraterrestre),
                headers: { 'content-type': 'application/json' }
            }

        )

    } catch (error) {
        console.log(error);
    }

}

export async function deleteExtraterrestre(id) {
    try{ 
        await fetch(`${url}/${id}`,{ method :"DELETE"})

    }catch(error){
        console.log(error);
    }
    
}






let extraterrestres = [];





document.addEventListener("DOMContentLoaded", mostrar);

async function mostrar() {
    try {

        extraterrestres = await getExtraterrestres();
        console.log(extraterrestres);

    } catch (error) {
        console.log(error);
    }

    const constenedor = document.getElementById("contenedor-datos");


    const p = constenedor.getElementsByTagName("p")[0];  //cartelito de cargando
    if (extraterrestres.length == 0) {
        p.innerHTML = "no hay datos";
    }
    p.remove();

    extraterrestres.forEach(extraterrestre => {

        const tarjetaExtraterrestre = renderizar(extraterrestre);
        const [editar, eliminar] = tarjetaExtraterrestre.getElementsByTagName("button");

        eliminar.addEventListener("click", async () => {

            try {

                await deleteExtraterrestre(tarjetaExtraterrestre.dataset.id);

            } catch (error) {
                console.log(error);
            }


        })


        constenedor.appendChild(tarjetaExtraterrestre);



    })



}

function renderizar(extraterrestre) {

    const articulo = document.createElement("article");
    articulo.className = "tarjeta-extraterrestre";
    articulo.dataset.id = extraterrestre.id;

    articulo.innerHTML = 
                `
                    <article class="tarjeta-extraterrestre">

                    <div class="datos-extraterrestre">
                        <h3>${extraterrestre.nombre}</h3>
                        <p><strong>Planeta:</strong> ${extraterrestre.planeta}</p>
                        <p><strong>Nivel de Poder:</strong> ${extraterrestre.nivelPoder}</p>
                    </div>
                    
                    <div class="acciones-tarjeta">
                        <button class="editar">Editar</button>
                        <button class="eliminar">Eliminar</button>
                    </div>

                    </article>
                `


    return articulo;
}


const formulario = document.getElementById("formulario-extraterrestre");

formulario.addEventListener("submit", async (e) => {
    e.preventDefault();
    const extraterrestre = crear();

    if (extraterrestre) { // solo si la validación pasa
        await postExtraterrestre(extraterrestre);
        console.log("Extraterrestre agregado:", extraterrestre);
    }

});

function crear() {
    let nombre = document.getElementById("nombre")
    let planeta = document.getElementById("planeta");
    let nivelPoder = document.getElementById("nivelPoder");

    if (!nombre || !planeta || !nivelPoder) {
        alert("Por favor complete todos los campos.");
        return null; // corto acá
    }

    const extraterrestre = {
        "nombre": nombre.value,
        "planeta": planeta.value,
        "nivelPoder": nivelPoder.value

    }

    return extraterrestre;


}
