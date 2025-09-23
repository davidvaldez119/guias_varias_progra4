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
        method: "PATCH", 
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
