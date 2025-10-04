import express from "express";
import pool from "../BACKEND/src/Database/Database_connection.js";
import authRoutes from "../BACKEND/src/routes/auth_route.js"
import dotenv from "dotenv";
import loginRoute from '../BACKEND/src/routes/login_route.js'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // user data ko parse karne ke liye



app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.send(`Connected to DB! Time: ${result.rows[0].now}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

app.use("/auth", authRoutes);
app.use("/auth", loginRoute)


app.listen(PORT, () => {
  console.log("database connected sucessfully....");
  
  console.log(`Server running on http://localhost:${PORT}`);
});
