const express = require("express");
const router = express.Router();

const db = require("../db/db");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


router.post("/login", (req, res) =>{

    const { username, password} = req.body;

    const sql = 
    `SELECT *
    FROM admins
    WHERE username = ?
    `;
    db.query(sql, [username], async (err, result) => {

        if(err){
            return res.status(500).json(err);
        }

        if(result.length == 0){
            return res.status(401).json({
                message: "Invalid Username"
            });
        }

        const admin = result[0];

        const match =
            await bcrypt.compare(
                password, 
                admin.password
            );
        
        if(!match){
            return res.status(401).json({
                message: "Invalid Password"
            });
        }


        const token = jwt.sign(
            {
                id: admin.id,
                username : admin.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1D"
            }
        );

        res.json({
            message: "Login Successful",
            token
        })
    })
});


module.exports = router;