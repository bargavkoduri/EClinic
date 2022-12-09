const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DupDocSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        dob: {
            type: String,
            required: true,
        },
        adhar: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        qualification: {
            type: String,
            required: true,
        },
        department: {
            type: String,
            required: true,
        },

        experience: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const DupDoctor = mongoose.model("DupDoctor", DupDocSchema);
module.exports = DupDoctor;
