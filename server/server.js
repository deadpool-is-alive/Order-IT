require('dotenv').config();
const express = require("express");
// const mysql = require("mysql2");
const db = require("./db/db");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// const db = mysql.createConnection({
//     host : process.env.DB_HOST,
//     user : process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

app.use('/products', require("./routes/products"));

app.use("/orders", require("./routes/orders"));

app.use("/shop", require("./routes/shop"));

const authRoutes = require("./routes/auth");

app.use("/auth", authRoutes);


app.get('/products/search',(req,res) => {
    const q = req.query.q;

    db.query(
        'SELECT * FROM products WHERE name LIKE ? OR category LIKE ? ', [`%${q}%`,`%${q}%`],
        (err,result) => {
            if(err){
                console.log("NOT FOUND");
                return res.status(500).json(err);
            }

            res.json(result);
        }
    );
});
const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
