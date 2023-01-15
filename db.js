import mongoose from 'mongoose';
import logger from './src/utils/logger.js';

const connectDB = () => {
  try {
    mongoose.set('strictQuery', true)
    mongoose.connect(process.env.MONGODB_URI);

    logger.info('MongoDB Connected...');
  } catch (err) {
    logger.info('MongoDB Connection Error');
    logger.info(err);

    process.exit(1);
  }
}

export default connectDB;
