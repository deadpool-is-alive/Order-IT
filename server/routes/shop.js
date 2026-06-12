const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const db = require("../db/db");
const { verify } = require("jsonwebtoken");

router.get("/status", (req, res) => {
    db.query(
        "SELECT is_open FROM shop_settings WHERE id = 1",
        (err, result) =>{
            if(err) return res.status(500).json(err);

            res.json({
                isOpen: Boolean(result[0].is_open) 
            });
        }
    );
});


router.put("/status", verifyToken, (req, res) => {
    const {isOpen} = req.body;

    db.query(
        "UPDATE shop_settings SET is_open = ? WHERE id = 1",
        [isOpen],
        (err) =>{
            if(err) return res.status(500).json(err);

            res.json({
                success: true,
                isOpen
            });
        }
    );
});


module.exports = router;