var dateFormat = 'MMM Do, YYYY';

d3.json('../tools.json', function (error, tools) {

    var unknown = '<span class="unknown">(unknown)</span>';

    $('#tool-table').dataTable({

        // language: {
        //     search: "_INPUT_",
        //     searchPlaceholder: 'Use this to filter by matching text'
        // },

        data: tools,

        paging: false,

        dom: '<"filter-wrapper"f>rt',

        columns: [
            {
                data: 'name',
                title: '<span class="code"></span><span class="docs"></span>Name',
                render: function (data, type, tool) {
                    var code = get_code_dom(tool);
                    var docs = get_docs_dom(tool);
                    return code + docs + tool.name;
                }
            },
            {
                data: 'license',
                title: 'License',
                render: function (data, type, tool) {
                    if (tool.license) {
                        var url = LICENSES[tool.license];
                        return '<a href="'+url+'">'+tool.license+'</a>';
                    }
                    return unknown;
                }
            }
        ],

        // initComplete: function () {
        //     var input = $('#table-table_filter input');
        //     input.wrap('<form></form>');
        // }

    }); // end of .dataTable()
});

function get_code_dom(tool) {
    var inner = '';
    if (tool.code) {
        var icon;
        if (tool.code.indexOf('github.com') > -1) {
            icon = '<i class="fa fa-github"></i>';
        }
        else if (tool.code.indexOf('bitbucket.com') > -1) {
            icon = '<i class="fa fa-bitbucket"></i>';
        }
        else if (tool.code.indexOf('google.com') > -1) {
            icon = '<i class="fa fa-google"></i>';
        }
        else {
            icon = '<i class="fa fa-code"></i>';
        }
        inner = '<a href="'+tool.code+'">'+icon+'</a>';
    }
    return '<span class="code">' + inner + '</span>';
}

function get_docs_dom(tool) {
    var inner = '';
    if (tool.docs) {
        var icon = '<i class="fa fa-file-text-o"></i>';
        inner = '<a href="'+tool.docs+'">'+icon+'</a>';
    }
    return '<span class="docs">' + inner + '</span>';
}
