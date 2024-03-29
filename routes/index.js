var express = require("express"),
	router = express.Router(),
	passport = require("passport"),
	User =require("../models/user");


router.get("/", function(req, res){
	res.render("landing");
})
router.get("/register", function(req, res){
	res.render("authenticate/register")
})
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("authenticate/register")
		}
		passport.authenticate("local")(req, res, function(){
			console.log("A new user "+ req.body.username +" is successfuly registered")
			req.flash("success", "You successfuly registered as:" + req.body.username);
			res.redirect("/campgrounds");
		})
	})
})


router.get("/login", function(req, res){
	res.render("authenticate/login")
})
router.post("/login", passport.authenticate("local",
	{
	successRedirect: "/campgrounds",
	successFlash: 'Welcome!',
	failureRedirect: "/login",
	failureFlashFlash: 'Somethong went wrong!',
	}), function(req, res){
	// console.log("The user "+ req.body.username +" is successfuly loged in")
})

router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged you out");
	res.redirect("/campgrounds");
})

module.exports = router;