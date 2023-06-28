import { connect } from "mongoose";
import dotenv from 'dotenv'
//import config from "./src/config/config.js";

dotenv.config()
export const startConnection = async () => {
  try {
    const db = await connect(`${process.env.MONGO_URI}`);
    console.log(db.connection.name);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
