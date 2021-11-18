import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"

const commentSchema = new mongoose.Schema({
    text: { type: String, required: true, maxlength: 250 },
    owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true
})

const postSchema = new mongoose.Schema({
    title: { type: String, required: true, maxlength: 100 },
    description: { type: String, required: true, maxlength: 500 },
    images: [{ type: String }],
    rating: { type: Number, required: true, min: 1, max: 5 },
    location: { type: String, required: true },
    owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    comments: [commentSchema],
    // trip: { type: String, required: false }
}, {
    timestamps: true
})

postSchema.plugin(uniqueValidator)

export default mongoose.model('Post', postSchema)