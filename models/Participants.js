const mongoose = require("mongoose");
const { Schema } = mongoose;

const ParticipantsSchema = new Schema({
    name: String,
    winner: { type: Boolean, default: false },
});

module.exports = ParticipantsSchema;
