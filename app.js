var express 		= require("express"),
	app 			= express(),
	bodyParser 		= require("body-parser"),
	mongoose 		= require("mongoose"),
	passport 		= require("passport"),
	LocalStrategy	= require("passport-local"),
	methodOverride  = require("method-override"),
	flash			= require("connect-flash"),
	User 			= require("./models/user"),
	Campground 		= require("./models/camp"),
	Comment 		= require("./models/comment"),
	seedDB 			= require("./seeds");

var campgroundRoutes 	= require("./routes/campgrounds"),
	commentRoutes 		= require("./routes/comments"),
	indexRoutes 		= require("./routes/index");

// seedDB();
mongoose.connect(process.env.DATABASERL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
// mongoose.connect('mongodb+srv://dbUser:anton1995@cluster0-fnigp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
	.then(() => console.log('DB Connected!'))
	.catch(err => {
	console.log("DB Connection Error:" +err);
	});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"))
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());

// ==================PASPORT CONFIGURATION============================

app.use(require("express-session")({
	secret: "I am 25 years old",
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser 	= req.user;
	res.locals.error 		= req.flash("error");
	res.locals.success 		= req.flash("success");
	next();
})

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/",indexRoutes);

// ===================================================================

app.listen(process.env.PORT||3000, process.env.IP, function(){
	console.log("The YelpCamp Server has started!")
})