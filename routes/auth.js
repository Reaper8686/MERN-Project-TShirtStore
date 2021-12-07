const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const {signup,signin, signout,isSignedIn} = require("../controllers/auth")


router.post("/signup",[
    check("name","name should be more than 3 char").isLength({min: 3}),
    check("email","email is invalid").isEmail(),
    check("password","password should more thsn 3 char").isLength({min: 3})
], signup);

router.post("/signin",[
    check("email","email is invalid").isEmail(),
    check("password","password is not correct").isLength({min: 3 })
],signin);


router.get("/signout", signout);

router.get("/tester", isSignedIn, (req, res) => {
    res.send(req.auth);
})


module.exports = router;