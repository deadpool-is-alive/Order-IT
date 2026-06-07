const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password: 'goneToos00n',
    database: 'food_order_db'
});


app.get('/products', (req, res) => {
    db.query(
        'SELECT * FROM menu_items',
        (err,result) =>{
            if(err){
                return res.status(500).json(err);
            }
            res.json(result);
        }
    );
});

app.get('/products/search',(req,res) => {
    const q = req.query.q;

    db.query(
        'SELECT * FROM menu_items WHERE item_name LIKE ?', [`%${q}%`],
        (err,result) => {
            if(err){
                console.log("NOT FOUND");
                return res.status(500).json(err);
            }

            res.json(result);
        }
    );
});

app.listen(5000, () => {
    console.log("Server Running");
});