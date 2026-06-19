const express = require("express");
const router = express.Router();

const db = require("../db/db");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");
const crypto = require("crypto");
const {Resend} = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

const otpStore = new Map();

// const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: Number(process.env.SMTP_PORT) || 587,
//     secure: false,
//     auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//     },
// });

// POST /auth/login
// Body: {roll_num, password}
router.post("/login", (req, res) =>{
    const{ roll_num, password} = req.body;

    if(!roll_num || !password){
        return res.status(400).json({message: "Roll number and password are required:"});
    }
    //console.log("querying db");
    const sql = `
        SELECT u.id, u.roll_num, u.password, u.name, u.phone_number, i.email_address, i.resident_type
        FROM users u
        JOIN iitk_database i ON u.roll_num = i.roll_num
        WHERE u.roll_num = ?
    `;

    db.query(sql, [roll_num.trim().toUpperCase()], async (err, result) =>{
        if(err) return res.status(500).json({message: "Database error", error: err});

        if(result.length === 0){
            return res.status(401).json({message: "No account found for this roll number."});
        }

        const user = result[0];

        const match = await bcrypt.compare(password, user.password);

        if(!match){
            return res.status(401).json({message: "Incorrect password."});
        }

        const token = jwt.sign(
            {
                id: user.id,
                roll_num: user.roll_num,
                email: user.email_address,
                role: "user",
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d"}
        );

        res.json({
            message: "Login successful.",
            token,
            user: {
                roll_num : user.roll_num,
                name: user.name,
                email: user.email_address,
                phone_number: user.phone_number,
                resident_type: user.resident_type,
            },
        });
    });
});


// POST /auth/signup/verify
// Body: { roll_num }
// Checks iitk_database for roll_num, sends OTP to registered email

router.post("/signup/verify", (req, res) =>{
    const {roll_num} = req.body;

    if(!roll_num){
        return res.status(400).json({message: "Roll number is required."});
    }

    const normalizeRoll = roll_num.trim().toUpperCase();

    db.query("SELECT * FROM users WHERE roll_num = ?", [normalizeRoll], (err, userRows) =>{
        if(err) return res.status(500).json({message: "Database error.", error: err});

        if(userRows.length > 0){
            return res.status(409).json({message: "An account already exists for this roll number."});
        }


        db.query("SELECT * FROM iitk_database WHERE roll_num = ?", [normalizeRoll], async (err2, rows) =>{
            if(err2) return res.status(500).json({message: "Database error.", error: err2});

            if(rows.length === 0){
                return res.status(404).json({message: "Roll Number not found in IITK records. Contact admin."});
            }

            const {email_address} = rows[0];

            const otp = crypto.randomInt(100000,999999).toString();
            const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

            otpStore.set(normalizeRoll, {otp, expiresAt, email: email_address});

            try{
                // await transporter.sendMail({
                //     from: `"Hall 3 Canteen"<${process.env.SMTP_USER}>`,
                //     to: email_address,
                //     subject: "Your OTP for Hall 3 Canteen Sign-up",
                //     html: `
                //         <div style="font-family:sans-serif;max-width:480px;margin:auto;">
                //             <h2 style="color:#1a1a1a;">Hall 3 Canteen</h2>
                //             <p>Your one-time verification code is:</p>
                //             <h1 style="letter-spacing:8px;color:#e07b2a;">${otp}</h1>
                //             <p style="color:#666;">Valid for <strong>10 minutes</strong>. Do not share this with anyone.</p>
                //         </div>
                //     `
                // });

                // const maskedEmail = email_address.replace(/(.{2})(.*)(@.*)/, (_,a,b,c) => a + "*".repeat(b.length) + c);

                // res.json({
                //     message: `OTP sent to ${maskedEmail}`,
                //     masked_email: maskedEmail,
                // });
                await resend.emails.send({
                    from: "Hall 3 Canteen <otp@hall3canteen.in>",
                    to: email_address,
                    subject: "Your OTP for Hall 3 Canteen Sign-up",
                    html: `<div style="font-family:sans-serif;max-width:480px;margin:auto;">
                            <h2 style="color:#1a1a1a;">Hall 3 Canteen</h2>
                            <p>Your one-time verification code is:</p>
                            <h1 style="letter-spacing:8px;color:#e07b2a;">${otp}</h1>
                            <p style="color:#666;">Valid for <strong>10 minutes</strong>. Do not share this with anyone.</p>
                        </div>`,
                });

                const maskedEmail = email_address.replace(/(.{2})(.*)(@.*)/, (_,a,b,c) => a + "*".repeat(b.length) + c);

                res.json({
                    message: `OTP sent to ${maskedEmail}`,
                    masked_email: maskedEmail,
                });
            
            } catch (mailErr){
                console.log("Mail error:", mailErr);
                res.status(500).json({message: "Failed to send OTP. Try again later."});
            }
        });

    });
});


// POST /auth/signup/confirm-otp
// Body: {roll_num, otp}
// verifies otp, return a short lived session token for profile creation

router.post("/signup/confirm-otp", (req, res) =>{
    const {roll_num, otp} = req.body;

    if(!roll_num || !otp){
        return res.status(400).json({message: "Roll number and OTP are required: "});
    }

    const normalizeRoll = roll_num.trim().toUpperCase();
    const entry = otpStore.get(normalizeRoll);

    if(!entry){
        return res.status(400).json({message: "No OTP request found. Please restart sign-up."});
    }

    if(Date.now() > entry.expiresAt){
        otpStore.delete(normalizeRoll);
        return res.status(410).json({message: "OTP expired. Please request a new one"});
    }

    if(entry.otp !== otp.trim()){
        return res.status(401).json({message: "Incorrect OTP."});
    }

    otpStore.delete(normalizeRoll);

    const signupToken = jwt.sign(
        {roll_num: normalizeRoll, purpose: "signup"},
        process.env.JWT_SECRET,
        {expiresIn: "15m"}
    );

    res.json({
        message: "OTP verified",
        signup_token: signupToken,
    });
});


// POST /auth/signup/complete
// Body: {signup_token, name, phone_number, password}

router.post("/signup/complete", async (req, res) => {
    const {signup_token, name, phone_number, password} = req.body;

    if(!signup_token || !name || !phone_number || !password){
        return res.status(400).json({message: "All fields are required."});
    }

    let decoded;
    try{
        decoded = jwt.verify(signup_token, process.env.JWT_SECRET);
    }
    catch{
        return res.status(401).json({message: "Invalid or expired session. Please restart sign-up"});
    }

    if(decoded.purpose !== "signup"){
        return res.status(401).json({message: "Invalid token purpose."});
    }

    const {roll_num} = decoded;

    db.query("SELECT email_address FROM iitk_database WHERE roll_num = ?", [roll_num], async (err, rows) =>{
        if(err) return res.status(500).json({message: "Database error.", error: err});

        if(rows.length === 0) return res.status(404).json({message: "Roll number not found"});

        const {email_address} = rows[0];

        const passwordHash = await bcrypt.hash(password, 12);

        const insertSql = `
            INSERT INTO users (roll_num, email_address, password, name, phone_number)
            VALUES (?, ?, ?, ?, ?)
            `;
        
        db.query(insertSql, [roll_num, email_address, passwordHash, name.trim(), phone_number.trim()], (err2, result) =>{
            if(err2){
                if(err2.code === "ER_DUP_ENTRY"){
                    return res.status(409).json({message: "Account already exists."});
                }
                return res.status(500).json({message: "Failed to create  account.", error: err2});
            }

            const token = jwt.sign(
                { id: result.insertId, roll_num, email:email_address, role: "user"},
                process.env.JWT_SECRET,
                {expiresIn: "7d"}
            );

            res.status(201).json({
                message: "Account created successfully!",
                token,
                user: {
                    roll_num,
                    name: name.trim(),
                    email: email_address,
                    phone_number: phone_number.trim(),
                }
            });
        });
    });
});

router.post("/admin/login", (req, res) =>{

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
                username : admin.username,
                role: "admin",
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login successful.",
            token
        })
    })
});




module.exports = router;