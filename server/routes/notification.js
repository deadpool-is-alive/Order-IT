const express = require("express");
const router = express.Router();

const db = require("../db/db");

const verifyToken = require("../middleware/auth");

router.post("/save-token", verifyToken, async (req, res) => {
    const {token} = req.body;

    if(!token){
        return res.status(400).json({
            message: "Token required"
        });
    }

    try{

        db.query(`INSERT INTO admin_devices
                  (admin_id, fcm_token)
                  VALUES (?, ?)`, [req.user.id, token], (err) =>{
                    if(err){
                        return res.status(500).json(err);
                    }

                    res.json({
                        success: true
                    });
                  });
    } catch(err){
        res.status(500).json({
            message: err.message
        });
    }

});

router.delete("/remove-token", verifyToken, (req, res) => {
    
    const {token} = req.body;

    db.query(`DELETE 
              FROM admin_devices
              WHERE admin_id = ? 
              AND fcm_token = ?`,
            [req.user.id, token], (err) => {
                if(err){
                    return res.status(500).json(err);
                }

                res.json({
                    success: true
                });
            });
})

module.exports = router;