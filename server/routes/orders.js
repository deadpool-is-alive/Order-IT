const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const db = require("../db/db");

router.post("/",(req,res)=>{
    const {
        customer_name,
        customer_phone,
        customer_address,
        delivery,
        total_price,
        cart
    } = req.body;

    const orderSql = `
        INSERT INTO orders
        (
            customer_name,
            customer_phone,
            customer_address,
            total_price,
            delivery,
            status
        )
        VALUES
        (?, ?, ?, ?, ?, 'Pending')
    `;

    db.query(orderSql, 
            [
                customer_name,
                customer_phone,
                customer_address,
                total_price,
                delivery
            ],
            (err,result) => {
                
                if(err){
                    return res.status(500).json(err);
                }

                const orderId = result.insertId;

                const itemPromises = [];

                for(const [productID,item] of Object.entries(cart)){
                    itemPromises.push(
                        new Promise( (resolve, reject) =>{
                            
                            const productSql = `
                                SELECT 
                                    packaging_cost
                                FROM products
                                WHERE id = ?
                                `;
                            
                            db.query(productSql,[productID], (err,rows) =>{

                                if(err){
                                    reject(err);
                                    return;
                                }

                                const product = rows[0];

                                const itemSql = `
                                INSERT INTO order_items
                                (
                                    order_id,
                                    product_id,
                                    quantity,
                                    price,
                                    packaging_cost
                                )
                                VALUES
                                (?, ?, ?, ?, ?)
                                `;

                                db.query(itemSql, [
                                        orderId,
                                        productID,
                                        item.quantity,
                                        item.price,
                                        product.packaging_cost

                                ], (err) => {
                                    if(err){
                                        reject(err);
                                        return;
                                    }

                                    resolve();
                                }
                                );
                            });
                        })
                    );
                
                }

                Promise.all(itemPromises).then(() =>{
                    res.json({
                        message: "Order Created",
                        orderId
                    });
                }).catch(err=>{
                    res.status(500).json(err);
                    console.log("Not done");
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