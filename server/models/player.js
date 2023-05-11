const mongoose=require('mongoose');

const DataSchema=new mongoose.Schema({
    uniqueId:{
        type: String,
        required: true,
        unique: true,
    },
    Name:{
        type:String,
        required:true,
    },
    Age:{
        type:Number,
        required:true,
    },
    Team:{
        type:String,
        required:true,
    }
});

const Player=mongoose.model("player",DataSchema)
module.exports=Player