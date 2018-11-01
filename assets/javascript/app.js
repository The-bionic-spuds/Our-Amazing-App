$.fn.dankMeme = function () {
    // Create functions inside this plugin to avoid global variables/collisions.
    var t = this;
    t.colorsArr = ["peach", "purple", "blue", "aqua", "amy-crisp", "ripe-malinka", "morpheus-den", "dusty-grass", "tempting-azure"];
    
    t.memeCall = function() {
        t.getInput();
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.imgur.com/3/gallery/search/viral/year/1/?q=" + t.input,
            "method": "GET",
            "headers": {
                "Authorization": "Client-ID be876a4140064ba"
            }
        }
        
        $.ajax(settings).done(function (response) {
            t.results = response.data;
            console.log(t.results);

            t.colorPick = t.colorsArr[Math.floor(Math.random() * 9)];
            t.rand =  t.results[Math.floor(Math.random() * t.results.length)];
            var c = t.containers();;

            if (t.results.length > 0) {
                c.div.attr({
                    "width": "300px",
                    "height": "auto"
                });

                c.p.text(t.rand.title).addClass(t.colorPick + "-gradient z-depth-1").css({
                    "padding": "auto 5px auto 5px",
                    "text-align": "center",
                    "color": "white",
                    "font-family": "Poor Story"
                });
                c.img.attr({
                    "src": t.rand.images[0].link,
                    "class": "img-fluid"

                }).addClass("z-depth-1");
                c.div.append(c.p, c.img);
                c.memeDiv.append(c.div);
            } else {
                c.p.text("No memes here").addClass(t.colorPick + "-gradient z-depth-1").css({

                    "text-align": "center",
                    "color": "white",
                    "font-family": "Poor Story"
                });
                c.img.attr({
                    "src": "assets/images/tenor.png",
                    "class": "img-fluid"

                }).addClass("z-depth-1");

                c.memeDiv.append(c.p, c.img);
            };
        });
    }

    t.urbanCall = function(){
        t.getInput();
        var settings = {
            "url": "http://api.urbandictionary.com/v0/define?term=" + t.input,
            "method": "GET"
        };


        $.ajax(settings).done(function (response) {
            t.results = response.list;
            console.log(t.results);
            t.rand = t.results[Math.floor(Math.random() * t.results.length)];
            console.log(t.rand);
            var c = t.containers();
            c.p.text("[URBAN DEFINITION] " + t.rand.definition).css({
                "padding-left": "10px",
                "color": "white",
                "font-family": "Poor Story"
            }).addClass("lady-lips-gradient z-depth-1");
            c.head.text(t.rand.word + " by: " + t.rand.author).css({
                "padding-left": "5px",
                "color": "white",
                "font-family": "Poor Story"
            }).addClass("rainy-ashville-gradient z-depth-1");
            c.urbanDiv.append(c.head, c.p);

        })
    }
    // Write more API call functions here
    t.oxfordCall = function (){ //oxford dictionary api call

    }

    t.cleanUp = function(){ //add clears to this
        var c = t.containers();
        $("#input-word").val("");
        c.urbanDiv.html("");
        c.memeDiv.html("");
    }

    t.containers = function(){ //initialize jquery containers here
        var c = this;
        c.div = $("<div>");
        c.img = $("<img>");
        c.p = $("<p>");
        c.head = $("<h3>");
        c.memeDiv = $("#meme-holder");
        c.urbanDiv = $("#urban");
        return c; //returning container function data so that we can access it

    }
    t.getInput = function(){ //nothing needs to be added unless we want multiple inputs
        t.input = $("#input-word").val().trim();

    }
     
    return t; //returning "this" dankmeme funciton allowing us to access all functions inside
};
$(document).ready(function () {

    var dank = $(window).dankMeme();
    $("body").on("click", "#submit", function (event) {
        event.preventDefault();
        dank.memeCall();
        dank.urbanCall();
        // Call more API functions here

        dank.cleanUp();


    })
});



