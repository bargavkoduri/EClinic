const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AvailableSchema = new Schema(
    {
        idd: {
            type: String,
            required: true,
        },
        idp: {
            type: String,

        },
        slot: {
            type: String,
            required: true,
        },
        available:{
            type: Boolean,
            required: true,
        },
        date:{
            type:Date,
            required:true
        }

    },
    { timestamps: true }
);

const Available = mongoose.model("Available", AvailableSchema);
module.exports = Available;
