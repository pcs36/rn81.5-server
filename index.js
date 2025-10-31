//index.js-----------------

import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'

import activeTokens from './src/helper/tokenStore.js'

import usersRoute from './src/routes/users.routes.js'
import dashboardRoute from './src/routes/dashboard.route.js'
import UserModel from './src/models/users.model.js';

const PORT = process.env.PORT || 5000;
const app = new express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

async function verifyToken(request, response, next) {
    const bearerHeader = request.headers['authorization'];
    // console.log("bearerHeader:", bearerHeader);
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        // Verify token with your JWT secret
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, authData) => {
            if (err) {
                // Token is invalid or expired
                return response.status(403).json({
                    success: false,
                    message: err.name === "TokenExpiredError"
                        ? "Token has expired, please log in again."
                        : "Invalid token."
                });
            } else {
                // ---------- if new token generate, old token are not valid, and session expire
                const userId = authData.logingUserData?.id;
                
                // Check if token matches the active one
                const activeToken = activeTokens.get(userId);
                if (activeToken !== token) {
                    return response.status(200).json({
                        status: 403,
                        success: false,
                        message: "This token is no longer valid. Please log in again."
                    });
                }
                // ---------- if new token generate, old token are not valid, and session expire

                // Token is valid, attach decoded data to request
                // request.user = authData;
                request.user = { id: userId, ...authData.logingUserData };
                next();
            }
        });

    } else {
        // No token provided
        return response.status(401).json({
            success: false,
            message: "Authorization token missing."
        });
    }
}

app.use(process.env.API_URL + process.env.API_VERSION + '/user', usersRoute)
app.use(process.env.API_URL + process.env.API_VERSION + '/dashboard', verifyToken, dashboardRoute)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})