// wrap everything in an immediately executed function to keep
// variable scope local
(function () {

    // tweak the .hint element in the event that this is on a
    // touchscreen display
    if ("ontouchstart" in document.documentElement) { 
	document.querySelector(".hint").innerHTML = "<p>Tap on the left or right to navigate</p>";
    }

    // fill the content with an ajax call
    $.ajax({
	url: "tools.json",
	dataType: "json",
	cache: false,
    }).done(function (jqXHR, status, error) {

	// render the content with handlebars
	render_detail_content(jqXHR);

	// instantiate the impress api
	var api = impress().init();

    }).fail(function (jqXHR, status, error) {
	console.log("FAIL", jqXHR);
	console.log("FAIL", status);
	console.log("FAIL", error);
    })

})()


function render_detail_content(json) {

    // compile the handlebars template
    var template_source = $("#detail-template").html();
    var template = Handlebars.compile(template_source);

    // for each details slide, add the content using the compiled template
    $(".details").each(function (i, element) {

	// find all tools that match this element id
	var element_id = $(element).attr('id');
	var tools = json.filter(function (tool) {
	    return tool['good for'].some(function (good_for) {
		return good_for === element_id;
	    });
	});

	// render the template
	$(element).html(template({
	    detail_title: get_detail_title(element_id),
	    packages: tools,
	}));

    });
}


function get_detail_title(element_id) {
    return element_id.split('-')[1].replace('_', ' ');
}
