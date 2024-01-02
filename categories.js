// Manejo de Categorías
let categories = [];

// Obtener datos de categorías al inicio del script
const getCategoryData = () => {
    const dataSavedLocalStorage = localStorage.getItem('categories');
    const dataSaveJSONtoJS = JSON.parse(dataSavedLocalStorage);

    if (dataSavedLocalStorage === null) {
        return [];
    } else {
        return dataSaveJSONtoJS;
    }
};

// Guardar categorías en local
const saveLocalCategories = (array) => {
    const saveCategoriesJSON = JSON.stringify(array);
    localStorage.setItem('categories', saveCategoriesJSON);
};

// Obtener datos de categorías
categories = getCategoryData();

// Función para agregar una nueva categoría
const addCategory = () => {
    const inputCategory = document.getElementById('category');
    const newCategory = inputCategory.value.trim();

    if (newCategory !== '') {
        const newCategoryId = Date.now(); // Generar un nuevo ID
        categories.push({
            id: newCategoryId,
            name: newCategory,
        });
        saveLocalCategories(categories);
        updateCategoryList(categories);
        inputCategory.value = '';
    }
};

// Función de lista de categorías
const updateCategoryList = (arrCategories) => {
    const categoryList = document.getElementById('categoryList');
    categoryList.innerHTML = '';

    arrCategories.forEach((category) => {
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
            startCategoryEdit(category.id);
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('text-red-500', 'hover:underline', 'focus:outline-none');
        deleteButton.onclick = () => deleteCategory(category.id, category.name);

        categoryButtons.appendChild(editButton);
        categoryButtons.appendChild(deleteButton);

        categoryElement.appendChild(categoryName);
        categoryElement.appendChild(categoryButtons);

        // Asigna id a cada elemento
        categoryElement.id = `category-${category.id}`;

        categoryList.appendChild(categoryElement);
    });
};

updateCategoryList(categories);

// Función para comenzar a editar una categoría
const startCategoryEdit = (categoryId) => {
    const categoryElement = document.getElementById(`category-${categoryId}`);
    const categoryName = categoryElement.querySelector('span');

    // Crear una entrada para editar
    const editInput = document.createElement('input');
    editInput.value = categoryName.textContent;

    // Reemplazar el texto con la entrada para editar
    categoryName.replaceWith(editInput);

    // Centrarse en la entrada para editar
    editInput.focus();

    // Controlador para finalizar la edición
    editInput.addEventListener('blur', () => finishCategoryEdit(categoryId));
    editInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            finishCategoryEdit(categoryId);
        }
    });
};

// Función para terminar de editar una categoría
const finishCategoryEdit = (categoryId) => {
    const editInput = document.getElementById(`category-${categoryId}`).querySelector('input');
    const newName = editInput.value.trim();

    // Actualizar el nombre en la lista de categorías
    const categoryIndex = categories.findIndex((category) => category.id === categoryId);
    if (categoryIndex !== -1) {
        categories[categoryIndex].name = newName;

        // Guardar categorías actualizadas en el almacenamiento local
        saveLocalCategories(categories);

        // Actualizar la lista de categorías en la interfaz
        updateCategoryList(categories);
    }
};

// Función para eliminar una categoría
const deleteCategory = (categoryId, categoryName) => {
    const confirmation = confirm(`¿Estás seguro de que deseas eliminar la categoría "${categoryName}"?`);
    if (confirmation) {
        const categoryIndex = categories.findIndex((category) => category.id === categoryId);
        if (categoryIndex !== -1) {
            categories.splice(categoryIndex, 1);

            // Guardar categorías actualizadas en el almacenamiento local
            saveLocalCategories(categories);

            // Actualizar la lista de categorías en la interfaz
            updateCategoryList(categories);
        }
    }
};
