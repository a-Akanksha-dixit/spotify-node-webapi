import mongoose from 'mongoose'
const { Schema } = mongoose; 

const userSchema = new Schema({
    display_name : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String
    },
    href : {
        type : String
    },
    id : {
        type : String
    },
    images : {
        type : Array
    },
    type : {
        type : String,
        default : 'user'
    },
    followers : {
        type : Object
    },
    country : {
        type : String
    },
    product : {
        type : String
    },
    explicit_content : {
        type : Object
    }
}, {timestamps:true})

userSchema.statics.findByEmail = function(email) {
    return this.findOne({email:email})
}

userSchema.statics.findByUserId = function(user_id) {
    return this.findOne({id : user_id})
}

userSchema.statics.addNewUser = function(userDetails) {
    return new this(userDetails).save()
}

export default mongoose.model('users', userSchema)