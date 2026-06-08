const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const db = require("../db/db");

router.post("/",(req,res)=>{
    
    const {
        customer_name,
        customer_phone,
        customer_address
    } = req.body;

    const sql = `
    INSERT INTO orders
    (
        customer_name,
        customer_phone,
        customer_address,
        status
    )
    VALUES
    (?, ?, ?, 'Pending')`;

    db.query(
        sql,
        [
            customer_name,
            customer_phone,
            customer_address
        ],
        (err,result) =>{
            if(err){
                return res.status(500).json(err);
            }

            res.json({
                orderId:result.insertId
            });
        }
    );

});

router.get("/",verifyToken, (req,res) =>{

    db.query(
        "SELECT * FROM orders ORDER BY  id DESC",
        (err,result) => {

            if(err){
                return res.status(500).json(err);
            }

            res.json(result);
        }
    );
});

router.put("/:id/status",verifyToken,(req,res) => {

    const id = req.params.id;

    const {status} = req.body;

    const sql = `
    UPDATE orders
    SET status=?
    WHERE id=?`;

    db.query(
        sql,
        [status,id],
        (err,result) =>{
            if(err){
                return res.status(500).json(err);
            }

            res.json({
                message:"Status Updated"
            });
        }
    );
});

module.exports = router;