// Manejo de Categorías
let categories = [];

// Función para agregar una nueva categoría.
const addCategory = () => {
    const inputCategory = document.getElementById('category');
    const newCategory = inputCategory.value.trim();

    if (newCategory !== '') {
        categories.push({ name: newCategory });
        updateCategoryList();
        inputCategory.value = ''; // Borrar el campo de entrada
    }
};

// Función de lista de categorías
const updateCategoryList = () => {
    const categoryList = document.getElementById('categoryList');
    categoryList.innerHTML = ''; // Borre la lista antes de volver a mostrarla

    categories.forEach((category, index) => {
        const categoryElement = document.createElement('div');
        categoryElement.classList.add('flex', 'items-center', 'justify-between', 'mb-2');

        const categoryName = document.createElement('span');
        categoryName.textContent = category.name;
        categoryName.classList.add('bg-[#d1fae5]', 'text-[#00d1b2]', 'px-4', 'py-2', 'rounded-md', 'mr-2');

        const categoryButtons = document.createElement('div');
        categoryButtons.classList.add('flex', 'space-x-2');

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('text-blue-500', 'hover:underline', 'focus:outline-none');
        editButton.onclick = () => {
            categories[index].isEditing = true;
            startCategoryEdit(index);
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('text-red-500', 'hover:underline', 'focus:outline-none');
        deleteButton.onclick = () => deleteCategory(index);

        categoryButtons.appendChild(editButton);
        categoryButtons.appendChild(deleteButton);

        categoryElement.appendChild(categoryName);
        categoryElement.appendChild(categoryButtons);

        // Asigna id a cada elemento para una identificación más fácil
        categoryElement.id = `category-${index}`;

        categoryList.appendChild(categoryElement);
    });
};

// Función para comenzar a editar una categoría.
const startCategoryEdit = (index) => {
    const categoryName = document.querySelector(`#category-${index} span`);
    
    // Crear una entrada para editar
    const editInput = document.createElement('input');
    editInput.value = categoryName.textContent;
    
    // Reemplazar el texto con la entrada para editar
    categoryName.replaceWith(editInput);
    
    // Centrarse en la entrada para editar
    editInput.focus();
    
    // Controlador para finalizar la edición
    editInput.addEventListener('blur', () => finishCategoryEdit(index));
    editInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            finishCategoryEdit(index);
        }
    });
};

// Función para terminar de editar una categoría
const finishCategoryEdit = (index) => {
    const editInput = document.querySelector(`#category-${index} input`);
    const newName = editInput.value.trim();

    // Actualizar el nombre en la lista de categorías
    categories[index].name = newName;
    updateCategoryList();
};

// Función para eliminar una categoría
const deleteCategory = (index) => {
    const confirmation = confirm(`¿Estás seguro de que deseas eliminar la categoría: "${categories[index].name}"?`);
    if (confirmation) {
        categories.splice(index, 1);
        updateCategoryList();
    }
};