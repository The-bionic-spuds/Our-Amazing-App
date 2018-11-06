$.fn.dankMeme = function () {
    // Create functions inside this plugin to avoid global variables/collisions.
    var t = this;
    t.colorsArr = ["peach", "purple", "blue", "aqua", "amy-crisp", "ripe-malinka", "morpheus-den", "dusty-grass", "tempting-azure"];
    t.saveObject = {
        memeCall: {
            title: "",
            img: ""
        },
        urbanCall: {
            definition: "",
            word: "",
            author: ""
        },
        wordsCall: {
            definition: "",
            word: "",
            partOfSpeech: ""
        },
        gifCall: {
            src: "",
            dataStill: "",
            dataAnimate: ""
        }
    }

    t.memeCall = function () {
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
            function randmomize(){
                t.rand = t.results[Math.floor(Math.random() * t.results.length)];
                return t.rand;
            }
            randmomize();
            t.memePush = t.saveObject.memeCall;
            var c = t.containers();;
            t.memePush.title = t.rand.title;
            t.memePush.img = t.rand.images[0].link || t.rand.gifv;
            var memeImage = t.memePush.img;

            if (t.results.length > 0) {
                c.div.attr({
                    "width": "300px",
                    "height": "auto"
                });

                c.p.text(t.memePush.title).addClass(t.colorPick + "-gradient z-depth-1").css({
                    "padding": "auto 5px auto 5px",
                    "text-align": "center",
                    "color": "white",
                    "font-family": "Poor Story"
                });
                checkArr = memeImage.split(".").pop();
                function checkData (){
                    if (checkArr !== "mp4") {
                        t.image()
                    } else {
                        randmomize();
                        checkData();
                    }
                }

                t.image = function(){
                    this.c.img.attr({
                        "src": t.memePush.img,
                        "class": "img-fluid"
                    }).addClass("z-depth-1");
                }
                checkData();
                c.div.append(this.c.p, this.c.img);
                c.memeDiv.append(c.div);
                
                
            } else {
                this.c.p.text("No memes here").addClass(t.colorPick + "-gradient z-depth-1").css({

                    "text-align": "center",
                    "color": "white",
                    "font-family": "Poor Story"
                });
                this.c.img.attr({
                    "src": "assets/images/tenor.png",
                    "class": "img-fluid"

                }).addClass("z-depth-1");

                c.memeDiv.append(this.c.p, this.c.img);
            };
        });
    }

    t.urbanCall = function () {
        t.getInput();
        var settings = {
            "url": "http://api.urbandictionary.com/v0/define?term=" + t.input,
            "method": "GET"
        };


        $.ajax(settings).done(function (response) {
            t.results = response.list;
            t.urbanPush = t.saveObject.urbanCall;
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
            t.urbanPush.definition = t.rand.definition;
            t.urbanPush.word = t.rand.word;
            t.urbanPush.author = t.rand.author;
        });
    };

    // Write more API call functions here
    t.wordsCall = function () { //oxford dictionary api call
        t.getInput();
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://wordsapiv1.p.mashape.com/words/" + t.input,
            "method": "GET",
            "headers": {
                "X-Mashape-Key": "T7n08c4kPwmshe44m88XtvOBxvIsp1Jf288jsntLtidNQOItVb"
            }
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            console.log(response.results);
            t.results = response.results;
            t.wordsPush = t.saveObject.wordsCall;
            t.rand = t.results[Math.floor(Math.random() * t.results.length)];
            console.log(t.rand);
            var c = t.containers();
            c.p.text("[DEFINITION] " + t.rand.definition).css({
                "padding-left": "10px",
                "color": "white",
                "font-family": "Poor Story"
            }).addClass("blue-gradient z-depth-1");
            c.head.text(t.input + " Part of Speech: " + t.rand.partOfSpeech).css({
                "padding-left": "5px",
                "color": "white",
                "font-family": "Poor Story"
            }).addClass("morpheus-den-gradient z-depth-1");
            c.wordDiv.append(c.head, c.p);
            t.wordsPush.definition = t.rand.definition;
            t.wordsPush.word = t.input;
            t.wordsPush.partOfSpeech = t.rand.partOfSpeech;
        });
    };

    t.gifCall = function () {
        var c = t.containers();
        var queryURL = "https://api.giphy.com/v1/gifs/random?tag=" + t.input + "&api_key=dc6zaTOxFJmzC&limit=1";
        t.gifPush = t.saveObject.gifCall;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            t.results = response.data;

            t.colorPick = t.colorsArr[Math.floor(Math.random() * t.colorsArr.length)]

            c.img.attr({
                "src": t.results.images.fixed_height_still.url,
                "class": "gif img-fluid",
                "data-state": "still",
                "data-still": t.results.images.fixed_height_still.url,
                "data-animate": t.results.images.fixed_height.url
            });
            c.gifDiv.append(c.img);
            $("#gif-holder").append(c.gifDiv);
            t.gifPush.src = t.results.images.fixed_height_still.url;
            t.gifPush.dataStill = t.results.images.fixed_height_still.url;
            t.gifPush.dataAnimate = t.results.images.fixed_height.url;
        });
    };


    t.cleanUp = function () { //add clears to this

        var c = t.containers();
        $("#input-word").val("");
        c.memeDiv.html("");
        c.urbanDiv.html("");
        c.wordDiv.html("");
        c.gifDiv.html("");
        console.log(t.saveObject);
    }


    t.containers = function () { //initialize jquery containers here

        var c = this;
        c.div = $("<div>");
        c.img = $("<img>");
        c.p = $("<p>");
        c.head = $("<h3>");
        c.memeDiv = $("#meme-holder");
        c.urbanDiv = $("#urban");
        c.wordDiv = $("#word");
        c.gifDiv = $("#gif-holder");
        return c; //returning "container" function data so that we can access it

    }

    t.getInput = function () { //nothing needs to be added unless we want multiple inputs
        t.input = $("#input-word").val().trim();

    }

    return t; //returning "this" dankmeme funciton allowing us to access all functions inside

};
$(document).ready(function () {

    var dank = $(window).dankMeme();
    $("body").on("click", "#submit", function (event) {
        event.preventDefault();
        dank.urbanCall();
        // Call more API functions here
        dank.wordsCall();
        dank.gifCall();
        dank.memeCall();
        dank.cleanUp();


    })

    $("#clear").on("click", function (e) {
        e.preventDefault();
        dank.cleanUp();
    });

    $("body").on("click", ".gif", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
});

// Dank Images Code

var images = ["assets/images/doritochip.png", "assets/images/doritosbag.png", "./assets/images/mtdewcan.png", "./assets/images/mtndewlogo.png", "./assets/images/thomasthetank.png"];

function setDankImages () {
    for (var i = 0; i < images.length; i++) {
        var dank = $("<img>");
        dank.attr("src", images[i]);
        dank.attr("id","img-" + i);
        dank.attr("height", "50");
        dank.attr("margin-left", "50px");
        dank.addClass("ml-5");
        $(".dankImages").append(dank);
    }
}

setDankImages();

// Code for bouncing images.

$.fn.bounce = function(options) {
    
    var settings = $.extend({
        speed: 10
    }, options);

    return $(this).each(function() {
        
        var $this = $(this),
            $parent = $this.parent(),
            height = $parent.height(),
            width = $parent.width(),
            top = Math.floor(Math.random() * (height / 2)) + height / 4,
            left = Math.floor(Math.random() * (width / 2)) + width / 4,
            vectorX = settings.speed * (Math.random() > 0.5 ? 1 : -1),
            vectorY = settings.speed * (Math.random() > 0.5 ? 1 : -1);

        // place initialy in a random location
        $this.css({
            'top': top,
            'left': left
        }).data('vector', {
            'x': vectorX,
            'y': vectorY
        });

        var move = function($e) {
            
            var offset = $e.offset(),
                width = $e.width(),
                height = $e.height(),
                vector = $e.data('vector'),
                $parent = $e.parent();

            if (offset.left <= 0 && vector.x < 0) {
                vector.x = -1 * vector.x;
            }
            if ((offset.left + width) >= $parent.width()) {
                vector.x = -1 * vector.x;
            }
            if (offset.top <= 0 && vector.y < 0) {
                vector.y = -1 * vector.y;
            }
            if ((offset.top + height) >= $parent.height()) {
                vector.y = -1 * vector.y;
            }

            $e.css({
                'top': offset.top + vector.y + 'px',
                'left': offset.left + vector.x + 'px'
            }).data('vector', {
                'x': vector.x,
                'y': vector.y
            });
            
            setTimeout(function() {
                move($e);
            }, 50);
            
        };
        
        move($this);
    });

};

$(function() {
    $('#wrapper li').bounce({
        'speed': 7
    });
});


// End Dank Images Code