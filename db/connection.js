const mongoose=require('mongoose')
const connectionString=process.env.connectionString

mongoose.connect(connectionString).then(()=>{
    console.log("MongoDB Atlas successfully connected to superman server");
    
}).catch((err)=>{
    console.log("MongoDB connection failed!!!",err);
    
})