var mongoose = require("mongoose");
var Snap = require("./models/snap.js");
var Comment = require("./models/comment.js");
var data = [
    {
        name: "Clouds Rest", 
        image: "https://i.imgur.com/lmHsAqU.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },

    {
        name: "Road from Forest", 
        image: "https://i.imgur.com/bCJxqkE.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },

    {
        name: "Lake View", 
        image: "https://i.imgur.com/FeawV44.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },

    {
        name: "Forest House", 
        image: "https://i.imgur.com/EGgyVOq.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },

    {
        name: "Cloud Flare",
        image: "https://i.imgur.com/OMuGvCj.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
]

function seedDB(){
    //remove all snaps
    Snap.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed snaps");

        
        //add a few snaps
        data.forEach(function(seed){
            Snap.create(seed, function(err, snap){
                if(err){
                    console.log(err);
                }else{
                    console.log("created snap");
                    //create a comment
                    Comment.create({
                        text: "This place is great w/o internet",
                        author: "Homie"
                    }, function(err, comment){
                        if(err){
                            console.log(err)
                        }else{
                            snap.comments.push(comment);
                            snap.save();
                            console.log("added new comment");
                        }
                    });
                }
            });
        });
    });

    //add a few comments
}

module.exports = seedDB;