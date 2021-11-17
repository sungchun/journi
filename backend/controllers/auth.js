//authorization controllers
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'

export const registerUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        console.log(newUser)
        return res.status(202).json({ message: `Welcome ${newUser.username}!` })
    } catch (err) {
        console.log(err)
        return res.status(422).json(err)
    }
}

export const loginUser = async (req, res) => {
    try {
        const loggingUser = await User.findOne({ username: req.body.username })
        console.log(`${req.body.username} is trying to login`)
        if (!loggingUser || !loggingUser.validatePassword(req.body.password)) {
            console.log('wont login')
            throw new Error()
        } else {
            const token = jwt.sign({ sub: loggingUser._id }, secret, { expiresIn: '7days' })
            console.log(`🫀  ${req.body.username} has logged in and has received a token!`)
            return res.status(200).json(token)

        }
    } catch (err) {
        console.log(err)
        return res.status(422).json({ message: 'unauthorized' })
    }
}