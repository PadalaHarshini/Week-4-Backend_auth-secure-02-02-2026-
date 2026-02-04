import exp from 'express'
import { ProductModel } from '../models/productmodel.js'  //importing usermodel
export const productApp=exp.Router()//creating router for user api

//-----------------------------------------------------------------
//-----------------------PRODUCT API ROUTES-----------------------
//-----------------------------------------------------------------
productApp.get('/products',async(req,res)=>{
   let productsList = await ProductModel.find({})//fetching all products from db
   res.status(200).json({message:"products",payload:productsList})

}
)
//----------------------------------------------------------------
//POST request to create new product
//It is for adding new product to the database and if the condition is met, it saves the product and returns a success response.
productApp.post('/products',async(req,res)=>{
   let newProduct=req.body
   console.log(newProduct)
  let newProductDoc= new ProductModel(newProduct)
  await newProductDoc.save()
  res.status(201).json(newProductDoc)
}
)
//---------------------------------------------------------------
//GET request to get product by id
//It retrieves a product by its ID from the database and returns it in the response.
productApp.get('/products/:id',async(req,res)=>
{
let productobj =req.params.id
 let productid=await ProductModel.findById(productobj)
 res.status(200).json({message:"product",payload:productid})

})
//---------------------------------------------------------------
//PUT request to modify product by id
//it updates an existing product's details in the database based on the provided ID and new data.
productApp.put('/products/:id',async(req,res)=>
{
    let productobj=req.params.id
    let modifiedProduct=req.body
       let latestProduct=await ProductModel.findByIdAndUpdate(productobj,{$set:{...modifiedProduct}},{new:true});
       //new true to return the modified document and $set to set the modified fields 
        res.status(200).json({message:"modified",payload:latestProduct})
})

