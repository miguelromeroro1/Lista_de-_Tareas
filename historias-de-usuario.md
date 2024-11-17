## Historia de Usuario 6: Notificaciones por Tareas

## **Historia de Usuario 1: Crear Tareas**
**Como** usuario del sistema,  
**Quiero** poder agregar una nueva tarea con un título y una descripción,  
**Para** llevar un registro de mis actividades pendientes.  

**Criterios de aceptación:**
- El usuario debe poder ingresar un título para la tarea.
- El usuario debe poder ingresar una descripción opcional.
- La tarea debe guardarse en la base de datos con un estado inicial de "pendiente".

**Preguntas:**
1. ¿Deberíamos incluir una fecha de vencimiento para las tareas?  
  
2. ¿Los usuarios pueden editar tareas una vez creadas?  
   

---

## **Historia de Usuario 2: Ver Tareas**
**Como** usuario del sistema,  
**Quiero** visualizar una lista de todas las tareas creadas,  
**Para** saber cuáles están pendientes o completadas.  

**Criterios de aceptación:**
- La lista debe mostrar el título, la descripción y el estado de cada tarea.
- Debe haber un filtro para mostrar tareas por estado.

**Preguntas:**
1. ¿Es necesario incluir un buscador de tareas?  

2. ¿Los usuarios pueden personalizar el orden de las tareas (por fecha, prioridad, etc.)?  
 

---

## **Historia de Usuario 3: Editar Tareas**
**Como** usuario del sistema,  
**Quiero** poder editar los detalles de una tarea existente,  
**Para** corregir errores o actualizar su información.  

**Criterios de aceptación:**
- El usuario debe poder modificar el título, descripción y fecha de vencimiento.
- Los cambios deben guardarse inmediatamente en la base de datos.

**Preguntas:**
1. ¿Es necesario notificar a los usuarios sobre los cambios realizados?  
  
2. ¿Se debe guardar un historial de cambios realizados en cada tarea?  
   

---

## **Historia de Usuario 4: Completar Tareas**
**Como** usuario del sistema,  
**Quiero** marcar una tarea como completada,  
**Para** llevar un control de las actividades terminadas.  

**Criterios de aceptación:**
- El usuario debe poder cambiar el estado de una tarea a "completada".
- Las tareas completadas deben mostrarse separadas de las pendientes.

**Preguntas:**
1. ¿Se deben ocultar automáticamente las tareas completadas de la vista principal?  
 
2. ¿Es necesario agregar una opción para reactivar tareas completadas?  
   

---

## **Historia de Usuario 5: Eliminar Tareas**
**Como** usuario del sistema,  
**Quiero** poder eliminar una tarea que ya no necesito,  
**Para** mantener mi lista organizada.  

**Criterios de aceptación:**
- El usuario debe poder seleccionar una tarea para eliminar.
- La tarea debe eliminarse de la base de datos.

**Preguntas:**
1. ¿Se necesita una confirmación antes de eliminar una tarea?  
   
2. ¿Deberíamos mover las tareas eliminadas a una papelera temporal antes de eliminarlas permanentemente?  
  
