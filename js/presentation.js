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

    // get all of the subcategories for each tool and order them
    var categories = get_all_categories(json);

    // for each details slide, add the content using the compiled template
    $(".details").each(function (i, element) {
	var element_id = $(element).attr('id');
	var category = element_id.split('-')[0];
	var subcategory = element_id.split('-')[1];

	// find all tools that match this element id
	var tools = json.filter(function (tool) {
	    return tool.good_for.some(function (good_for) {
		return good_for === element_id;
	    });
	});

	// render the template
	$(element).html(template({
	    detail_title: get_detail_title(element_id),
	    packages: tools,
	}));

	// place the details slide relative to the title for that area
	var subcategory_index = categories[category].indexOf(subcategory);
	var css_width = $(element).outerWidth(true);
	var category_data = $("#" + category).data();
	var scale = 0.25;
	var y = category_data.y+70;  // TODO: NOT HARDCODED?
	var x = category_data.x;
	x += css_width*scale*(subcategory_index - (categories[category].length-1)/2);
	$(element).attr({
	    "data-x": x,
	    "data-y": y,
	    "data-scale": scale,
	});

    });
}


function get_all_categories(json) {
    var categories = {};
    json.forEach(function (tool) {
	tool.good_for.forEach(function (good_for) {
	    var x = good_for.split('-');
	    if (!categories.hasOwnProperty(x[0])) {
		categories[x[0]] = [];
	    }
	    categories[x[0]].push(x[1]);
	});
    });

    for (var c in categories) {
	categories[c] = unique(categories[c]);
	categories[c].sort()
    }
    return categories;
}


function get_detail_title(element_id) {
    return element_id.split('-')[1].replace('_', ' ');
}

// http://stackoverflow.com/a/11911532/564709
function unique(arr) {
    var u = {}, a = [];
    for(var i = 0, l = arr.length; i < l; ++i){
        if(!u.hasOwnProperty(arr[i])) {
            a.push(arr[i]);
            u[arr[i]] = 1;
        }
    }
    return a;
}
