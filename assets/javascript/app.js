
$.fn.dankMeme = function () {
    // Create functions inside this plugin to avoid global variables/collisions.
    var t = this;
    t.colorsArr = ["peach", "purple", "blue", "aqua", "amy-crisp", "ripe-malinka", "morpheus-den", "dusty-grass", "tempting-azure"];
    t.memeCall = function() {
        t.input = $("#input-word").val().trim();
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.imgur.com/3/gallery/search/viral/year/1/?q=" + t.input + "+memes",
            "method": "GET",
            "headers": {
                "Authorization": "Client-ID be876a4140064ba"
            }
        }
        
        $.ajax(settings).done(function (response) {
            t.results = response.data;
            console.log(t.results);
            t.colorPick = t.colorsArr[Math.floor(Math.random() * 9)]
            t.rand =  t.results[Math.floor(Math.random() * t.results.length)]
            t.memeDiv = $("#meme-holder");
            t.memeDiv.html("");
            t.div = $("<div>");
            t.img = $("<img>");
            t.p = $("<p>")
            if (t.results.length > 0) {
                t.div.attr({
                    "width": "300px",
                    "height": "auto"
                });
                t.p.text(t.rand.title).addClass(t.colorPick + "-gradient").css({
                    "text-align": "center",
                    "color": "white",
                    "font-family": "Poor Story"
                });
                t.img.attr({
                    "src": t.rand.images[0].link,
                    "class": "img-fluid"
                });
                t.div.append(t.p, t.img);
                t.memeDiv.append(t.div);
            } else {
                t.p.text("No memes here").addClass(t.colorPick + "-gradient").css({
                    "text-align": "center",
                    "color": "white",
                    "font-family": "Poor Story"
                });
                t.img.attr({
                    "src": "assets/images/tenor.png",
                    "class": "img-fluid"
                });
                t.memeDiv.append(t.p, t.img);
            };
        });
    }

    t.urbanCall = function(){

    }
    return t;
};
$(document).ready(function () {

    var dank = $(window).dankMeme();
    $("body").on("click", "#submit", function (event) {
        event.preventDefault();
        dank.memeCall();
    })
});




