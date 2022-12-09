const mongoose = require("mongoose");
const Schema= mongoose.Schema;
const QuerySchema=new Schema({

    email:{
        type:String,
        required: true
    },
    name:{
        type:String,
        required: true
    },
    phone:{
        type:String,
        required: true
    },
    query:{
        type:String,
        required: true
    }
},{timestamps:true});

const Query= mongoose.model('Query',QuerySchema);
module.exports=Query;
