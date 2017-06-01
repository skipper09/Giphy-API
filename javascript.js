$(document).ready(function() {

    var failTypes = ["cat", "dog", "dad", "grandpa", "baby", "drunk", "beach", "elephant"];

    function renderButtons() {
        $("#buttons").empty();

        for (var i = 0; i < failTypes.length; i++) {
            var newButton = $("<button data-type='" + failTypes[i] + " fail'>" + failTypes[i] + "</button>")
            $("#buttons").append(newButton);
        }

        $('button').on("click", function() {
            var x = $(this).data("type");
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=dc6zaTOxFJmzC&limit=10"

            $.ajax({ url: queryURL, method: "GET" })
                .done(function(response) {
                    for (var i = 0; i < response.data.length; i++) {
                        var newDiv = $("<div>");
                        var p = $("<p>").text("Rating: " + response.data[i].rating);
                        var failImg = $("<img>");

                        failImg.attr("src", response.data[i].images.fixed_height.url);

                        newDiv.append(p);
                        newDiv.append(failImg);

                        $("#fails").prepend(newDiv);
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
