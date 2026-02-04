import exp from 'express'
import { userApp } from './APIS/UserApi.js'//here we r importing userApp
import { connect }  from 'mongoose'//importing connect function from mongoose
import { productApp } from './APIS/ProductApi.js'//importing productApp
//add cookie-parser
import cookieParser from "cookie-parser";

const app = exp()//creating express app
const port = 4000//defining port number

async function connectDB()//async function to connect to db 
{
    try{
      await connect('mongodb://localhost:27017/anuragdb4')//connecting to mongodb database
          console.log("connected")
          app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
    }
    catch(err)//if error occurs during connection
    {
      console.log("err connection",err)
    }
    
}
app.use(exp.json())
//cookie parser it is used to parse cookies from incoming requests
app.use(cookieParser())
app.use('/user-api', userApp)//using userApp for routes starting with /user-api
app.use('/product-api',productApp)//using productApp for routes starting with /product-api

connectDB()//calling connectDB function to connect to db and start server




