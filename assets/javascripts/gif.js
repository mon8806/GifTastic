$(function () {

    var dogs = ["Pit Bull", "German Shepherd", "Chihuahua", "Pomeranian", "Rat Terrier", "Golden Retriever", "Corgi"];

    function renderButtons() {

        
        $("#buttons-view").empty();//deletes button before adding new buttons

        
        for (var i = 0; i < dogs.length; i++) {//loops through dogs array

           
            var a = $("<button>");//creates button for dog array
            
            a.addClass("type");//add class
            
            a.attr("data-name", dogs[i]);  // add attribute with the value of the dog index,<button data-name="Pit Bull "/>
            
            a.text(dogs[i]); //gives buttons text with value of dog index
            
            $("#buttons-view").append(a);//adds button to html
        }
    }

    
    $("#add-dog-type").on("click", function (event) {//handles the event when button is clicked
        
        event.preventDefault();//prevents form from submitting itself

        
        var doggies = $("#dog-input").val().trim();//grabs text from input box
        
        dogs.push(doggies);//add to array

        
        renderButtons();//handles the dog array action
    });



    function dogInfo() {
            var dogVal = $(this).attr("data-name");

            $("#dog-type").empty();
            console.log(this)
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                dogVal + "&api_key=pjIcFBNlvj6GinYm3VroNOnL24rjVFqc&limit=10";

            
            $.ajax({//preform ajax request with queryURL
                url: queryURL,
                method: "GET"
            }).then(function (response) {

               
                var results = response.data;//store data from ajax request in result var
                
                console.log(results)
               
                for (var i = 0; i < results.length; i++) {//loops thru the result

                    
                    var dogDiv = $(`<div class = "stop" style="display:inline-block">`); //creats and store div tag also so that pictures show up next to each other
                    
                    
                    var p = $("<p>").text("Rating: " + results[i].rating);//creats p tag with rating

                    
                    var dogImage = $("<img>");//creates image tag to store image
                    
                    dogImage.attr("src", results[i].images.fixed_height.url);//add src attr
                    dogImage.attr("data-still", results[i].images.fixed_height_still.url);
                    dogImage.attr("data-animate", results[i].images.fixed_height.url);
                    dogImage.attr("data-state", "still");
                    dogImage.attr("class", results[i].images.fixed_height.url);
                    dogImage.addClass("stop");

                    
                    dogDiv.append(p);//adds paragraph and image tag to animalDiv
                    dogDiv.append(dogImage);


                    $("#dog-type").prepend(dogDiv);//adds the dogDiv (div class) before the p tag
                    

                    
                    $(".stop").on("click", function () {//when you click of the of gif
                        
                        var state = $(this).attr("data-state");
                        
                        if (state === "still") {//if the gif is still, animate if not, freeze it
                            $(this).attr("src", $(this).attr("data-animate"));
                            $(this).attr("data-state", "animate");
                        } else {
                            $(this).attr("src", $(this).attr("data-still"));
                            $(this).attr("data-state", "still");
                        }
                    });
                }
            });
    }

    $(document).on("click", ".type", dogInfo);
   
    renderButtons();//display the list of dogs
});
