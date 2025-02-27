import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import 'dotenv/config';
import './cron/taskCron.js';

const app = express();

app.use(cors());

app.use(express.json());
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API de Gestión de Tareas!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


export default app;
