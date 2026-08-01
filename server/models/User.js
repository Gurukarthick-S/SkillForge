import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,'Name is required'],
        trim:true
    },
    email:{
        type:String,
        require:[true,'Email is required'],
        unique:true,
        lowercase:true,
        trim:true,
        match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email']
    },
    password:{
        type:String,
        require:[true, 'passowrd is required'],
    }
},
{
    timestamps:true
}
);

const user = mongoose.model('user',userSchema);

export default user;