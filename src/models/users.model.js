import CryptoJS from "crypto-js";

import dbConnection from "../dbConnection/dbConnection.js";

import schema from "../schema/dbSchema.js";

schema.UsersSchema.userLogin = async (user) => {
    return new Promise((resolve, reject) => {
        dbConnection.query("SELECT * FROM users WHERE e_mail = ? AND is_deleted = 0", [user.e_mail], (error, result) => {
            if (error) {
                
                return reject({ status: 401, message: "Invalid userid or Password" });
            }
            if (result && result.length > 0) {
                
                const decryptedPassword = CryptoJS.AES.decrypt(result[0].password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
                // console.log("Decrypted password:", decryptedPassword, user.password);
                
                if (decryptedPassword !== user.password) {
                    
                    return resolve({ status: 401, message: "Invalid userid or Password1112" });
                }
                resolve(result);
            } else {
                
                return resolve({ status: 401, message: "Invalid userid or Password" });
                // return reject({ status: 401, message: "Invalid userid or Password" });
            }
        });
    });
}

// user Signup with Promise
schema.UsersSchema.createUser = async (newUser) => {
    return new Promise((resolve, reject) => {
        dbConnection.query("INSERT INTO users SET ?", newUser, (err, res) => {
            if (err) {
                console.error("Error while user creating:", err);
                reject(err);
            } else {
                console.log("User added successfully");
                resolve(res);
            }
        });
    });
};


// user e_mail exists or not and login with Promise
schema.UsersSchema.findUserEmailId = async (newUserEmail) => {
    return new Promise((resolve, reject) => {
        console.log("Email to check:", newUserEmail)
        dbConnection.query("SELECT * FROM users WHERE e_mail=?", newUserEmail, (error, result) => {
            if (error) {
                console.error("Error checking email:", error);
                return reject({ status: 500, message: "Database error" });
            }
            console.log("Email check result:", result);
            if (result && result.length > 0) {
                console.log("@12")
                return resolve({ status: 409, message: "Email already exists" });
            } else {
                console.log("@13")
                return resolve({ status: 200, message: "Email available" })
            }
        })
    });
};

export default schema.UsersSchema;