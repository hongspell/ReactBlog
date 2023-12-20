import { db } from "../db.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
    // CHECK EXISTING USER
    const q = "SELECT id FROM users WHERE email = ? OR username = ? LIMIT 1";

    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if(err) return res.json(err);
        if(data.length) return res.status(409).json("User already exists!");

        // Hash the password & create a user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        const values = [req.body.username, req.body.email, hash];

        db.query(q, values, (err, data) => {
            if(err) return res.json(err);
            return res.status(200).json("User created!");
        });
    }); 
};

export const login = (req, res) => {
    // CHECK USER
    const q = "SELECT * FROM users WHERE username = ? LIMIT 1";

    db.query(q, [req.body.username], (err, data) => {
        if(err) return res.json(err);
        if(!data.length) return res.status(404).json("User not found!");

        // CHECK PASSWORD
        const validPassword = bcrypt.compareSync(req.body.password, data[0].password);
        if(!validPassword) return res.status(400).json("Wrong username or password!");

        // SET TOKEN
        const token = jwt.sign({id:data[0].id}, "jwtkey", {expiresIn: "8h"});
        // PREVENT PASSWORD FROM BEING SENT
        const { password, ...info } = data[0];
        // TAKE TOKEN IN COOKIE & SEND USER INFO WITHOUT PASSWORD
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(info);
    });
};

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure:true
    }).status(200).json("Logged out!");
};