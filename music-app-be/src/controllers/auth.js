import User from "../models/User.js";
import bcrypt from 'bcrypt';
import { generateToken } from "../utils/generateToken.js";

export const login = async (req, res) => {
    const { username, password } = req.body;
    
    const user = await User.findOne({
        $or: [{ username }, { email: username }],
    })

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = generateToken(user);
        res.json({ user: { ...user._doc, password: undefined }, token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
}

export const register = async (req, res) => {
    try {
        const user = new User(req.body)
        const saved = await user.save()
        res.status(201).json(saved)
    } catch (err) {
        if (err.code === 11000) {
            // Duplicate key error (email atau username sudah ada)
            const field = Object.keys(err.keyValue)[0] // Misal: "email" atau "username"
            return res.status(422).json({ message: `${field} already taken` })
        }

        res.status(400).json({ error: err.message })
    }
}


export const me = (req, res) => {
    res.json({ user: req.user });
}