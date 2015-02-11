$(function() {
	$('.option').click(function() {
		$('.option').removeClass("selected");
		$(this).addClass("selected");
		$(".results").empty();
		getArtists($(".username").val());
	});
	$('.username').keypress(function (e) {
  		if (e.which == 13) {
  			$(".results").empty();
  			var user = $('.username').val();
  			getArtists(user);
    		return false;
  		}
	});
});

function getArtists(user) {
	var period = $(".selected").attr("value");
	console.log("chosen period: " + period);
	$.getJSON("http://ws.audioscrobbler.com/2.0/?method=user.getTopArtists&user=" + user + "&api_key=109a93759c8a5b770fb2ac898f6d324a&limit=100&period=" + period + "&format=json&callback=?", 
		function(json) {
			console.log(json);
			var artists = json.topartists.artist;
			for (var i = 0; i < artists.length; i++) {
				var artistInfo = artists[i];
				var name = artistInfo.name;
				var url = artistInfo.url;
				var pics = artistInfo.image;
				var chosenPic = pics[4]["#text"];
				var chosenURL = "url('" + chosenPic + "')";
				var playCount = artistInfo.playcount;
				// Clone template and give proper contents
				var temp = $(".template").clone();
				temp.height($(".template").width());
				temp.css("background-image", chosenURL);
				temp.find(".artist-name").text((i + 1) + "// " + name + "// " + playCount + " plays");
				temp.removeClass("template");
				console.log(temp);
				// Append template to results
				$(".results").append(temp);
			};
		})
}