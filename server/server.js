import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import colors from 'colors';
import cookieParser from 'cookie-parser';
//import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import cors from 'cors';
import errorHandler from './middleware/error.js';

import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import productRoutes from './routes/productRoutes.js';

// ✅ Load env vars from root .env
dotenv.config(); // Assumes .env is in root directory



// ✅ Connect to MongoDB
console.log('📡 MONGO_URI:', process.env.MONGO_URI); // Debug log
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('✅ MongoDB connected successfully'.cyan.bold);
  })
  .catch((err) => {
    console.error(`❌ MongoDB connection failed: ${err.message}`.red);
    process.exit(1);
  });

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// Dev logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//app.use(mongoSanitize());
app.use(helmet());
app.use(xss());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100
});
app.use(limiter);

app.use(hpp());
app.use(cors());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/orders', orderRoutes);

// ✅ Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});

// ✅ Graceful shutdown
process.on('unhandledRejection', (err, promise) => {
  console.log(`💥 Unhandled Rejection: ${err.message}`.red);
  server.close(() => process.exit(1));
});
