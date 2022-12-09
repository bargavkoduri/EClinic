const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TScheduleSchema = new Schema(
    {
        id: {
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

const todaySchedule = mongoose.model("todaySchedule", TScheduleSchema);
module.exports = todaySchedule;
