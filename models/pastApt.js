const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Past = new Schema(
    {
        idd: {
            type: String,
            required: true
        },
        idp: {
            type: String,
            required: true
        },
        slot: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        status:{
            type: Boolean,
            require: true
        }

    },
    { timestamps: true }
);

const past = mongoose.model("past", Past);
module.exports = past;
