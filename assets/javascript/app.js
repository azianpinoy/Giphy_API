//Variables////////////////////////////////////////////////////////////////////////////////////////////
var topicArray = ["basketball", "soccer", "tennis", "football", "hockey"];
var topic = "";
var currentURL = "";
var newURL = "";

//Fucnction to append buttons to HTML from array///////////////////////////////////////////////////////
function addButtons(){

	$("#topicButtons").html("");

	for (var i = 0; i < topicArray.length; i++){
		var newButton = $("<button>");
		newButton.addClass("topicButton");
		newButton.text(topicArray[i]);
		newButton.attr("value", topicArray[i]);
		$("#topicButtons").append(newButton);
	}
}


//On-Click function for input button////////////////////////////////////////////////////////////////////
$("#addTopic").on("click", function(event){
	event.preventDefault();

	var newTopic = $("#topicInput").val().trim();
	topicArray.push(newTopic);

	addButtons();

})

//On-Click function for topic buttons///////////////////////////////////////////////////////////////////
$(document).on("click", ".topicButton", function(){
	topic = this.value
	runQuery();
});



//Function to Query from API///////////////////////////////////////////////////////////////////////
function runQuery(){

$("#outputSection").html("");

var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=68fb52e019da42ae8d92cea64ecce958&limit=10&q=" + topic;

$.ajax({
  url: queryURL,
  method: 'GET'
}).done(function(response) {

	for(var i = 0; i <= 9 ; i++){
		
		var gifDiv = $("<div>").addClass("gifDiv");

			gifDiv.html("<h3>" + response.data[i].rating + "</h3>");

			var gifImage = $("<img>").attr("src", response.data[i].images.fixed_height_still.url);

			gifImage.addClass("gif");

			gifImage.attr("id", response.data[i].id);
		
			gifDiv.append(gifImage);

		$("#outputSection").append(gifDiv);
	}
});

}

//On-Click function for gifs//////////////////////////////////////////////////////////////////////////
$(document).on("click", ".gif", function(){
	var id = this.id;
	var queryURL = "http://api.giphy.com/v1/gifs/" + id + "?api_key=68fb52e019da42ae8d92cea64ecce958";
	
	currentURL = this.src;

	$.ajax({
  	url: queryURL,
  	method: 'GET'
	}).done(function(response) {
		newURL = response.data.images.fixed_height.url;
	});	

	$(this).attr("src", newURL);
})

//Initiate starter-topics to HTML//////////////////////////////////////////////////////////////////////
addButtons();

