var express = require("express"),
	router = express.Router({mergeParams: true}),
	Campground = require("../models/camp"),
	Comment = require("../models/comment"),
	middleware = require("../middleware");

// Index
router.get("/new", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			res.render("comments/new", {campground:foundCampground});
		}	
	})
})

// Create comment
router.post("/", middleware.isLoggedIn, function(req, res){
	var text = req.body.comment.text;
	var author = req.body.comment.author;
	var newComment = {text: text, author:author}
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		}else{
			Comment.create(newComment, function(err, comment){
				if(err){
					console.log(err)
				} else{
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					campground.comments.push(comment);
					campground.save()
					console.log("Created new comment");
					req.flash("success", "Comment was added");
					res.redirect("/campgrounds/"+req.params.id)
					}
				}
			)
		}	
	})
})

// Edit existing comment
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			console.log(err);
		}else{
			res.render("comments/edit", {comment: foundComment, campground_id: req.params.id})
		}
	})
})

// Update existing comment
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err){
		if(err){
			console.log(err);
		}else{
			req.flash("success", "Comment was updated");
			res.redirect("/campgrounds/"+req.params.id)				
		}
	})
})

// Delete comment
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			console.log("We have an error: " + err.message)
		}else{
			req.flash("success", "Comment was deleted");
			res.redirect("/campgrounds/"+req.params.id);
		}
	})
})

module.exports = router;