import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', routes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// For local development
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`);
});

export default app;