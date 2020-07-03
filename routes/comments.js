// ==================
// Comments Routes
// ==================

var express     = require("express");
var router      = express.Router({mergeParams: true});
var Snap  = require("../models/snap");
var Comment     = require("../models/comment");
var middleware  = require("../middleware");

router.get("/new", middleware.isLoggedIn, function(req, res){
    //find snap by id
    Snap.findById(req.params.id, function(err, snap){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {snap: snap});
        }
    });
});

//Comments create
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup snap using ID
    Snap.findById(req.params.id, function(err, snap){
        if(err){
            console.log(err);
            res.redirect("/snaps");
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong.");
                    console.log(err);
                }else{
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    snap.comments.push(comment);
                    snap.save();
                    req.flash("success", "Comment added successfully.");
                    res.redirect('/snaps/' + snap._id);
                }
            });
        }
    });

    //create new comment
    //connect new comment to snap
    //redirect back to the snap show page
});

//comments edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit.ejs", {snap_id: req.params.id, comment: foundComment});
        }
    });
});

//comments update route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //console.log(req.body.comment);
    //console.log("\ncomment body : " + req.body.comment.text);
    //in findByIdAndUpdate the second argument must be an object not just a variable
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            res.redirect("/snaps/" + req.params.id);
        }
    });
});

//comment destroy route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndDelete(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success", "Comment deleted successfully.");
            res.redirect("/snaps/" + req.params.id);
        }
    });
});

module.exports = router;