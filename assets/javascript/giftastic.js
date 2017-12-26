// Defining initial list of Animal array
var animalsArray = [
    "Dog",
    "Cat",
    "Rabbit",
    "Hamster",
    "Skunk",
    "Goldfish",
    "Bird",
    "Ferret",
    "Turtle",
    "Lion",
    "Sugar Glider",
    "Chinchilla",
    "Chicken",
    "Crab",
    "Fish",
    "Monkey",
    "Frog",
    "Goat",
    "Cow",
    "Deer",
    "Giraffe",
    "Elephant",
    "Penguin"
];
const API_KEY = "xMzKc3hIbBUzaz1esZB1VILg1Vqhw4Iu"; //storing API key in a constant

// This function gets execute after document is ready
$(function(){
    populateAnimalDiv();   //calling function to populate Animal div
    $(document).on("click",".animals",fetchAnimalGifs); //registering click event on buttons   
});

//function to populate Animal Div with Animal names in the array
function populateAnimalDiv(){
    var animalsDiv = $("#animalNames");
    animalsArray.forEach(function(animal){
        var animalBut = $("<button>");
        animalBut.addClass("animals btn btn-primary");
        animalBut.text(animal);
        animalsDiv.append(animalBut);   
    });
}

// This function fetch 10 selected animal gifs and then populate into the webpage
function fetchAnimalGifs(){
    
    //setting up query URL 
    var animalName = $(this).text();
    var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + API_KEY + "&q=" + animalName + "&limit=10&offset=0&lang=en";
    
    //calling ajax method to fetch JSON from end point
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).done(function(response){
        for(var i=0 ; i<response.data.length ; i++){
            var imgDivElem = $("#imgDiv" + i);
            imgDivElem.empty();
            
            //creating img tag with attributes for animal image
            var imgElem = $("<img>");
            imgElem.attr("src",response.data[i].images.original_still.url);
            imgElem.attr("width","350px");
            imgElem.attr("height","250px");
            imgElem.attr("data-state","still");
            imgElem.attr("data-stillURL",response.data[i].images.original_still.url);
            imgElem.attr("data-animateURL",response.data[i].images.original.url);
            imgElem.addClass("img-rounded center-block animalImg");
            
            //creating h4 tag for rating display
            var ratingElem = $("<h4>");
            ratingElem.text("Rating: " + response.data[i].rating);
            imgDivElem.append(ratingElem);
            imgDivElem.append(imgElem);     
        }
        
        // registering click event on displayed images of animal
        $(".animalImg").on("click",function(){
                var animalElement = $(this);
                //changing still image to animated image
                if(animalElement.attr("data-state")=="still"){
                    animalElement.attr("data-state","animate");
                    animalElement.attr("src",animalElement.attr("data-animateURL"));
                }else{ //changing animated image to still image
                    animalElement.attr("data-state","still");
                    animalElement.attr("src",animalElement.attr("data-stillURL"));
                }
        });       
    });
}