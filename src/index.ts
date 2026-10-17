// src/index.ts
import 'reflect-metadata'; // MUST be first import for TypeORM decorators!
import express from 'express';
import cors from 'cors';
import {taskRoutes} from './routes/taskRoutes';
import { AppDataSource } from './config/data-source';
import { userRoutes } from './routes/userRoutes';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api', taskRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/users', userRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'ROUTE_NOT_FOUND',
      message: `Route ${req.method} ${req.url} not found`
    }
  });
});

// Initialize database connection
AppDataSource.initialize()
  .then(() => {
    console.log('✅ Database connected successfully!');

  //Routes
  app.use('/api/users', userRoutes),

  //Start Server
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
})
  .catch((error) => {
    console.error('❌ Database connection failed:', error);
  });
