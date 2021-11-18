// this is the file for controller functions related to posts
import Post from '../models/postModel.js'
import Trip from '../models/tripModel.js'

export const getAllPosts = async (_req, res) => {
    const posts = await Post.find()
    return res.status(200).json(posts)
}

export const getOnePost = async (req, res) => {
    try {
        const { id } = req.params
        const postToGet = await Post.findById(id)
        return res.status(200).json(postToGet)
    } catch (err) {
        return res.status(404).json({ message: 'post not found' })
    }
}

export const addPost = async (req, res) => {
    try {
        const newPost = { ...req.body, owner: req.currentUser._id }
        console.log('req.body',req.body)
        console.log('newPost', newPost)
        const addedPost = await Post.create(newPost)

        return res.status(201).json(addedPost)
    } catch (err) {
        return res.status(422).json(err)
    }
}

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params
        const postToUpdate = await Post.findById(id)
        if (!postToUpdate.owner.equals(req.currentUser.id)) {
            throw new Error('unauthorized')
        }
        await Post.findOneAndUpdate(id, req.body)
        return res.status(202).json(await Post.findById(id))
    } catch (err) {
        res.status(404).json({ message: ' post not found' })
    }
}

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params
        const postToDelete = await Post.findById(id)
        if (!postToDelete.owner.equals(req.currentUser._id)) {
            throw new Error('unauthorized')
        }
        await postToDelete.remove()
        return res.sendStatus(204)
    } catch (err) {
        return res.status(404).json({ message: 'post not found' })
    }
}

export const addTrip = async (req, res) => {
    try {
        const newTrip = await Trip.create({ ...req.body, user: req.currentUser })
        req.currentUser.trips.push(newTrip)
        await req.currentUser.save({ validateModifiedOnly: true })
        return res.status(200).json(newTrip)
    } catch (err) {
        console.log(err)
        return res.status(404).json({ message: 'something went wrong' })
    }
}

export const getAllTrips = async (_req, res) => {
    try {
        const trips = await Trip.find()
        return res.status(200).json(trips)
    } catch (err) {
        return res.status(404).json({ message: 'something went wrong' })
    }
}

export const updateTrip = async (req, res) => {
    try {
        const { id } = req.params
        const tripToUpdate = await Trip.findOneAndUpdate(id, req.body)
        if (!tripToUpdate) {
            throw new Error('trip not found')
        }
        return res.status(200).json(await Trip.findById(id))
    } catch (err) {
        return res.status(404).json({ message: 'something went wrong' })
    }
}

export const deleteTrip = async (req, res) => {
    try {
        const { id } = req.params
        const tripToDelete = await Trip.findById(id)
        console.log("trip to delete", tripToDelete)
        console.log("my id", req.currentUser._id)
        if (!tripToDelete.owner.equals(req.currentUser._id)) {
            throw new Error('unauthorized')
        }
        await Trip.findByIdAndDelete(id)
        return res.sendStatus(204)
    } catch (err) {
        console.log(err)
        return res.status(404).json({ message: 'something went wrong' })
    }
}

export const getOneTrip = async (req, res) => {
    try {
        const { id } = req.params
        const tripToGet = await Trip.findById(id)
        return res.status(200).json(tripToGet)
    } catch (err) {
        return res.status(404).json({ message: 'something went wrong' })
    }
}

export const addComment = async (req, res) => {
    try {
        const { id } = req.params
        const post = await Post.findById(id)
        if (!post) {
            throw new Error()
        }
        console.log('userid', req.currentUser.id)
        const newComment = { ...req.body, owner: req.currentUser.id }
        console.log('new comment', newComment)
        post.comments.push(newComment)
        await post.save({ validateModifiedOnly: true })
        res.status(200).json(post)
    } catch (err) {
        return res.status(404).json({ message: 'Post not found' })
    }
}

export const deleteComment = async (req, res) => {
    try {
        const { id, commentId } = req.params
        console.log('post id', id)
        console.log('comment id', commentId)
        const post = await Post.findById(id)
        if (!post) {
            throw new Error('Post not found')
        }
        const comment = post.comments.id(commentId)
        if (!comment) {
            throw new Error('Comment not found')
        }
        console.log('comment', comment)
        console.log('comment\s user', comment.owner)
        if (!comment.owner.equals(req.currentUser.id)) {
            throw new Error('unauthorized')
        }
        await comment.remove()
        await post.save({ validateModifiedOnly: true })
        return res.sendStatus(204)
    } catch (err) {
        console.log(err)
        return res.status(400).json({ message: 'something went wrong' })
    }
}