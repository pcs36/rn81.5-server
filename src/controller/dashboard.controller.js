//dashboard.controller.js
import UserModel from '../models/users.model.js';
import deshboardModel from '../models/dashboard.model.js';



const getAllUserDetails = (request, response) => {
    const userId = request.user.id; // ✅ Extracted from token
    console.log("Logged-in User ID:", userId);

    deshboardModel.getAllUsers(userId,(error, responseData) => {
        if (error) {
            response.send({ status: 500, success: false, message: "Error in fetching user Data" })
        } else {
            response.send({ status: 200, success: true, message: "user Data fetched successfully", data: responseData })
        }
    })
}
/* const alluserdetails11 = async (req, res) => {
    try {
        const logingUser = await deshboardModel.alluser(req.body);
        console.log("logingUser:", logingUser);
        if (logingUser === null) {
            console.log("@1:=== null");
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
} */

export default { getAllUserDetails };