var mongoose = require("mongoose"),
	Campground = require("./models/camp"),
	Comment = require("./models/comment")

var data = [
	{
		name: "Kieve Summer Camp",
		image: "https://media-cdn.tripadvisor.com/media/photo-s/0f/cb/90/dd/family-friendly-camping.jpg",
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." 
	},
	{
		name: "ActionQuest",
		image: "https://d2umhuunwbec1r.cloudfront.net/gallery/0004/0025/5E29973C10EC438FACE45AB950337832/medium.jpg",
		description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
	},
	{
		name: "Raquette Lake Camp",
		image: "https://i0.wp.com/media.globalnews.ca/videostatic/908/231/Tips_for_beginners_buying_camping_gear-5d3b5d02b4b6ed0001192e9f_1_Jul_26_2019_20_25_37_poster.jpg?w=1040&quality=70&strip=all",
		description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc." 
	}
]

function seedDB(){
	Campground.deleteMany({},function(err){
		if(err){
			console.log("We have an error: "+err.message)
		}else{
			data.forEach(function(seed){
				Campground.create(seed, function(err,campground){
					if(err){
						console.log(err);
					}else{
						console.log("Created new campgrounds")
						Comment.create(
							{
								text: "Oh my...it was an exeustend day.I was searching for you to much time",
								author: "Anton" 
							}, function(err, comment){
								if(err){
									console.log(err)
								} else{
									campground.comments.push(comment);
									campground.save()
									console.log("Created new comment");
								}
							}
						)
					}
				})
			})
		}	
	})	
}

module.exports = seedDB;





















