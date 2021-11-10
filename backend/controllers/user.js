import User from '../models/userModel.js'

export const getUserProfile = async (req, res) => {
    try {
        const user = await (await User.findById(req.currentUser._id)).populate('postSet')
        if (!user) {
            throw new Error()
        }
        res.status(200).json(user)
    } catch (err) {
        console.log(err)
        res.status(404).json({ message: 'not found' })
    }
}