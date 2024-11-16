
Historia de Usuario 1: Crear Tareas
Como usuario del sistema,
Quiero poder agregar una nueva tarea con un título y una descripción,
Para llevar un registro de mis actividades pendientes.

Criterios de aceptación:

 El usuario debe poder ingresar un título para la tarea.
 El usuario debe poder ingresar una descripción opcional.
 La tarea debe guardarse en la base de datos con un estado inicial de "pendiente".

Historia de Usuario 2: Ver Tareas
Como usuario del sistema,
Quiero visualizar una lista de todas las tareas creadas,
Para saber cuáles están pendientes o completadas.

Criterios de aceptación:

 La lista debe mostrar todas las tareas con su título, descripción y estado.
 Las tareas deben estar organizadas en orden de creación.
 Debe haber una indicación visual clara del estado de cada tarea (pendiente o completada).
 
Historia de Usuario 3: Actualizar Tareas
Como del sistema,
Quiero poder marcar una tarea como completada o editar su información,
Para mantener actualizado el estado y la descripción de mis tareas.

Criterios de aceptación:

 El usuario debe poder marcar una tarea como "completada".
 El usuario debe poder editar el título o la descripción de una tarea existente.
 Los cambios deben reflejarse inmediatamente en la base de datos y en la interfaz.
 
Historia de Usuario 4: Eliminar Tareas
Como usuario del sistema,
Quiero poder eliminar una tarea,
Para eliminar tareas innecesarias o que ya no sean relevantes.

Criterios de aceptación:

 El usuario debe tener un botón o enlace para eliminar cada tarea.
 Al eliminar una tarea, debe desaparecer de la lista de manera inmediata.
 La tarea eliminada no debe estar en la base de datos después de la acción.
 
Historia de Usuario 5: Filtrar Tareas por Estado
Como del sistema,
Quiero poder filtrar las tareas según su estado de usuario (pendiente o completada),
Para visualizar fácilmente las tareas que aún requieren mi atención.

Criterios de aceptación:

 El usuario debe tener opciones de filtro para "todas", "pendientes" y "completas".
 La lista debe actualizarse dinámicamente según el filtro seleccionado.
 Los filtros no deben afectar las tareas almacenadas en la base de datos.
