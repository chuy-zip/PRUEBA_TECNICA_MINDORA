import { Router } from 'express';
import { taskController } from '../controllers/taskController.js';

const router = Router();
// la base par taskas es /api/tasks
// Rutas de los tasks
router.get('/', taskController.getAllTasks);

// ruta para poder obtener las tasks por estado, ej 
// /api/tasks/estado/completadas
// o bien /api/tasks/estado/incompletas
router.get('/estado/:status', taskController.getTasksByStatus); // /api/tasks/estado/completadas

//obtener un task por ID
router.get('/:id', taskController.getTaskById);

// crear un task nuevo
router.post('/', taskController.createTask);

//actualizar los datos de un task existente
router.put('/:id', taskController.updateTask);

//marcar como completado un task, en base a su id
router.put('/:id/completar', taskController.completeTask);

//eliminar un task por su id
router.delete('/:id', taskController.deleteTask);

export default router;