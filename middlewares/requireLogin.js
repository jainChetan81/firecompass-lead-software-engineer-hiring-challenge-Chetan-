module.exports = (req, res, next) => {
    console.log("require liogin ");
    if (!req.user) {
        console.log("have not logged in");
        res.status(401).send({ error: "You must log in!" });
    }
    next(); //if nothing wrong then continue to wherever you where
};
