const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const passportLocalMongoose=require('passport-local-mongoose');


const schema=new Schema({
    email:{
        type:String, 
        required:true,
        unique:true
    },
    whatsappnumber:{
        type:Number,
        validate: {
            validator: function(v) {
                // Check if the value is a 10-digit number
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid 10-digit number for WhatsApp.`
        }
    }, 
    image: {    
        path:String,
        filename:String,
    },
    address:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
    },
    resetPasswordExpires: {
        type: Date,
    }
});
schema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",schema);