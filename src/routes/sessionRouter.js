const express = require("express");
const router = express.Router();
const passport = require("passport");


router.post("/login", passport.authenticate("login", {failureRedirect: "/api/sessions/faillogin"}), async (req, res) => {
    console.log("entro aqui 1")
    if(!req.user) return res.status(400).send({status:"error"});
    console.log("entro aqui 2")
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email:req.user.email
    };

    req.session.login = true;

    res.redirect("/profile");

})

router.get("/faillogin", async (req, res) => {
    res.send({error: "Error en loguin"});
})


router.get("/logout", (req, res) => {
    if (req.session.login) {
        req.session.destroy();
    }
    res.redirect("/login");
})

module.exports = router;