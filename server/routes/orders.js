const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const db = require("../db/db");
const sendPushNotification = require("../utils/firebaseMessaging");

router.post("/",(req,res)=>{
    const {
        customer_name,
        customer_rollnum,
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
            customer_rollnum,
            customer_phone,
            customer_address,
            total_price,
            delivery,
            status
        )
        VALUES
        (?, ?, ?, ?, ?, ?, 'Pending')
    `;

    db.query(orderSql, 
            [
                customer_name,
                customer_rollnum,
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
                                        item.packaging_cost

                                ], (err) => {
                                    if(err){
                                        reject(err);
                                        return;
                                    }

                                    resolve();
                                }
                                );

                            
                            // const productSql = `
                            //     SELECT 
                            //         packaging_cost
                            //     FROM products
                            //     WHERE id = ?
                            //     `;
                            
                            // db.query(productSql,[productID], (err,rows) =>{

                            //     if(err){
                            //         reject(err);
                            //         return;
                            //     }

                            //     const product = rows[0];

                            //     const itemSql = `
                            //     INSERT INTO order_items
                            //     (
                            //         order_id,
                            //         product_id,
                            //         quantity,
                            //         price,
                            //         packaging_cost
                            //     )
                            //     VALUES
                            //     (?, ?, ?, ?, ?)
                            //     `;

                            //     db.query(itemSql, [
                            //             orderId,
                            //             productID,
                            //             item.quantity,
                            //             item.price,
                            //             item.packaging_cost

                            //     ], (err) => {
                            //         if(err){
                            //             reject(err);
                            //             return;
                            //         }

                            //         resolve();
                            //     }
                            //     );
                            // });
                        })
                    );
                
                }

                Promise.all(itemPromises).then(() =>{

                    const io = req.app.get("io");

                    io.emit("new-order", {
                        orderId,
                        customer: customer_name, 
                        rollno: customer_rollnum,
                        total: total_price
                    });
                    
                    res.json({
                        message: "Order Created",
                        orderId
                    });
                }).catch(err=>{
                    res.status(500).json(err);
                    console.log("Not done");
                });

                db.query(`SELECT fcm_token FROM admin_devices`, async (err, devices) => {
                    if(err){
                        console.error(err);
                        return;
                    }


                    for(const device of devices){
                        //console.log("Before pushing notifcation by firebase: ", device);
                        try{
                            await sendPushNotification(
                                device.fcm_token,
                                "New Order",
                                `Order #${orderId} received`
                            );

                        }catch(err){

                            if(
                                err.code ===
                                "messaging/registration-token-not-registered"
                                ||
                                err.code ===
                                "messaging/invalid-registration-token"
                            ){

                                db.query(
                                    `
                                    DELETE
                                    FROM admin_devices
                                    WHERE fcm_token = ?
                                    `,
                                    [device.fcm_token]
                                );

                                console.log(
                                    "Removed invalid token"
                                );
                            }
                        }
                    }
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

router.get("/:id/items", verifyToken, (req, res) => {
    db.query(
        `
        SELECT oi.*, p.name
        FROM order_items oi
        JOIN products p
            ON p.id = oi.product_id
        WHERE oi.order_id = ?
        `,
        [req.params.id],
        (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Database error" });
            }

            res.json(rows);
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