import { server } from "./app.js";
import { connectDB } from "./data/database.js";
import dotenv from "dotenv";
dotenv.config();
connectDB();

server.listen(process.env.PORT, () => {
  console.log(`Server is working on port: ${process.env.PORT} `);
});
