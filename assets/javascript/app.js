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
    };

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
            t.memePush = t.saveObject.memeCall;
            t.rand = t.results[Math.floor(Math.random() * t.results.length)];
            var randomImage = t.rand.images[0].link;
            var imageData = randomImage.split(".").pop();

            function thisImage() {
                if (randomImage && imageData != "mp4") {
                    var image = t.rand.images[0].link;
                    t.memePush.title = t.rand.title;
                    return image;
                } else if (imageData === "mp4") {
                    t.rand = t.results[Math.floor(Math.random() * t.results.length)]
                    thisImage();
                } else {
                    var image = t.rand.gifv;
                    return image;
                };
            };
            t.memePush.img = thisImage();
        });
    }

    t.urbanCall = function () {
        t.getInput();
        var settings = {
            "url": "https://api.urbandictionary.com/v0/define?term=" + t.input,
            "method": "GET"
        };


        $.ajax(settings).done(function (response) {
            t.results = response.list;
            t.rand = t.results[Math.floor(Math.random() * t.results.length)];
            t.urbanPush = t.saveObject.urbanCall;
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
            t.rand = t.results[Math.floor(Math.random() * t.results.length)];
            t.wordsPush = t.saveObject.wordsCall;
            t.wordsPush.definition = t.rand.definition;
            t.wordsPush.word = t.input;
            t.wordsPush.partOfSpeech = t.rand.partOfSpeech;
            console.log(t.rand);
           
        });
    };

    t.gifCall = function () {
        var queryURL = "https://api.giphy.com/v1/gifs/random?tag=" + t.input + "&api_key=dc6zaTOxFJmzC&limit=1";
        t.gifPush = t.saveObject.gifCall;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            t.results = response.data;
            t.gifPush.src = t.results.images.fixed_height_still.url;
            t.gifPush.dataStill = t.results.images.fixed_height_still.url;
            t.gifPush.dataAnimate = t.results.images.fixed_height.url;

        });
    };

    t.renderScreen = function (s) {
        function renderMeme(){
            var c = t.containers();
            t.colorPick = t.colorsArr[Math.floor(Math.random() * 9)];
            if (s.memeCall.title.length > 0) {
                c.div.attr({
                    "width": "300px",
                    "height": "auto"
                });
                console.log();
                c.p.text(s.memeCall.title).addClass(t.colorPick + "-gradient z-depth-1").css({
                    "padding": "auto 5px auto 5px",
                    "text-align": "center",
                    "color": "white",
                    "font-family": "Poor Story"
                });
                debugger;
                c.img.attr({
                    "src": s.memeCall.img,
                    "class": "img-fluid"

                }).addClass("z-depth-1");
                console.log("This is the image", c.img);
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

                c.memeDiv.append(c.p)
                c.memeDiv.append(c.img);
            };
        };
        
        function renderUrban(){
            var c = t.containers();
            c.p.text("[URBAN DEFINITION] " + s.urbanCall.definition).css({
                "padding-left": "10px",
                "color": "white",
                "font-family": "Poor Story"
            }).addClass("lady-lips-gradient z-depth-1");
            c.head.text(s.urbanCall.word + " by: " + s.urbanCall.author).css({
                "padding-left": "5px",
                "color": "white",
                "font-family": "Poor Story"
            }).addClass("rainy-ashville-gradient z-depth-1");
            c.urbanDiv.append(c.head, c.p);
            console.log(s.urbanCall.word);
        };
        
        function renderWord(){
            var c = t.containers();
            c.p.text("[DEFINITION] " + s.wordsCall.definition).css({
                "padding-left": "10px",
                "color": "white",
                "font-family": "Poor Story"
            }).addClass("blue-gradient z-depth-1");
            c.head.text(s.wordsCall.word + " Part of Speech: " + s.wordsCall.partOfSpeech).css({
                "padding-left": "5px",
                "color": "white",
                "font-family": "Poor Story"
            }).addClass("morpheus-den-gradient z-depth-1");
            c.wordDiv.append(c.head, c.p);
        }
        function renderGIF() {
            var c = t.containers();
            t.colorPick = t.colorsArr[Math.floor(Math.random() * t.colorsArr.length)]
            c.img.attr({
                "src": s.gifCall.src,
                "class": "gif img-fluid",
                "data-state": "still",
                "data-still": s.gifCall.dataStill,
                "data-animate": s.gifCall.dataAnimate
            });
            c.div.append(c.img);
            $("#gif-holder").append(c.div);
        }
        setTimeout(function(){
            renderMeme();
        }, 50)
        setTimeout(function(){
            renderUrban();
        }, 100)
        setTimeout(function(){
            renderWord();
        }, 150)
        setTimeout(function(){
            renderGIF();
        }, 200)
    };

    t.clearInput = function () {
        $("#input-word").val("");
    };

    t.cleanUp = function () { //add clears to this

        var c = t.containers();
        c.urbanDiv.html("");
        c.memeDiv.html("");
        c.wordDiv.html("");
        c.gifDiv.html("");
        console.log(t.saveObject);
    };


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
    // var ourJSON;

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyA2A9okIthqpQ4v0lyEKLbsSrW3ShPPtx0",
        authDomain: "dank-memes-recent.firebaseapp.com",
        databaseURL: "https://dank-memes-recent.firebaseio.com",
        projectId: "dank-memes-recent",
        storageBucket: "dank-memes-recent.appspot.com",
        messagingSenderId: "895419472859"
    };
    firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();

    // Capture Button Click
    $("body").on("click", "#publish", function (event) {
        event.preventDefault();
        var name = $("#publish-name").val().trim();
        if (name.length > 0) {
            setTimeout(function () {
                database.ref("/savedinfo/").child(name).push(dank.saveObject);
                $("publish-name").val("");
            }, 500);
        }
        // Grabs user input
        // var inputWord = $("#input-word").val().trim();

        // Creates local "temporary" object for holding output
        // var newSave = {
        //     inputWord: inputWord

        // };

        // Uploads data to the database

        // Logs everything to console
        // console.log(newWord.inputWord);

    });

    // 3. Create Firebase event for adding outputs to the database
    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        // Store everything into a variable.
        var inputWord = childSnapshot.val().inputWord;


        // Employee Info
        console.log(inputWord);
    });



    var dataRef = database.ref("/currentData/");
    var presenceRef = database.ref("/.info/connected");

    $("body").on("click", "#submit", function (event) {
        event.preventDefault();
        dank.cleanUp();
        dank.memeCall();
        dank.urbanCall();
        // Call more API functions here
        dank.wordsCall();
        dank.gifCall();
        dank.clearInput();
        // setTimeout(function () {
        //     ourJSON = JSON.stringify(dank.saveObject);
        //     console.log(ourJSON);
        //     if ($("#meme-holder div").children().last().is("img")) {
        //         console.log("Success");
        //     } else {
        //         var img = $('<img>');
        //         img.attr({
        //             "src": dank.saveObject.memeCall.img,
        //             "class": "img-fluid"
        //         }).addClass("z-depth-1");

        //         $("#meme-holder div").append(img);
        //     }
        // }, 300);
        // setTimeout(function () {
        //    dataRef.set(dank.saveObject);
        // }, 500)
        
    })
    $(document).ajaxStop(function(){
        dataRef.set(dank.saveObject);
    })
    dataRef.on("value", function(snapshot){
            dank.renderScreen(snapshot.val());
    })
    presenceRef.on("value", function(){
        dataRef.onDisconnect().remove();
    });
    
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

function setDankImages() {
    for (var i = 0; i < images.length; i++) {
        var dank = $("<img>");
        dank.attr("src", images[i]);
        dank.attr("id", "img-" + i);
        dank.attr("height", "50");
        dank.attr("margin-left", "50px");
        dank.addClass("ml-5");
        $(".dankImages").append(dank);
    }
}

setDankImages();

// Code for bouncing images.

$.fn.bounce = function (options) {

    var settings = $.extend({
        speed: 10
    }, options);

    return $(this).each(function () {

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

        var move = function ($e) {

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

            setTimeout(function () {
                move($e);
            }, 50);

        };

        move($this);
    });

};

$(function () {
    $('#wrapper li').bounce({
        'speed': 7
    });
});


    // End Dank Images Code 
