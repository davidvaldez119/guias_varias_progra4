const button = document.querySelector("button");

function onne() {
    fetch("http://localhost:3000/montanias")
        .then(response => response.json())
        .then(data => {
            sdTabla(data);
        })
        .catch(error => {
            console.log("error", error);
        });

    button.removeEventListener("click", onne); 
}

button.addEventListener("click", onne);

async function modificar(data, id) {
    return await fetch(`http://localhost:3000/montanias/${id}`, {
        method: "PATCH", // Corregido: PATCH
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

async function eliminar(id) {
    try {
        const response = await fetch(`http://localhost:3000/montanias/${id}`, {
            method: "DELETE"
        });
        return await response.json();
    } catch (error) {
        console.error("Error al eliminar:", error);
    }
}

const sdTabla = (array) => {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    table.id = "stdInfotable";
    thead.innerHTML = `
        <tr>
            <th>name</th>
            <th>height</th>
            <th>place</th>
        </tr>    
    `;

    table.appendChild(thead);
    table.appendChild(tbody);

    for (let elem of array) {
        const tr = document.createElement('tr');
        const dataFields = [elem.name, elem.height, elem.place];

        for (let data of dataFields) {
            const td = document.createElement('td');
            td.textContent = data; 
            tr.appendChild(td); 
        }

        tbody.appendChild(tr); //Agregar la fila completa al tbody
    }

    document.body.appendChild(table); // Agregar la tabla al DOM
}
/*const sdFormulario = (array) => {
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
        nameInput.value = elem.name;
        nameLabel.appendChild(nameInput);
        fieldset.appendChild(nameLabel);
        fieldset.appendChild(document.createElement('br'));

        // Campo: Height
        const heightLabel = document.createElement('label');
        heightLabel.textContent = 'Height: ';
        const heightInput = document.createElement('input');
        heightInput.type = 'text';
        heightInput.name = `height_${index}`;
        heightInput.value = elem.height;
        heightLabel.appendChild(heightInput);
        fieldset.appendChild(heightLabel);
        fieldset.appendChild(document.createElement('br'));

        // Campo: Place
        const placeLabel = document.createElement('label');
        placeLabel.textContent = 'Place: ';
        const placeInput = document.createElement('input');
        placeInput.type = 'text';
        placeInput.name = `place_${index}`;
        placeInput.value = elem.place;
        placeLabel.appendChild(placeInput);
        fieldset.appendChild(placeLabel);
        fieldset.appendChild(document.createElement('br'));

        form.appendChild(fieldset);
    });

    document.body.appendChild(form);
};

const submitBtn = document.createElement('button');
submitBtn.type = 'submit';
submitBtn.textContent = 'Enviar';
form.appendChild(submitBtn);*/
