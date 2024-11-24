import createTokenAndSaveCookie from '../jwt/generateToken.js';
import User from '../models/user.models.js';
import bcrypt from 'bcrypt'

export const signup = async (req, res) => {
    const { fullName, email, password, confirmPassword } = req.body
    try {
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password do not match" })
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }
        // hash password
        const hassPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            fullName,
            email,
            password: hassPassword,
        })

        await newUser.save();

        if (newUser) {
            createTokenAndSaveCookie(newUser._id, res)
            res.status(200).json({
                message: "User created successfully", user: {
                    _id: newUser._id,
                    fullName: newUser.fullName,
                    email: newUser.email
                }
            })
        }
    } catch (error) {
        console.log("Error! ", error)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        const isMatch = await bcrypt.compare(password, user.password)
        if (!user || !isMatch) {
            res.status(400).json({ error: "Invalid user credentail" })
        }
        createTokenAndSaveCookie(user.id, res);
        res.status(200).json({
            message: "User logged in successfully", user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email
            }
        })

    } catch (error) {
        console.log("Error! ", error)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie("jwt")
        res.status(201).json({ message: "User logged out successfully" })
    } catch (error) {
        console.log("Error! ", error)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const allUsers = async (req, res) => {
    try {
        const loggedInUser = req.user._id
        const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password")
        return res.status(201).send(filteredUsers)
    } catch (error) {
        console.log("Error in all user controller: " + error)
    }
}