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

export const followProfile = async (req, res) => {
    try {
        const { profileId } = req.params
        const me = req.currentUser
        const profileToFollow = await User.findById(profileId)
        console.log(profileToFollow.followers)
        if (profileToFollow.followers.includes(me._id)) {
            throw new Error('You already follow this person')
        }
        me.following.push(profileToFollow)
        profileToFollow.followers.push(me)
        profileToFollow.save({ validateModifiedOnly: true })
        me.save({ validateModifiedOnly: true })
        return res.status(200).json(me)
    } catch (err) {
        console.log(err)
        return res.status(404).json({ message: 'all my guys are ballas' })
    }
}
