import express from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './infrastructure/config/database';
import { runMigrations } from './infrastructure/database/migrations';
import showRoutes from './interfaces/routes/showRoutes';
import episodeRoutes from './interfaces/routes/episodeRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7777;

app.use(express.json());

// Routes
app.use('/shows', showRoutes);
app.use('/episodes', episodeRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

/**
 * Initializes the application: conects to the db, runs migrations and starts the server.
 */
const bootstrap = async () => {
  await connectDatabase();
  await runMigrations();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

bootstrap();

export default app;