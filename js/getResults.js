$(function() {
	$('.username').keypress(function (e) {
  		if (e.which == 13) {
  			var user = $('.username').val();
  			getArtists(user);
    		return false;    //<---- Add this line
  		}
	});
});

function getArtists(user) {
	$.getJSON("http://ws.audioscrobbler.com/2.0/?method=user.getTopArtists&user=" + user + "&api_key=109a93759c8a5b770fb2ac898f6d324a&limit=10&period=1month&format=json&callback=?", 
		function(json) {
			console.log(json);
			var artists = json.topartists.artist;
			for (var i = 0; i < artists.length; i++) {
				var artistInfo = artists[i];
				var name = artistInfo.name;
				var url = artistInfo.url;
				var pics = artistInfo.image;
				var chosenPic = pics[4]["#text"];
				console.log(chosenPic)
				var playCount = artistInfo.playcount;
				console.log(name + " " + playCount);
				$(".artist-pic").attr("src", chosenPic);
				$(".artist-name").text(name);
			};
		})
}