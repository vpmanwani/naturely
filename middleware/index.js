//========================
// ALL THE MIDDLEWARE
//========================

var Snap            = require("../models/snap"),
    Comment         = require("../models/comment"),
    middlewareObj   = {};

middlewareObj.checkSnapOwnership = 
    function(req, res, next){
        if(req.isAuthenticated()){
            Snap.findById(req.params.id, function(err, foundSnap){
                if(err){
                    req.flash("error", "Snap not found.");
                    res.redirect("back");
                }else{
                    if(foundSnap.author.id.equals(req.user._id)){ //does user own the campground?
                        next();
                    }else{//otherwise redirect
                        req.flash("error", "You don't have permission to do that.");
                        res.redirect("/snaps/" + req.params.id);
                    }
                }
            });
        }else{//if not, redirect
            req.flash("error", "You need to be logged in to do that.");
            res.redirect("/snaps/" + req.params.id);
        } 
    }

middlewareObj.checkCommentOwnership = 
    function(req, res, next){
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err){
                    req.flash("error", "You need to be logged in to do that.");
                    res.redirect("/snaps/" + req.params.id);
                }else{
                    Snap.findById(req.params.id, function(err, foundSnap){
                        if(err){ 
                            req.flash("error", "Snap not found.");
                            res.redirect("/snaps/" + req.params.id);
                        }else{
                            if(foundSnap.author.id.equals(req.user._id)){ //does user own the snap? Then he is authenticated to delete the comment.
                                next();
                            }else{
                                if(foundComment.author.id.equals(req.user._id)){ //does user own the comment?
                                    next();
                                }else{//otherwise redirect
                                    req.flash("error", "You don't have permission to do that.");
                                    res.redirect("/campgrounds/" + req.params.id);
                                }
                            }
                        }
                    });
                }
            });
        }else{//if not, redirect
            res.redirect("back");
        } 
    }

middlewareObj.isLoggedIn = 
    function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }

        req.flash("error", "You need to be logged in to do that.");

        res.redirect("/login");
    }

module.exports = middlewareObj;