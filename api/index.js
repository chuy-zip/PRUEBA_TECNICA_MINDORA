import express from 'express';
import cors from 'cors';
import { getAllTasks } from './functions/test.js';

const port = 3000

const app = express();

app.use(cors());

app.use(express.json());


app.get('/', (req, res) => {
  res.json({ message: 'Base url test!' });
});


app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Express api with vercel!' });
});

app.get('/api/hi', (req, res) => {
  res.json({ message: 'Hi!' });
});

app.get('/api/tasks', async (req, res) => {

  try {
    const tasks = await getAllTasks();

    if (tasks) {
      res.status(200).json({ status: 'ok', data: tasks })
    } else {
      return res.status(404).send("No data was found")
    }

  } catch (error) {
    console.error(error)
    res.status(500).send('Server error')
  }

})

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})

export default app;
