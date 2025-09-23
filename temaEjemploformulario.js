function onne() {
    fetch("http://localhost:3000/montanias")
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                sdFormulario(data);
            } else {
                console.error("El formato de datos no es válido.");
            }
        })
        .catch(error => {
            console.error("Error al cargar datos:", error);
            document.body.innerHTML = "<p>No se pudieron cargar los datos.</p>";
        });
}
async function Agregar(montania) {
    return ( await fetch("http://localhost:3000/montanias",{
        method:"POST",
        "Content-Type": "application/json" ,
        body:JSON.stringify(montania)
    })).json()
    
}
async function eliminar(id) {
    return(await fetch(`${"http://localhost:3000/montanias"}/${id}`,{
        method:"DELETE"
      
    })).json()
    
}
async function modificar(montania,id) {
    return(await fetch(`${"http://localhost:3000/montanias"}/${id}`,{
        method:"PUT",
        body:JSON.stringify(montania)
    })).json()
}
const sdFormulario = (array) => {
    // Eliminar formulario previo si existe
    const existingForm = document.getElementById('stdInfoForm');
    if (existingForm) {
        existingForm.remove();
    }

    const form = document.createElement('form');
    form.id = "stdInfoForm";

    array.forEach((elem, index) => {
        const fieldset = document.createElement('fieldset');
        const legend = document.createElement('legend');
        legend.textContent = `Elemento ${index + 1}`;
        fieldset.appendChild(legend);

        // Campo: Name
        const nameLabel = document.createElement('label');
        nameLabel.textContent = 'Name: ';
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.name = `name_${index}`;
        nameInput.value = elem.name || '';
        nameLabel.appendChild(nameInput);
        fieldset.appendChild(nameLabel);
        fieldset.appendChild(document.createElement('br'));

        // Campo: Height
        const heightLabel = document.createElement('label');
        heightLabel.textContent = 'Height: ';
        const heightInput = document.createElement('input');
        heightInput.type = 'text';
        heightInput.name = `height_${index}`;
        heightInput.value = elem.height || '';
        heightLabel.appendChild(heightInput);
        fieldset.appendChild(heightLabel);
        fieldset.appendChild(document.createElement('br'));

        // Campo: Place
        const placeLabel = document.createElement('label');
        placeLabel.textContent = 'Place: ';
        const placeInput = document.createElement('input');
        placeInput.type = 'text';
        placeInput.name = `place_${index}`;
        placeInput.value = elem.place || '';
        placeLabel.appendChild(placeInput);
        fieldset.appendChild(placeLabel);
        fieldset.appendChild(document.createElement('br'));

        form.appendChild(fieldset);
    });

    // Botón de envío
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Enviar';
    form.appendChild(submitBtn);

    // Agregar el formulario al body
    document.body.appendChild(form);
};

// Ejecutar al cargar la página
window.addEventListener('DOMContentLoaded', onne);

// Crear el formulario y agregarlo al DOM
function crearFormulario() {
    const form = document.createElement("form");
    form.id = "form";

    // Campo: Nombre
    const inputNombre = document.createElement("input");
    inputNombre.type = "text";
    inputNombre.id = "name";
    inputNombre.placeholder = "Nombre de la montaña";
    inputNombre.required = true;

    // Campo: Altura
    const inputAltura = document.createElement("input");
    inputAltura.type = "number";
    inputAltura.id = "height";
    inputAltura.placeholder = "Altura en metros";
    inputAltura.required = true;

    // Campo: Lugar
    const inputLugar = document.createElement("input");
    inputLugar.type = "text";
    inputLugar.id = "place";
    inputLugar.placeholder = "Ubicación";
    inputLugar.required = true;

    // Botón para agregar montaña
    const botonAgregar = document.createElement("button");
    botonAgregar.type = "submit"; // Hace que se dispare el evento del formulario
    botonAgregar.textContent = "Agregar Montaña";

    // Agregar elementos al formulario
    form.appendChild(inputNombre);
    form.appendChild(document.createElement("br"));

    form.appendChild(inputAltura);
    form.appendChild(document.createElement("br"));

    form.appendChild(inputLugar);
    form.appendChild(document.createElement("br"));

    form.appendChild(botonAgregar);

    // Agregar formulario al body o a un contenedor
    document.body.appendChild(form);

    // Crear la lista para mostrar montañas (si no existe)
    if (!document.getElementById("lista-montanias")) {
        const ul = document.createElement("ul");
        ul.id = "lista-montanias";
        document.body.appendChild(ul);
    }

    // Asignar comportamiento al formulario
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const height = parseInt(document.getElementById("height").value);
        const place = document.getElementById("place").value;

        const nuevamontania = { name, height, place };

        try {
            const resultado = await Agregar(nuevamontania);
            console.log("Montaña agregada:", resultado);

            const li = document.createElement("li");
            li.textContent = `${resultado.name} - ${resultado.height} m - ${resultado.place}`;
            document.getElementById("lista-montanias").appendChild(li);

            e.target.reset(); // Limpiar formulario
        } catch (error) {
            console.error("Error al agregar montaña:", error);
        }
    });
}

window.addEventListener("DOMContentLoaded", crearFormulario);
