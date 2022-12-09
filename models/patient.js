const mongoose = require("mongoose");
const Schema= mongoose.Schema;
const PatientSchema=new Schema({
    email:{
        type:String,
        required: true
    },
    password:{
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
    dob:{
        type:String,
        required: true
    },
    adhar:{
        type:String,
        required: true
    },
    gender:{
        type:String,
        required: true
    },
    allergies:{
        type:String,
        required: true
    },
    medicalhistory:{
        type:String,
        required: true
    }
},{timestamps:true});

const Patient= mongoose.model('Patient',PatientSchema);
module.exports=Patient;
