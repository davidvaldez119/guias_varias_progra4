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

