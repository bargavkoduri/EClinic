const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ScheduleSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        slot: {
            type: String,
            required: true,
        }

    },
    { timestamps: true }
);

const Schedule = mongoose.model("Schedule", ScheduleSchema);
module.exports = Schedule;
