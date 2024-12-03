import express from 'express';
import cors from 'cors';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


// Imports
import userRoutes from './routes/user.routes';
import { ErrorHandler } from './middlewares/ErrorHandler';

// Routes
app.use("/api/v1/auth/user", userRoutes)

// Error Handler
app.use(ErrorHandler.handle);

export default app