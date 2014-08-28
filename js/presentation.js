// wrap everything in an immediately executed function to keep
// variable scope local
(function () {

    // tweak the .hint element in the event that this is on a
    // touchscreen display
    if ("ontouchstart" in document.documentElement) { 
	document.querySelector(".hint").innerHTML = "<p>Tap on the left or right to navigate</p>";
    }

    // instantiate the impress api
    var api = impress().init();
})()
