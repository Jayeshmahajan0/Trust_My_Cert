import express from 'express';
import bcrypt from 'bcrypt';
import pool from "../Database/Database_connection.js";

const authRoute = express.Router();

authRoute.post('/register', async(req,res)=>{
    const {username,email,password, age} = req.body;

    try{

       const userExists = await pool.query(
      "SELECT * FROM registered_users WHERE email = $1",
      [email]
    );
    if(userExists.rowCount > 0){
        return res.status(400).json({message:"user alredy exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
        "INSERT INTO registered_users (username, email, password, age) VALUES ($1, $2, $3, $4) RETURNING *",
        [username, email, hashedPassword, age]
    );  

    return res.status(201).json({message:"user created successfully", user: newUser.rows[0]});
} catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default authRoute;
