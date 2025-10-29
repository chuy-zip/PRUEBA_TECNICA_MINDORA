import Task from '../models/Task.js';

export const taskController = {
  async getAllTasks(req, res, next) {
    try {
      const tasks = await Task.findAll();
      res.status(200).json({ 
        status: 'success', 
        data: tasks,
        count: tasks.length 
      });
    } catch (error) {
      next(error);
    }
  },

  async getTaskById(req, res, next) {
    try {
      const task = await Task.findById(req.params.id);
      
      if (!task) {
        return res.status(404).json({ 
          status: 'error', 
          message: 'Tarea no encontrada' 
        });
      }
      
      res.status(200).json({ status: 'success', data: task });
    } catch (error) {
      if (error.message.includes('ID inválido')) {
        return res.status(400).json({
          status: 'error',
          message: 'ID de tarea inválido'
        });
      }
      next(error);
    }
  },

  async createTask(req, res, next) {
    try {
      const { 
        titulo, 
        descripcion, 
        prioridad,
        fechaVencimiento, 
        etiquetas = [] 
      } = req.body;

      // Validación mejorada
      if (!titulo || titulo.trim() === '') {
        return res.status(400).json({
          status: 'error',
          message: 'El título es requerido'
        });
      }

      if (prioridad && (prioridad < 1 || prioridad > 10)) {
        return res.status(400).json({
          status: 'error',
          message: 'La prioridad debe ser un número entre 1 y 10'
        });
      }

      const taskData = {
        titulo: titulo.trim(),
        descripcion: descripcion ? descripcion.trim() : '',
        prioridad: prioridad || 5,
        fechaVencimiento: fechaVencimiento ? new Date(fechaVencimiento) : null,
        etiquetas: Array.isArray(etiquetas) ? etiquetas : [etiquetas]
      };

      const taskId = await Task.create(taskData);
      
      res.status(201).json({
        status: 'success',
        message: 'Tarea creada exitosamente',
        data: { id: taskId, ...taskData }
      });
    } catch (error) {
      next(error);
    }
  },

  async updateTask(req, res, next) {
    try {
      const updatedCount = await Task.update(req.params.id, req.body);
      
      if (updatedCount === 0) {
        return res.status(404).json({
          status: 'error',
          message: 'Tarea no encontrada o sin cambios'
        });
      }

      res.status(200).json({
        status: 'success',
        message: 'Tarea actualizada exitosamente'
      });
    } catch (error) {
      if (error.message.includes('ID inválido')) {
        return res.status(400).json({
          status: 'error',
          message: 'ID de tarea inválido'
        });
      }
      next(error);
    }
  },

  async deleteTask(req, res, next) {
    try {
      const deletedCount = await Task.delete(req.params.id);
      
      if (deletedCount === 0) {
        return res.status(404).json({
          status: 'error',
          message: 'Tarea no encontrada'
        });
      }

      res.status(200).json({
        status: 'success',
        message: 'Tarea eliminada exitosamente'
      });
    } catch (error) {
      if (error.message.includes('ID inválido')) {
        return res.status(400).json({
          status: 'error',
          message: 'ID de tarea inválido'
        });
      }
      next(error);
    }
  },

  async getTasksByStatus(req, res, next) {
  try {
    const estado = req.params.status;
    
    // Validar que el estado sea uno de los permitidos
    if (estado !== 'completadas' && estado !== 'incompletas') {
      return res.status(400).json({
        status: 'error',
        message: 'Estado inválido. Use: "completadas" o "incompletas"'
      });
    }
    
    const completada = estado === 'completadas';
    const tasks = await Task.findByStatus(completada);
    
    res.status(200).json({
      status: 'success',
      data: tasks,
      count: tasks.length,
      estado: estado 
    });
  } catch (error) {
    next(error);
  }
},

  async completeTask(req, res, next) {
    try {
      const updateData = {
        completada: true,         
        completadaEn: new Date()  
      };

      const updatedCount = await Task.update(req.params.id, updateData);
      
      if (updatedCount === 0) {
        return res.status(404).json({
          status: 'error',
          message: 'Tarea no encontrada'
        });
      }

      res.status(200).json({
        status: 'success',
        message: 'Tarea marcada como completada'
      });
    } catch (error) {
      if (error.message.includes('ID inválido')) {
        return res.status(400).json({
          status: 'error',
          message: 'ID de tarea inválido'
        });
      }
      next(error);
    }
  }
};