const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema ({
    user: {
        type: String,
        lowercase: true,
        required: true
    },
    eventName: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    location:{
        type: String
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: Number
    },

});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;