/* --------- Capa de servicio http --------- */
const baseURL = "http://localhost:3000/extraterrestres";

/**
 * @returns {Promise<Extraterrestre[]>}
 */
async function obtenerExtraterrestres() {
    return (await fetch(baseURL)).json();
}

/**
 * @param {Extraterrestre} extraterrestre 
 * @returns {Promise<Extraterrestre>}
 */
async function agregarExtraterrestre(extraterrestre) {
    return (await fetch(baseURL, {
        method: "POST",
        body: JSON.stringify(extraterrestre)
    })).json();
}

/**
 * @param {Extraterrestre} extraterrestre 
 * @param {number | string} id 
 * @returns {Promise<Extraterrestre>}
 */
async function modificarExtraterrestre(extraterrestre, id) {
    return (await fetch(`${baseURL}/${id}`, {
        method: "PUT",
        body: JSON.stringify(extraterrestre)
    })).json();
}

/**
 * @param {number | string} id 
 * @returns {Promise<any>}
 */
async function eliminarExtraterrestre(id) {
    return (await fetch(`${baseURL}/${id}`, {
        method: "DELETE"
    })).json();
}

/* --------- Capa de presentacion --------- */

/* estado global */
let editando = false;
/** @type {number | string | undefined} */
let idExtraterrestreEnModificacion = undefined;
/** @type {HTMLElement} */
let tarjetaExtraterrestreEnModificacion = null;

/* --------- Listado --------- */
const contenedorDatos = document.getElementById('contenedor-datos');

/**
 * @param {Extraterrestre} extraterrestre
 * @param {(id: number | string) => void} editar
 * @param {(id: number | string) => void} eliminar
 * @returns {HTMLElement}
 */
function renderizarExtraterrestre(extraterrestre) {
    const article = document.createElement("article");
    article.className = "tarjeta-extraterrestre";
    article.dataset.id = extraterrestre.id;

    article.innerHTML = `
    <div class="datos-extraterrestre">
        <h3>${extraterrestre.nombre}</h3>
        <p><strong>Planeta:</strong> ${extraterrestre.planeta}</p>
        <p><strong>Nivel de Poder:</strong> ${extraterrestre.nivelPoder}</p>
    </div>
    <div class="acciones-tarjeta">
        <button class="editar">Editar</button>
        <button class="eliminar">Eliminar</button>
    </div>
    `;

    return article;
}

document.addEventListener("DOMContentLoaded", async () => {
    const extraterrestres = await obtenerExtraterrestres();
    const p = contenedorDatos.getElementsByTagName("p")[0];

    if (extraterrestres.length == 0) {
        p.innerText = "No hay datos cargados...";
        return;
    }
    p.remove();

    for (let extraterrestre of extraterrestres) {
        const tarjetaExtraterrestre = renderizarExtraterrestre(extraterrestre);

        const [editar, eliminar] = tarjetaExtraterrestre.getElementsByTagName("button");

        /* Manejador de evento de edicion */
        editar.addEventListener("click", () => {
            editando = true;
            idExtraterrestreEnModificacion = tarjetaExtraterrestre.dataset.id;
            tarjetaExtraterrestreEnModificacion = tarjetaExtraterrestre;
            const [nombre, planeta, nivelPoder] = inputs;
            nombre.value = extraterrestre.nombre;
            planeta.value = extraterrestre.planeta;
            nivelPoder.value = extraterrestre.nivelPoder;
            form.scrollIntoView({ behavior: "smooth" });
        });

        /* Manejador de evento de eliminacion */
        eliminar.addEventListener("click", async () => {
            try {
                if (window.confirm(`Desea borrar a ${extraterrestre.nombre}?`)) {
                    await eliminarExtraterrestre(tarjetaExtraterrestre.dataset.id);
                    alert("Extraterrestre eliminado con éxito!");
                    tarjetaExtraterrestre.remove();
                }
            } catch (error) {
                alert(`Ha ocurrido un error: ${error}`);
            }
        });

        /* Agregar el elemento HTML generado */
        contenedorDatos.appendChild(tarjetaExtraterrestre);
    }
});

/* --------- Formulario --------- */
const form = document.getElementsByTagName("form")[0];

/**
 * @param {HTMLElement} tarjetaExtraterrestre 
 */
function editarTarjetaExtraterrestre(tarjetaExtraterrestre) {
    editando = true;
    idExtraterrestreEnModificacion = tarjetaExtraterrestre.dataset.id;
    tarjetaExtraterrestreEnModificacion = tarjetaExtraterrestre;
    const [nombre, planeta, nivelPoder] = inputs;
    nombre.value = extraterrestre.nombre;
    planeta.value = extraterrestre.planeta;
    nivelPoder.value = extraterrestre.nivelPoder;
    form.scrollIntoView({ behavior: "smooth" });
}

/**
 * @param {HTMLElement} tarjetaExtraterrestre 
 * @param {string} nombre 
 */
async function removerTarjetaExtraterrestre(tarjetaExtraterrestre, nombre) {
    try {
        if (window.confirm(`Desea borrar a ${nombre}?`)) {
            await eliminarExtraterrestre(tarjetaExtraterrestre.dataset.id);
            alert("Extraterrestre eliminado con éxito!");
            tarjetaExtraterrestre.remove();
        }
    } catch (error) {
        alert(`Ha ocurrido un error: ${error}`);
    }
}

form.querySelector('button[type="reset"]').addEventListener("click", () => {
    // resetear el estado global de edicion
    editando = false;
});
const inputs = form.getElementsByTagName("input");
const nombre = document.getElementById("nombre");
const planeta = document.getElementById("planeta");
const nivelPoder = document.getElementById("nivelPoder");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    /** @type Extraterrestre */
    const formModel = {
        nombre: '',
        planeta: '',
        nivelPoder: 0
    };
    for (let input of inputs) {
        if (input.value.trim() == '') {
            alert(`Campo ${input.name} no puede permanecer vacío`);
            return;
        }
        if (input.type == 'number') {
            formModel[input.id] = Number(input.value);
        } else {
            formModel[input.id] = input.value;
        }
    }

    if (window.confirm("Desea confirmar los datos?")) {
        try {
            if (editando) {
                const extraterrestre = await modificarExtraterrestre(formModel, idExtraterrestreEnModificacion);
                tarjetaExtraterrestreEnModificacion.firstElementChild.innerHTML = `
                    <h3>${extraterrestre.nombre}</h3>
                    <p><strong>Planeta:</strong> ${extraterrestre.planeta}</p>
                    <p><strong>Nivel de Poder:</strong> ${extraterrestre.nivelPoder}</p>
                `;
            } else {
                const extraterrestre = await agregarExtraterrestre(formModel);
                const tarjetaExtraterrestre = renderizarExtraterrestre(extraterrestre);

                const [editar, eliminar] = tarjetaExtraterrestre.getElementsByTagName("button");

                /* Manejador de evento de edicion */
                editar.addEventListener("click", () => {
                    editarTarjetaExtraterrestre(tarjetaExtraterrestre);
                });

                /* Manejador de evento de eliminacion */
                eliminar.addEventListener("click", async () => {
                    await removerTarjetaExtraterrestre(tarjetaExtraterrestre, extraterrestre.nombre);
                });

                /* Agregar el elemento HTML generado */
                contenedorDatos.appendChild(tarjetaExtraterrestre);
            }
            alert(`Extraterrestre ${editando ? "modificado" : "agregado"} con éxito`);
            editando = false;
            form.reset();
        } catch (error) {
            alert(`Ocurrio un error: ${error}`);
        }
    }
});
