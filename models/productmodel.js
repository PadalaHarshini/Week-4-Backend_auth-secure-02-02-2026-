//models/productmodel.js
import {Schema,model} from 'mongoose'//importing schema and model from mongoose
const productSchema=new Schema({//defining schema for product
    pid:{ 
        type:Number,
        required:[true,"id required"],
    
    },
    productname:{
        type:String,
        required:[true,"productname is required"]

    },
    price:{
        type:Number,
        required:[true,"price is required"],
       
    },
},{ strict:"throw",//to throw error if any field other than defined in schema is added
    timestamps:true//to add createdAt and updatedAt fields automatically
}
);
export const ProductModel=model("product",productSchema)//exporting product model
