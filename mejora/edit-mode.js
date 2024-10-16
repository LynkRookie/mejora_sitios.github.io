document.addEventListener('DOMContentLoaded', () => {
    const configButton = document.querySelector('.sidebar-footer button:nth-child(2)');
    let editMode = false;

    function toggleEditMode(event) {
        event.preventDefault();
        event.stopPropagation();
        
        // Cambiar el estado de edición
        editMode = !editMode;
        
        // Cambiar el texto del botón de configuración
        const buttonText = configButton.querySelector('span');
        if (buttonText) {
            buttonText.textContent = editMode ? 'Configuración' : 'Configuración';
        }

        // Mostrar u ocultar controles de edición
        toggleEditableElements();
    }

    configButton.addEventListener('click', toggleEditMode);

    // Función para alternar controles de edición
    function toggleEditableElements() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            // Cambia 'lenguajes-adquiridos' a la clase que realmente usas en tu HTML
            if (editMode && !card.classList.contains('no-edit') && !card.classList.contains('card full-width')) {
                addEditControls(card);
            } else {
                removeEditControls(card);
            }
        });
    }

    // Función para agregar controles de edición
    function addEditControls(element) {
        if (element.querySelector('.edit-controls')) return;

        const controls = document.createElement('div');
        controls.classList.add('edit-controls');
        controls.style.position = 'absolute';
        controls.style.bottom = '10px';
        controls.style.left = '10px';
        controls.style.right = '10px';
        controls.style.display = 'flex';
        controls.style.justifyContent = 'center';
        controls.style.gap = '10px';
        controls.style.zIndex = '1000';

        const editButton = createButton('edit-2', 'Editar', () => editContent(element));
        const saveButton = createButton('save', 'Guardar', () => saveContent(element));
        const deleteButton = createButton('trash-2', 'Eliminar', () => deleteElement(element));

        controls.appendChild(editButton);
        controls.appendChild(saveButton);
        controls.appendChild(deleteButton);

        element.style.position = 'relative';
        element.style.paddingBottom = '50px';
        element.appendChild(controls);

        lucide.createIcons();
    }

    // Función para crear botones de control
    function createButton(icon, text, clickHandler) {
        const button = document.createElement('button');
        button.innerHTML = `<i data-lucide="${icon}"></i> ${text}`;
        button.addEventListener('click', clickHandler);
        button.style.padding = '5px 10px';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.backgroundColor = icon === 'save' ? '#4CAF50' : icon === 'edit-2' ? '#2196F3' : '#f44336';
        button.style.color = 'white';
        return button;
    }

    // Función para eliminar controles de edición
    function removeEditControls(element) {
        const controls = element.querySelector('.edit-controls');
        if (controls) {
            element.removeChild(controls);
            element.style.paddingBottom = '';
        }
        const textarea = element.querySelector('textarea');
        if (textarea) {
            textarea.removeAttribute('contenteditable');
        }
    }

    // Función para permitir la edición del textarea
    function editContent(element) {
        const textarea = element.querySelector('textarea');
        if (textarea) {
            textarea.setAttribute('contenteditable', 'true');
            textarea.focus();
        }
    }

    // Función para guardar el contenido editado
    function saveContent(element) {
        const textarea = element.querySelector('textarea');
        if (textarea) {
            textarea.removeAttribute('contenteditable');
            showNotification('Los datos se han guardado correctamente en la base de datos');
        }
    }

    // Función para eliminar un elemento
    function deleteElement(element) {
        if (confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
            element.remove();
            showNotification('Los datos se han eliminado correctamente de la base de datos');
        }
    }

    // Función para mostrar notificaciones
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = '#333';
        notification.style.color = 'white';
        notification.style.padding = '10px';
        notification.style.borderRadius = '5px';
        notification.style.zIndex = '1000';
        document.body.appendChild(notification);

        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }
});
