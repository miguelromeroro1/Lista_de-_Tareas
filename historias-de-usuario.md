# Historias de Usuario

## Historia de Usuario 1: Crear Tareas
**Como** usuario del sistema,  
**Quiero** poder agregar una nueva tarea con un título y una descripción,  
**Para** llevar un registro de mis actividades pendientes.

**Criterios de aceptación:**
- El usuario debe poder ingresar un título para la tarea.
- El usuario debe poder ingresar una descripción opcional.
- La tarea debe guardarse en la base de datos con un estado inicial de "pendiente".

## Historia de Usuario 2: Ver Tareas
**Como** usuario del sistema,  
**Quiero** visualizar una lista de todas las tareas creadas,  
**Para** saber cuáles están pendientes o completadas.

**Criterios de aceptación:**
- Se debe mostrar una lista de tareas con título y estado.
- El estado debe ser "pendiente" o "completada".

## Historia de Usuario 3: Editar Tareas
**Como** usuario del sistema,  
**Quiero** poder editar una tarea existente,  
**Para** actualizar el título o la descripción según sea necesario.

**Criterios de aceptación:**
- El usuario debe poder seleccionar una tarea para editar.
- Se deben guardar los cambios en la base de datos.

## Historia de Usuario 4: Completar Tareas
**Como** usuario del sistema,  
**Quiero** marcar una tarea como completada,  
**Para** llevar un registro de las tareas finalizadas.

**Criterios de aceptación:**
- El usuario debe poder marcar una tarea como "completada".
- El cambio debe reflejarse en la base de datos.

## Historia de Usuario 5: Eliminar Tareas
**Como** usuario del sistema,  
**Quiero** poder eliminar una tarea que ya no necesito,  
**Para** mantener mi lista organizada.

**Criterios de aceptación:**
- El usuario debe poder seleccionar una tarea para eliminar.
- La tarea debe eliminarse de la base de datos.
