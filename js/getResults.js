// Kyle Peterson
// Last.fm Top Artists Visualizer
// Duba

$(function() {
	// Change formatting of chosen option button and get artists
	$('.option').click(function() {
		$('.option').removeClass("selected");
		$(this).addClass("selected");
		$(".results").empty();
		getArtists($(".username").val());
	});
	// Get artists when user presses enter in the search box
	$('.username').keypress(function (e) {
  		if (e.which == 13) {
  			var user = $('.username').val();
  			getArtists(user);
    		return false;
  		}
	});
});

// Populates the page with the given users top artists
function getArtists(user) {
	// Date range of top artists selected
	var period = $(".selected").attr("value");
	// Call to getTopArtists from API. 
	$.getJSON("http://ws.audioscrobbler.com/2.0/?method=user.getTopArtists&user=" + user + "&api_key=109a93759c8a5b770fb2ac898f6d324a&limit=100&period=" + period + "&format=json&callback=?", 
		function(json) {
			console.log(json);
			var artists = json.topartists.artist;
			$(".results").empty();
			for (var i = 0; i < artists.length; i++) {
				// Get info for current artist
				var artistInfo = artists[i];
				var name = artistInfo.name;
				var url = artistInfo.url;
				var pics = artistInfo.image;
				var chosenPic = pics[4]["#text"];
				var chosenURL = "url('" + chosenPic + "')";
				var playCount = artistInfo.playcount;
				// Clone template and give proper contents
				var temp = $(".template").clone();
				temp.css("background-image", chosenURL);
				temp.find(".artist-name").text((i + 1) + "// " + name + "// " + playCount + " plays");
				temp.removeClass("template");
				// Click uses a closure to get around issue of assigning handlers while looping
				temp.click(redirect(url));
				var width = temp.width();
				console.log(temp);
				// Append template to results
				$(".results").append(temp);
			};
		}
	)
	$(".artist").height($(".artist").width());
}

// Returns a closure which when executed redirects the page to the give URL
function redirect(url) {
	return function() {
		window.location.href = url;
	}
}