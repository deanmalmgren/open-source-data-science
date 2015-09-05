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
                title: 'Name',
                render: function (data, type, tool) {
                    var url = tool.code || tool.docs;
                    if (!url) {
                        return tool.name;
                    }
                    return '<a href="' + url + '">' + tool.name + '</a>';
                }
            },
            {
                data: 'license',
                title: 'License',
                render: function (data, type, tool) {
                    if (tool.license) {
                        return tool.license;
                    }
                    return unknown;
                }
            },
            {
                data: 'code',
                title: 'Repository',
                render: function (data, type, tool) {
                    if (!tool.code) {
                        return unknown;
                    }
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
                    return '<a href="'+tool.code+'">'+icon+'</a>';
                }

            }
            // {
            //     data: 'url',
            //     title: 'Link',
            //     visible: false
            // }
        ],

        // initComplete: function () {
        //     var input = $('#table-table_filter input');
        //     input.wrap('<form></form>');
        // }

    }); // end of .dataTable()
});
