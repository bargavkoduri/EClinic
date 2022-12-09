const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Msg = new Schema(
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
        }


    },
    { timestamps: true }
);
Msg.index({createdAt: 1},{expireAfterSeconds: 43200});
const msg = mongoose.model("msg", Msg);
module.exports = msg;
