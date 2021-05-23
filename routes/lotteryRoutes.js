const mongoose = require("mongoose"),
    requireLogin = require("../middlewares/requireLogin"),
    requireCredits = require("../middlewares/requireCredits");
//Load all your models
require("../models/Lottery");

//Now, this call won't fail because Survey has been added as a schema.
const Lottery = mongoose.model("Lottery");

module.exports = (app) => {
    app.get("/api/lotteries", requireLogin, async (req, res) => {
        const lotteries = await Lottery.find({ _user: req.user.id });
        res.send(lotteries);
    });

    app.post("/api/lotteries", requireLogin, async (req, res) => {
        const { lotteries } = req.body;
        const { title, body, participants, entry_fee } = lotteries;
        const lottery = new Lottery({
            title,
            Participants_Number: participants,
            Entry_Fee: entry_fee,
            body,
            // participients: recipients
            //     .split(",")
            //     .map((email) => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now(),
        });
        try {
            await lottery.save();
            // req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);
        } catch (err) {
            console.log("err", err);
            res.status(422).send(err);
        }
    });
};
