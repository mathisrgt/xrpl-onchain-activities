import dotenv from 'dotenv';

dotenv.config()

if (process.env.PORT === undefined)
    throw new Error('PORT is undefined');
export const PORT = process.env.PORT;