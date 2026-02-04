import exp from 'express'
import { UserModel } from '../models/usermodel.js'
import jwt from 'jsonwebtoken'
import { hash,compare} from 'bcrypt'
import cookieParser from 'cookie-parser'
import { VerifiedToken } from '../MiddleWare/VerifiedToken.js'
//export userapp router it is used to create modular mountable route handlers for user related apis
export const userApp=exp.Router()
//-----------------------------------------------------------------
//-----------------------USER API ROUTES-----------------------
//-----------------------------------------------------------------
userApp.get('/users',async(req,res)=>{
   let usersList = await UserModel.find()//and it can retrive the specific fields
   res.status(200).json({message:"users",payload:usersList})

}
)
//----------------------------------------------------------------
//POST request to create new user
//It is for adding new user to the database and if the condition is met, it saves the user and returns a success response.
userApp.post('/users',async(req,res)=>{
   let newUser=req.body
   //console.log(newUser)
   let hashedPassword=await hash(req.body.password,12)
   //replace plane password to hashed password
   newUser.password=hashedPassword

  let newUserDoc= new UserModel(newUser)
  await newUserDoc.save()// saving new user document to the database
  res.status(201).json(newUserDoc)
}
)
//---------------------------------------------------------------
//POST request for user authentication
//user authentication route
userApp.post('/auth',async(req,res)=>
{
let userCred=req.body;
let  userOfDB=await UserModel.findOne({username:userCred.username})
if (userOfDB===null){
return res.status(404).json({message:"invalid username"})
}
let status=await compare(userCred.password,userOfDB.password)
if(status===false)
{
   return res.status(404).json({message:"invalid password"})
}
let signedToken=jwt.sign({username:userCred.username},"secret",{expiresIn:'10d'})
//save token in http only
res.cookie('token',signedToken,{httpOnly:true ,secure:false,sameSite:"lax"})
//sameSite has 3
//none -has no restrict
//strict -more restrict
//lax-medium restrit
res.status(200).json({message:"Login success"})

})
//---------------------------------------------------------------
//GET request to get user by id
//It retrieves a user by its ID from the database and returns it in the response.

userApp.get('/users/:id',async(req,res)=>{
   let objId=req.params.id;
   let userobj=await UserModel.findById(objId)
 res.status(200).json({message:"user",payload:userobj})

})
//---------------------------------------------------------------
//PUT request to modify user by id
//it updates an existing user's details in the database based on the provided ID and new data.
userApp.put("/users/:id",async(req,res)=>
{
   let objId=req.params.id
   let modifiedUser=req.body
   let latestUser=await UserModel.findByIdAndUpdate(objId,{$set:{...modifiedUser}},{new:true,runValidators:true});
   //here the runvalidators:true is used to run the validators defined in the schema while updating the document
    res.status(200).json({message:"modified",payload:latestUser})
    
})
//---------------------------------------------------------------
//DELETE request to delete user by id
//it deletes a user from the database based on the provided ID.

userApp.delete("/users/:id",async(req,res)=>{
   let objId=req.params.id;
   let deleteUser=await UserModel.findByIdAndDelete(objId)
   res.status(200).json({message:"deleted successfully",payload:deleteUser})

})
//-----------------------------------------------
//test route to verify token middleware
userApp.get('/test',VerifiedToken,(req,res)=>
{
   res.json({message:"test route"})

})
