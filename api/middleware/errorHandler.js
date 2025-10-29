export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // MongoDB duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      status: 'error',
      message: 'El recurso ya existe'
    });
  }

  // MongoDB ObjectId error
  if (err.name === 'CastError' || err.message.includes('ID inválido')) {
    return res.status(400).json({
      status: 'error',
      message: 'ID inválido'
    });
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(error => error.message);
    return res.status(400).json({
      status: 'error',
      message: 'Datos de entrada inválidos',
      errors: errors
    });
  }

  // Default error
  res.status(500).json({
    status: 'error',
    message: 'Error interno del servidor'
  });
};

export const notFound = (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Ruta no encontrada'
  });
};