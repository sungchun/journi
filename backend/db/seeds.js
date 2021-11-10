import mongoose from 'mongoose'
import { dbURI } from '../config/environment.js'
import Post from '../models/postModel.js'
import User from '../models/userModel.js'
import postData from './data/post.js'
import userData from './data/user.js'

async function seedDatabase() {
    try {
        await mongoose.connect(dbURI)
        console.log('connected to database')

        await mongoose.connection.db.dropDatabase()
        console.log('database cleared')

        const users = await User.create(userData)
        console.log(`${users.length} users added`)

        const postWithOwners = postData.map((post) => {
            post.owner = users[0]._id
            return post
        })

        const postAdded = await Post.create(postWithOwners)
        console.log(`${postAdded.length} post added`)

        await mongoose.connection.close()
        console.log('connection closed.')

    } catch (err) {
        console.log(err)
        await mongoose.connection.close()
        console.log('error, database connection closed')
    }
}

seedDatabase()