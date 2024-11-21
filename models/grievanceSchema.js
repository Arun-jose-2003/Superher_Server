const mongoose=require('mongoose')
function getCurrentFormattedDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}
const grievanceSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    urgency:{
        type:String,
        required:true
    },
    status:{
       
        type: String,
        enum: ['Pending','Resolved'],  
        default: 'Pending' 
    },
    date:{
        type:String,
        default: getCurrentFormattedDate
       
    },

})

const grievances=mongoose.model('grievances',grievanceSchema)
module.exports=grievances