const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");


const db = require("../db/db");

router.get('/', (req, res) => {

    const sql = 'SELECT * FROM products';

    db.query(
        sql,
        (err,result) =>{
            if(err){
                return res.status(500).json(err);
            }
            res.json(result);
        }
    );
});

router.post("/",verifyToken,(req,res) => {

    if(req.user.role !== "admin"){
        return res.json(403).json({ message: "Forbidden"});
    }

    const {
        name,
        description,
        price,
        image_url,
        category,
        packaging_cost
    } = req.body;

    const sql = `
        INSERT INTO products
        (name, description, price, category, packaging_cost)
        VALUES(?, ?, ?, ?, ?)
        `;

    db.query(
        sql,
        [name, description, price, category, packaging_cost],
        (err,result) => {
            if(err){
                return res.status(500).json(err);
            }
            res.json({
                message:"Product Added"
            });
        }
    );
});

router.delete("/:id", verifyToken, (req,res) => {
    if(req.user.role !== "admin"){
        return res.json(403).json({ message: "Forbidden"});
    }

    const id = req.params.id;

    db.query(
        "DELETE FROM products WHERE id = ?",
        [id],
        (err,result) => {
            if(err){
                return res.status(500).json(err);
            }

            res.json({
                message:"Deleted"
            });
        }
    );
});

router.put("/:id", verifyToken, (req,res) =>{
    if(req.user.role !== "admin"){
        return res.json(403).json({ message: "Forbidden"});
    }
    
    const id = req.params.id;

    const{
        name,
        description,
        price,
        image_url,
        category,
        available,
        packaging_cost
    } = req.body;

    const sql = `
    UPDATE products
    SET
        name=?,
        description=?,
        price=?,
        category=?,
        available=?,
        packaging_cost=?
    WHERE id=?`;

    db.query(
        sql,
        [name, description, price,  category, available, packaging_cost, id],
        (err,result) =>{
            if(err){
                return res.status(500).json(err);
            }

            res.json({
                message:"Updated"
            });
        }
    );
});

module.exports = router;