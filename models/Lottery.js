const mongoose = require("mongoose");
const { Schema } = mongoose;
const ParticipantsSchema = require("./Participants");

const LotterySchema = new Schema({
    title: String,
    body: String,
    participants: [ParticipantsSchema],
    Participants_Number: Number,
    Entry_Fee: Number,
    _user: { type: Schema.Types.ObjectId, ref: "User" },
    dateSent: Date,
});

mongoose.model("Lottery", LotterySchema);
