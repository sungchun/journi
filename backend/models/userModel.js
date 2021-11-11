import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true, maxlength: 25, minlength: 3 },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    followers: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    // trips: [{ type: mongoose.Schema.Objectid, ref: 'Trip' }]
})

userSchema.virtual('postSet', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.virtual('tripSet', {
    ref: 'Trip',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.set('toJSON', {
    virtuals: true,
    transform(_doc, json) {
        delete json.password
        return json
    }
})

userSchema.virtual('passwordConfirmation').set(function (passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
})

userSchema.pre('validate', function (next) {
    if (this.isModified('password') && this.password !== this._passwordConfirmation) {
        this.invalidate('passwordConfirmation', 'Passwords do not match')
    }
    next()
})

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    }
    next()
})

userSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

userSchema.plugin(uniqueValidator)

export default mongoose.model('User', userSchema)
