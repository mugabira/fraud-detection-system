import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectKafka } from './config/kafka';
import { setupSwagger } from './config/swagger';



const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// After middleware setup
connectKafka().catch(console.error);
setupSwagger(app);

// Simple route for testing
app.get('/', (req, res) => {
  res.send('Hello from TypeScript Express!');
});

export default app;