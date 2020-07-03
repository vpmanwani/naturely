// ========================
// ALL SNAP ROUTES
// ========================

var express     = require("express");
var router      = express.Router();
var Snap  = require("../models/snap");
var middleware  = require("../middleware"); //if you require a directory it will automatically require the contents of index.js

//show - all snaps
router.get("/", function(req, res){
    req.user
    //get all snaps from db
    Snap.find({}, function(err, allSnaps){
        if(err){
            console.log(err);
        }else{
            res.render("snaps/index", {snaps: allSnaps, currentUser: req.user});
        }
    });
});

//CREATE - add new snap to database
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form and add to snaps array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newSnap = {name: name, image: image, description: desc, author: author};
    //create new snap and save to DB
    Snap.create(newSnap, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            //redirect back to snaps page
            res.redirect("/snaps");
        }
    });
});

//new - show form to create new snap
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("snaps/new");
});

//SHOW - shows more info about one snap
router.get("/:id", function(req, res){
    //find snap with provided ID
    Snap.findById(req.params.id).populate("comments").exec(function(err, foundSnap){
        if(err){
            console.log(err);
        }else{
            //console.log(foundSnap);
            //render show template with that snap
            if(!foundSnap){
                req.flash("error", "The snap does not exist.");
                res.redirect("/snaps");
            }else{
                res.render("snaps/show", {snap: foundSnap});
            }
        }
    });
});

//edit snap route
router.get("/:id/edit", middleware.checkSnapOwnership, function(req, res){
    //is user logged in
    Snap.findById(req.params.id, function(err, foundSnap){
        res.render("snaps/edit.ejs", {snap: foundSnap});
    });
});

//update snap route
router.put("/:id", middleware.checkSnapOwnership, function(req, res){
    //find and update the correct snap
    Snap.findByIdAndUpdate(req.params.id, req.body.snap, function(err, updatedSnap){
        if(err){
            res.redirect("/");
        }else{
            //redirect somewhere
            res.redirect("/snaps/" + req.params.id);
        }
    });
});

//destroy snap
router.delete("/:id", middleware.checkSnapOwnership, function(req, res){
    Snap.findByIdAndDelete(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect("/snaps");
        }else{
            res.redirect("/snaps");
        }
    });
});

module.exports = router;