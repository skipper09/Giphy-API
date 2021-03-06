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
                        failImg.attr("data-still", response.data[i].images.fixed_height_still.url)
                        failImg.attr("data-active", response.data[i].images.fixed_height.url)
                        failImg.attr("data-state", "static")

                        newDiv.append(failImg);
                        newDiv.append(p);

                        $("#fails").append(newDiv);

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

    $(document).on("click", "img", function() {

        if ($(this).attr("data-state") == "static") {

            $(this).attr("src", $(this).attr("data-active"));

            $(this).attr("data-state", "active")

        } else {

            $(this).attr("src", $(this).attr("data-still"));

            $(this).attr("data-state", "static")

        }
    })
})
