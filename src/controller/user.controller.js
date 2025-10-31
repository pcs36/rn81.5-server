//user.controller.js--------------------------
import UserModel from '../models/users.model.js';

import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import activeTokens from '../helper/tokenStore.js';


//use this for token validation for all devices
const userLogin = async (req, res) => {
    try {
        const logingUser = await UserModel.userLogin(req.body);
        if (logingUser === null) {
            return res.status(401).json({
                status: 401,
                success: false,
                message: "Invalid userid or Password"
            });
        } else {
            if (logingUser.status === 401) {
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: logingUser.message,
                    user: logingUser.user, // optional — your fetched user data
                    data: {
                        status: logingUser.status,
                        success: false,
                        message: logingUser.message
                    }
                });

            } else {
                const { password, ...userWithoutPassword } = logingUser[0]; //remove password from response
                
                jwt.sign({ logingUserData: userWithoutPassword }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
                    if (err) {
                        return res.status(500).json({
                            status: 500,
                            success: false,
                            message: "Error generating token"
                        });
                    } else {
                        // Save current active token in memory
                        activeTokens.set(userWithoutPassword.id, token);
                        
                        return res.status(200).json({
                            status: 200,
                            success: true,
                            message: "Login successful",
                            data: { ...userWithoutPassword, token: token }
                        });
                    }
                });
            }
        }

    } catch (error) {
        console.log("Error in userLogin:", error);
        if (error.status === 401) {
            return res.status(401).json({
                status: 401,
                success: false,
                message: error.message
            })
        }
        return res.status(500).json({
            status: 500,
            success: false,
            message: "Internal server error"
        });
    }
}



const createUser = async (req, resp) => {
    try {
        if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
            return resp.status(400).json({
                success: false,
                message: "Please fill all the required fields"
            })
        }
        let newUserObj = req.body;
        if (newUserObj.e_mail) {
            const existingUser = await UserModel.findUserEmailId(newUserObj.e_mail);
            if (existingUser.status === 409) {
                return resp.status(200).json({
                    status: 200,
                    success: false,
                    message: existingUser.message,
                    data: {
                        status: existingUser.status,
                        success: false,
                        message: existingUser.message
                    }
                });
                /* return resp.status(200).json({
                    status: 200,
                    success: false,
                    message: "Email already exists"
                }); */
            } else {
                console.log("No existing user found");
                var ciphertext = CryptoJS.AES.encrypt(newUserObj.password, process.env.SECRET_KEY).toString();

                const userSignupData = {
                    f_name: newUserObj.f_name,
                    l_name: newUserObj.l_name,
                    e_mail: newUserObj.e_mail,
                    password: ciphertext,
                    is_deleted: 0,
                    created_at: new Date(),
                    updated_at: new Date()
                }
                console.log("userSignupData:", userSignupData);

                const createNewuser = await UserModel.createUser(userSignupData)

                return resp.status(200).json({
                    status: 200,
                    success: true,
                    message: "User added successafully",
                    data: {
                        status: 200,
                        newuserDetail: createNewuser
                    }
                });

            }
        }
    } catch (error) {
        return resp.status(500).json({
            status: 500,
            success: false,
            message: "some error show in userSignaup model"
        })
    }
}


export default { userLogin, createUser };