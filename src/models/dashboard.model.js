//dashboard.model.js

import CryptoJS from "crypto-js";

import dbConnection from "../dbConnection/dbConnection.js";

import schema from "../schema/dbSchema.js";

/* schema.UsersSchema.getAllUsers = async (user) => {
    return new Promise((resolve, reject) => {
        dbConnection.query("SELECT * FROM users WHERE e_mail = ? AND is_deleted = 0", [user.e_mail], (error, result) => {
            if (error) {
                console.log("Q1", error);
                return reject({ status: 401, message: "Invalid userid or Password" });
            }
            if (result && result.length > 0) {
                console.log("Q2");
                const decryptedPassword = CryptoJS.AES.decrypt(result[0].password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
                // console.log("Decrypted password:", decryptedPassword, user.password);
                
                if (decryptedPassword !== user.password) {
                    console.log("@4");
                    return resolve({ status: 401, message: "Invalid userid or Password1112" });
                }
                resolve(result);
            } else {
                console.log("@3");
                return resolve({ status: 401, message: "Invalid userid or Password" });
                // return reject({ status: 401, message: "Invalid userid or Password" });
            }
        });
    });
} */

//get data from only multiple database
schema.UsersSchema.getAllUsers = async (userId, result) => {
    console.log("userId--------", userId)
    dbConnection.query("SELECT * FROM users WHERE is_deleted = 0", (error, responseData) => {
        if (error) {
            console.log("Check your query")
            result(null, error)
        } else {
            const users = responseData.map(row => {
                return {
                    id: row.id,
                    first_name: row.f_name,
                    last_name: row.l_name,
                    email_id: row.e_mail,
                    is_deleted: row.is_deleted,
                    created_at: row.created_at,
                    updated_at: row.updated_at,
                }
            })
            result(null, users);
            // all data required to send
            // result(null, responseData);
        }
    })
}

export default schema.UsersSchema;