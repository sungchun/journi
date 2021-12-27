import jwt from "jsonwebtoken"
import User from '../models/userModel.js'
import { secret } from './environment.js'

export const secureRoute = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw new Error()
        }
        const token = req.headers.authorization.replace('Bearer ', '')
        const payload = jwt.verify(token, secret)
        const userToVerify = await User.findById(payload.sub)
        console.log(payload, userToVerify)
        if (!userToVerify) {
            throw new Error('missing header')
        }
        req.currentUser = userToVerify
        next()
    } catch (err) {
        console.log(err)
        return res.status(401).json({ message: 'Unauthorized' })
    }
}