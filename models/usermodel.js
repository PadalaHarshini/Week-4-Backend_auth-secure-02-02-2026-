//create user mosel of the schema
import {Schema,model} from 'mongoose'//importing schema and model from mongoose
const userSchema=new Schema({//defining schema for user
    username:{ 
        type:String,
        required:[true,"username required"],
        minLenth:[4,"min length should be 4"],
        maxlength:[6,"max lenth is exceded"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    age:{
        type:Number,
        required:[true,"age is required"],
        min:[18,"age should be above 18"],
        max:[25,"age should be be below 25"]
    },
},{ strict:"throw",
    timestamps:true
}
);
export const UserModel=model("user",userSchema)//exporting user model


