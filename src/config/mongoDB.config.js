import mongoose from 'mongoose';
import envsConfig from './envs.config.js';
import { logger } from '../common/utils/logger.js';

export const connectDB = () => {
    try {
        mongoose.connect(envsConfig.MONGO_URL)
        logger.info("Connected to the database")
    } catch (error) {
        logger.error("Error connecting to the database")
    }
}