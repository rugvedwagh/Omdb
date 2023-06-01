const mongoose=require("mongoose")
// const URL  = "mongodb://localhost:27017/logsig"
const URL  = "mongodb+srv://rugved:1234@clusterx.mc03un9.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(URL)
.then(()=>{
   
    console.log("Successfully connected to the MongoDB!")
})
.catch((e)=>{
    console.log('Connection failed!');
})

const logInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const LogInCollection=new mongoose.model('LogInCollection',logInSchema)

module.exports=LogInCollection