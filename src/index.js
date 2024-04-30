import dotenv from "dotenv";
import app from "./app.js";

//dotenv config
dotenv.config();

//env variables
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}...`);
});
