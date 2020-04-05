var express = require("express"),
	router = express.Router(),
	Campground = require("../models/camp"),
	middleware = require("../middleware");

// INDEX - Show all campgrounds
router.get("/", function(req, res){
	Campground.find({},function(err, campgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/index", {campgrounds:campgrounds})
		}
	})
})

// NEW - Show a form for creation new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new")
})

// CREATE - Make new campgrounds
router.post("/", middleware.isLoggedIn, function(req, res){
	var name = req.body.campName;
	var image = req.body.campImage;
	var prise = req.body.campPrise;
	var description = req.body.campDesc;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name: name, image: image, prise: prise, description: description, author:author};
	
	Campground.create(newCampground, function(err, campground){
	if(err){
		console.log("Huston,we have a problem!!");
		console.log(err);
	}else{
		console.log("Well done!!!We've create a new object:");
		console.log(campground);
	}
})
	req.flash("success", "Campground was added");
	res.redirect("/campgrounds");
	
	
})

// SHOW - Display more info about one campground
router.get("/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/show", {campground:foundCampground});
		}
	})
})

// EDIT - Change info of campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err,foundCampground){
			res.render("campgrounds/edit", {campground: foundCampground})
		})
	}
})

// UPDATE - Update edit campground
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err){
		if(err){
			console.log(err);
		}else{
			req.flash("success", "Campground was updateed");
			res.redirect("/campgrounds/"+req.params.id);
		}
	})
})
// DESTROY - Delete campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log("We have an error: " + err.message)
		}else{
			req.flash("success", "Campground was deleted");
			res.redirect("/campgrounds");
		}
	})
})

module.exports = router;