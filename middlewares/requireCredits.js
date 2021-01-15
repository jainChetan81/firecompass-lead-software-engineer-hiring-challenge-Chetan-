module.exports = (req, res, next) => {
    console.log("require credits");
    if (req.user.credits < 1) {
        console.log("not enouugh credits");
        return res.status(403).send({ error: "Not enough credits!" });
    }

    next();
};
