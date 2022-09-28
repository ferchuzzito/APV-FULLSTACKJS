import app from './src/app.js'
import dotenv from 'dotenv'
import { startConnection } from './src/database/database.js';

dotenv.config()
startConnection();

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.info(`server running in port ${PORT}`);