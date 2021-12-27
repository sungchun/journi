import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"

const tripSchema = new mongoose.Schema({
    title: { type: String, required: true },
    events: [{ type: mongoose.Schema.ObjectId, ref: 'Post' }],
    location: { type: String, required: true, },
    owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
})

tripSchema.plugin(uniqueValidator)

export default mongoose.model('Trip', tripSchema)