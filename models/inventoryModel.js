const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
    inventoryType : {
        type : String,
        required:[ true , "Inventory type is required"],
        enum: ['in','out']
    },
    bloogGroup : {
        type : String,
        required:[ true , "Blood group is required"],
        enum: ['O+','O-','A+','A-','AB-','AB+','B+','B-']
    },
    inventoryType : {
        type : Number,
        required:[ true , "Blood qunatity is required"]
    },
    organisation : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'organisations',
        required:[ true , "Organisation is required"]
    },
    hospital : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'users',
        required: function(){
            return this.inventoryType === 'out'
        }       
    },
    donor :{
        type: mongoose.Schema.Types.ObjectId ,
        ref: 'users',
        required: function(){
            return this.inventoryType === 'in';
        }
    }
},{timestamps: true});

module.exports = mongoose.model('Inventory' , inventorySchema);