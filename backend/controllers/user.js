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

export const updateUserProfile = async (req, res) => {
    try {
        const userToUpdate = await User.findById(req.currentUser._id)
        if (!userToUpdate.equals(req.currentUser.id)) {
            throw new Error('unauthorized')
        }
        await User.findByIdAndUpdate(req.currentUser._id, req.body)
        return res.status(202).json(await User.findById(req.currentUser._id))
    } catch (err) {
        res.status(404).json({ message: ' user not found' })
    }
}

export const followProfile = async (req, res) => {
    try {
        const { profileId } = req.params
        const me = req.currentUser
        const profileToFollow = await User.findById(profileId)
        if (profileToFollow === me) {
            throw new Error('that\'s you dummy')
        }
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
        return res.status(404).json({ message: 'something went wrong' })
    }
}

export const unfollowProfile = async (req, res) => {
    try {
        const { profileId } = req.params
        const me = req.currentUser
        const profileToUnFollow = await User.findById(profileId)
        console.log('profile to unfollow', profileToUnFollow)
        console.log('their followers', profileToUnFollow.followers)
        if (profileToUnFollow === me) {
            throw new Error('that\'s you dummy')
        }
        if (!profileToUnFollow.followers.includes(me._id)) {
            throw new Error('you don\'t follow them')
        }
        console.log('das me', me)
        const myIndex = profileToUnFollow.followers.indexOf(me._id)
        const theirIndex = me.following.indexOf(profileToUnFollow._id)
        profileToUnFollow.followers.splice(myIndex, 1)
        me.following.splice(theirIndex, 1)
        me.save({ validateModifiedOnly: true })
        profileToUnFollow.save({ validateModifiedOnly: true })
        return res.status(200).json(me)
    } catch (err) {
        console.log(err)
        return res.status(404).json({ message: 'something went wrong' })
    }
}