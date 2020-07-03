// ==============
// AUTH ROUTES
// ==============

var express     = require("express");
var router      = express.Router();
var passport    = require("passport");
var User        = require("../models/user");

//INDEX - show all snaps
router.get("/", function(req, res){
    res.render("landing");
});

// show register form
router.get("/register", function(req, res){
    res.render("register");
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Naturely " + user.username + ".");
            res.redirect("/snaps");
        });
    });
});

// show login form
router.get("/login", function(req, res){
    res.render("login");    
});

//handling logic logiln
/*router.post("/login", passport.authenticate("local", {
    successRedirect: "/snaps",
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: ("Successfully logged in")
}), function(req, res){
});*/ 
//In above method we cannot access username while logging in
//so we will not be able to display dynamic flash messages

//handling login logic for dynamic flash messages
router.post("/login", function (req, res, next) {
    passport.authenticate("local",
    {
        successRedirect: "/snaps",
        failureRedirect: "/login",
        failureFlash: true,
        successFlash: "Successfully logged in as " + req.body.username
    })(req, res);
});

router.get("/contact", function(req, res){
    res.render("contact");
});

// logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Successfully logged out.");
    res.redirect("/snaps");
});

module.exports = router;