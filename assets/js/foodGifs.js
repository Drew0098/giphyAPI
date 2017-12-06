$( document ).ready(function() {


	var foods = ["pizza", "spaghetti", "lasagna", "tacos", "burgers", "ramen", "chili", "mac n cheese", "chicken", "steak", 
	"ribs", "potatoes"];

	showButtons();
	createButton();
	

	$(document).on("click", ".food", function(){
		showGifs($(this));
	})
	$(document).on("click", ".image", function(){
	    var state = $(this).attr('data-state');
	    if (state == 'still'){
	        $(this).attr('src', $(this).data('animate'));
	        $(this).attr('data-state', 'animate');
	    } else {
	        $(this).attr('src', $(this).data('still'));
	        $(this).attr('data-state', 'still');
	    }
	})

	


	function showButtons() {
		$("#gifButtons").empty();
		for (var i = 0; i < foods.length; i++){
			var newButton = $("<button>");
			newButton.addClass("btn btn-primary");
			newButton.addClass("food");
			newButton.attr("data-name", foods[i]);
			newButton.text(foods[i]);
			$("#gifButtons").append(newButton);
		}
	}
	function createButton() {
		$("#addFood").on("click", function() {
			var food = $("#addButtonForm").val().trim();
			if (food) {
				foods.push(food);
				showButtons();
			}
			$("#addButtonForm").val("");
			return false;
		})
	}
	function showGifs(x) {
		var food = x.attr("data-name");
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=dc6zaTOxFJmzC&limit=10";
		$.ajax({
			url: queryURL,
			method: "GET"
		})
		.done(function(response) {
			$("#showGifs").empty();
			var results = response.data;
			if (results == "") {
				alert("Sorry, there are no GIFs for the button you pressed.")
			}
			for (var i=0; i<results.length; i++){
				var gifCard = $("<div>");
				gifCard.addClass("card");
				gifCard.addClass("gifCard");
				var rating = $("<p>").text("Rating: " + results[i].rating);
				rating.addClass("rating");
				gifCard.prepend(rating);
				var image = $("<img>");
				image.attr("src", results[i].images.fixed_height_small_still.url);
            	image.attr("data-still",results[i].images.fixed_height_small_still.url);
            	image.attr("data-animate",results[i].images.fixed_height_small.url);
            	image.attr("data-state", "still");
            	image.addClass("image");
            	gifCard.append(image);
            	$("#showGifs").append(gifCard);
			}
		})
	}
});