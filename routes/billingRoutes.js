const keys = require("../config/keys"),
    stripe = require("stripe")(keys.stripeSecretKey),
    requireLogin = require("../middlewares/requireLogin");
module.exports = (app) => {
    app.post("/api/stripe", requireLogin, (req, res) => {
        //no parantheses so that function is only called internal not everytime we load
        console.log("api/stripe :", req.user);
        stripe.charges
            .create({
                amount: 500,
                currency: "INR",
                description: "₹5 for 50 email credits",
                source: req.body.id,
            })
            .then((charge) => {
                req.user.credits += 50; //add credits
                req.user.save().then((user) => {
                    res.send(user);
                });
            })
            .catch((err) => console.log(err));
    });
};
