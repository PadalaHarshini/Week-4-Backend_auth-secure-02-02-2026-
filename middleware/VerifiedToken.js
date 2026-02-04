//it is middleware to verify token from cookies
//if the token is valid then it allows to access the route otherwise it sends error response

import jwt from 'jsonwebtoken'
export function VerifiedToken(req,res,next){
    //get token from the req
  let signedToken=  (req.cookies.token)//token:""
  if(!signedToken){
   return  res.status(401).json({message:"please login first"})
  }
  //verify token
 let decodedToken=jwt.verify(signedToken,"secret")
 console.log("decode token",decodedToken)
next()
  
}
