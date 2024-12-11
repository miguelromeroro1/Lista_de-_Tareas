// Referencias a los elementos
const addTaskButton = document.getElementById('addTaskButton');
const calendarModal = document.getElementById('calendarModal');
const calendarInput = document.getElementById('calendarInput');
const saveTaskButton = document.getElementById('saveTaskButton');

// Inicializar Flatpickr
flatpickr(calendarInput, {
  enableTime: true,
  dateFormat: "Y-m-d H:i",
});

// Mostrar el modal al hacer clic en el botón "Agregar nueva tarea"
addTaskButton.addEventListener('click', () => {
  calendarModal.style.display = 'block';
});

// Guardar la tarea al hacer clic en "Guardar Tarea"
saveTaskButton.addEventListener('click', () => {
  const selectedDate = calendarInput.value;
  if (selectedDate) {
    alert(`Tarea guardada para: ${selectedDate}`);
    calendarModal.style.display = 'none';
  } else {
    alert('Por favor selecciona una fecha');
  }
});

// Cerrar el modal al hacer clic fuera del contenido
window.addEventListener('click', (event) => {
  if (event.target === calendarModal) {
    calendarModal.style.display = 'none';
  }
});
