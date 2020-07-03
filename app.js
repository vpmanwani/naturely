var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    flash               = require("connect-flash"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    methodOverride      = require("method-override"),
    Snap                = require("./models/snap.js"),
    Comment             = require("./models/comment.js"),
    User                = require("./models/user"),
    seedDB              = require("./seeds.js");

//requiring routes
var commentRoutes       = require("./routes/comments"),
    snapRoutes          = require("./routes/snaps"),
    indexRoutes         = require("./routes/index");

var url = process.env.DATABASEURL || "mongodb://localhost/naturely"
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//seed the database
//seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "I host local 3000!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser  = req.user;
    res.locals.error        = req.flash("error");
    res.locals.success      = req.flash("success");
    next();
});


app.use(indexRoutes);
app.use("/snaps", snapRoutes);
app.use("/snaps/:id/comments", commentRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("Naturely server has started.");
});
