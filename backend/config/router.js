import express from "express"
import { addComment, addPost, addTrip, deleteComment, deletePost, deleteTrip, getAllPosts, getAllTrips, getOnePost, getOneTrip, updatePost, updateTrip } from "../controllers/posts.js"
import { registerUser, loginUser } from "../controllers/auth.js"
import { followProfile, getUserProfile, unfollowProfile, updateUserProfile } from "../controllers/user.js"
import { secureRoute } from "./secureRoute.js"

const router = express.Router()

router.route('/posts')
    .get(getAllPosts)
    .post(secureRoute, addPost)

router.route('/posts/:id')
    .get(getOnePost)
    .put(secureRoute, updatePost)
    .delete(secureRoute, deletePost)

router.route('/posts/:id/comments')
    .post(secureRoute, addComment)

router.route('/posts/:id/comments/:commentId')
    .delete(secureRoute, deleteComment)

router.route('/register')
    .post(registerUser)

router.route('/login')
    .post(loginUser)

router.route('/profile')
    .get(secureRoute, getUserProfile)
    .put(secureRoute, updateUserProfile)

router.route('/profile/:profileId/')
    .post(secureRoute, followProfile)
    .put(secureRoute, unfollowProfile)

router.route('/trips')
    .post(secureRoute, addTrip)
    .get(getAllTrips)

router.route('/trips/:id')
    .get(getOneTrip)
    .put(secureRoute, updateTrip)
    .delete(secureRoute, deleteTrip)

export default router