import { Router } from 'express';
import taskRoutes from './taskRoutes.js';

const router = Router();

// Health check routes
router.get('/', (req, res) => {
  res.json({ message: 'Base url test!' });
});

router.get('/api', (req, res) => {
  res.json({ message: 'Hello from Express api with vercel!' });
});

router.get('/api/hi', (req, res) => {
  res.json({ message: 'Hi!' });
});

// API routes
router.use('/api/tasks', taskRoutes);

export default router;