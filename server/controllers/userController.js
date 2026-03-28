import cloudinary from "../lib/cloudinary.js"
import { generateToken } from "../lib/utils.js"
import User from "../models/User.js"
import bcrypt from "bcryptjs"

// Signup a new user
export const signup = async (req, res) => {
    const { fullName, email, password, bio } = req.body

    try {
        if (!fullName || !email || !password || !bio) {
            return res.json({ success: false, message: "Missing Details" })
        }

        const user = await User.findOne({ email })

        if (user) {
            return res.json({ success: false, message: "Account already Exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPasword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            fullName, email, password: hashedPasword, bio
        })

        const token = generateToken(newUser._id)

        res.json({ success: true, userData: newUser, token, message: "Account Created Successfully" })

    } catch (error) {
        console.log(error.message);
        res.json({ message: error.message })
    }
}

// Login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        // check if user exists
        const userData = await User.findOne({ email })

        if (!userData) {
            return res.status(401).json({ success: false, message: "Invalid email or password" })
        }

        // check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, userData.password)

        if (!isPasswordCorrect) {
            return res.json({ success: false, message: "Invalid Credentials" })
        }

        // return success message
        const token = generateToken(userData._id)

        return res.json({ success: true, message: "Login successful", token, userData })

    } catch (error) {
        console.log(error.message);
        res.json({ message: error.message })
    }
}

// check if user is authenticated
export const checkAuth = (req, res) => {
    res.json({ success: true, user: req.user })
}

// update user profile details
export const updateProfile = async (req, res) => {
    try {
        const { profilePic, bio, fullName } = req.body

        const userId = req.user._id
        let updatedUser;

        if (!profilePic) {
            updatedUser = await User.findByIdAndUpdate(userId, { bio, fullName }, { new: true })
        } else {
            const upload = await cloudinary.uploader.upload(profilePic)

            updatedUser = await User.findByIdAndUpdate(userId, { profilePic: upload.secure_url, bio, fullName }, { new: true })
        }

        res.json({ success: true, user: updatedUser })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}