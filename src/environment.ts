import dotenv from 'dotenv';

dotenv.config()

// Server
if (process.env.PORT === undefined)
    throw new Error('PORT is undefined');
export const PORT = process.env.PORT;

// Database
if (process.env.MONGODB_URI === undefined)
    throw new Error('MONGODB_URI is undefined');
export const MONGODB_URI = process.env.MONGODB_URI;
