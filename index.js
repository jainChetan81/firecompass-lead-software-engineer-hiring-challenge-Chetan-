const express = require("express"),
    PORT = process.env.PORT || 5000,
    cookieSession = require("cookie-session"),
    passport = require("passport"),
    mongoose = require("mongoose"),
    keys = require("./config/keys"),
    app = express(),
    authRoutes = require("./routes/authRoutes"),
    billingRoutes = require("./routes/billingRoutes"),
    bodyParser = require("body-parser"),
    lotteryRoutes = require("./routes/lotteryRoutes"),
    participatingRoutes = require("./routes/participatingRoutes");

require("./models/User");
require("./models/Lottery");
require("./services/passport");
mongoose
    .connect(keys.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch((err) => console.log("err: ", err));
app.use(bodyParser.json());
app.use(
    cookieSession({ maxAge: 30 * 24 * 60 * 60 * 1000, keys: [keys.cookie] })
);
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
billingRoutes(app); //or  authRouts = require("./routes/authRoutes")(app)
participatingRoutes(app);
lotteryRoutes(app);

if (process.env.NODE_ENV === "production") {
    //express will serve up production assest
    //like  our main.js or main.css files
    app.use(express.static("client/build"));

    //express will serve up index.js file if it doesn't recognizes the route
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log("app is listening on port 5000");
});
