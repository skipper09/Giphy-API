$(document).ready(function() {
    var failTypes = ["Cat", "Dog", "Dad", "Old", "Baby", "Drunk", "Beach", "Elephant"];

    function renderButtons() {
        $("#buttons").empty();

        for (var i = 0; i < failTypes.length; i++) {
            var newButton = $("<button data-type='" + failTypes[i] + " fail'>" + failTypes[i] + "</button>")
            $("#buttons").append(newButton);
        }

        $('button').on("click", function() {
			$("#fails").empty();

            var x = $(this).data("type");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=dc6zaTOxFJmzC&limit=10"

            $.ajax({ url: queryURL, method: "GET" })
                .done(function(response) {
                    for (var i = 0; i < response.data.length; i++) {
                        var newDiv = $("<div id='div'>");
                        var p = $("<p>").text("Rating: " + response.data[i].rating);
                        var failImg = $("<img>");

                        failImg.attr("src", response.data[i].images.fixed_height_still.url);
                        failImg.attr("id", i);
                        failImg.attr("data-state", "static")

                        newDiv.append(p);
                        newDiv.append(failImg);

                        $("#fails").append(newDiv);



                        $('img').on("click", function() {

                        	var location = parseInt($(this).attr("id"))

                            if ($(this).attr("data-state") == "static") {

                                $(this).attr("src", response.data[location].images.fixed_height.url);

                                $(this).attr("data-state", "active")

                            } else {


                                $(this).attr("src", response.data[location].images.fixed_height_still.url);

                                $(this).attr("data-state", "static")

                            }
                        });
                    }


                })
        });
    };

    renderButtons();

    $("#add-fail").on("click", function(event) {
        event.preventDefault();
        var failInput = $("#fail-input").val().trim();
        failTypes.push(failInput);
        renderButtons();
    });



})
