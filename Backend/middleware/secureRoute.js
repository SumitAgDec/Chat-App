import jwt from 'jsonwebtoken'
import User from '../models/user.models.js'

const secureRoutes = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "No token, authorization denied" })
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        if (!decode) {
            return res.status(401).json({ error: "Invalid Token" })
        }
        const user = await User.findById(decode.userId).select("-password");
        if (!user) {
            return res.status(401).json({ error: "No user found" })
        }
        req.user = user;
        next()
    } catch (error) {
        console.log("Error in secureRoute: ", error)
        return res.status(500).json({ error: "Internal Server error" })
    }
}

export default secureRoutes