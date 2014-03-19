$(function(){
    var bs3Wysihtml5Templates = {
        "font-styles": function(locale) {
            return "<li class='dropdown'>" +
                "<a class='btn btn-sm btn-default dropdown-toggle' data-toggle='dropdown' href='#'>" +
                "<i class='glyphicon glyphicon-font'></i>&nbsp;<span class='current-font'>" + locale.font_styles.normal + "</span>&nbsp;&nbsp;<i class='fa fa-caret-down'></i>" +
                "</a>" +
                "<ul class='dropdown-menu'>" +
                "<li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='div'>" + locale.font_styles.normal + "</a></li>" +
                "<li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='p'>" + locale.font_styles.normal + "</a></li>" +
                "<li><a data-wysihtml5-command='formatInline' data-wysihtml5-command-value='span'>" + locale.font_styles.normal + "</a></li>" +
                "<li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='h1'>" + locale.font_styles.h1 + "</a></li>" +
                "<li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='h2'>" + locale.font_styles.h2 + "</a></li>" +
                "<li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='h3'>" + locale.font_styles.h3 + "</a></li>" +
                "</ul>" +
                "</li>"
        },
        "emphasis":  function(locale) {
            return "<li>" +
                "<div class='btn-group'>"
                + "<a class='btn btn-sm btn-default ' data-wysihtml5-command='bold' title='CTRL+B'><i class='glyphicon glyphicon-bold'></i></a>"
                + "<a class='btn btn-sm btn-default ' data-wysihtml5-command='italic' title='CTRL+I'><i class='glyphicon glyphicon-italic'></i></a>"
                //,+ "<a class='btn' data-wysihtml5-command='underline' title='CTRL+U'>Underline</a>"
                + "</div>"
                + "</li>"
        },
        "lists": function(locale) {
            return "<li>"
                + "<div class='btn-group'>"
                + "<a class='btn btn-sm btn-default ' data-wysihtml5-command='insertUnorderedList' title='" + locale.lists.unordered + "'><i class='glyphicon glyphicon-list'></i></a>"
                + "<a class='btn btn-sm btn-default ' data-wysihtml5-command='insertOrderedList' title='" + locale.lists.ordered + "'><i class='glyphicon glyphicon-th-list'></i></a>"
                + "<a class='btn btn-sm btn-default ' data-wysihtml5-command='Indent' title='" + locale.lists.indent + "'><i class='glyphicon glyphicon-indent-left'></i></a>"
                + "<a class='btn btn-sm btn-default ' data-wysihtml5-command='Outdent' title='" + locale.lists.outdent + "'><i class='glyphicon glyphicon-indent-right'></i></a>"
                + "</div>"
                + "</li>"
        },

        "link": function(locale) {
            return "<li>"

                + "<div class='bootstrap-wysihtml5-insert-link-modal modal hide fade'>"
                + "<div class='modal-header'>"
                + "<a class='close' data-dismiss='modal'>×</a>"
                + "<h3>" + locale.link.insert + "</h3>"
                + "</div>"
                + "<div class='modal-body'>"
                + "<input value='http://' class='bootstrap-wysihtml5-insert-link-url input-xlarge'>"
                + "</div>"
                + "<div class='modal-footer'>"
                + "<a href='#' class='btn' data-dismiss='modal'>" + locale.link.cancel + "</a>"
                + "<a href='#' class='btn btn-primary' data-dismiss='modal'>" + locale.link.insert + "</a>"
                + "</div>"
                + "</div>"

                + "<a class='btn btn-sm btn-default ' data-wysihtml5-command='createLink' title='" + locale.link.insert + "'><i class='fa fa-share'></i></a>"

                + "</li>"
        },

        "image": function(locale) {
            return "<li>"

                + "<div class='bootstrap-wysihtml5-insert-image-modal modal hide fade'>"
                + "<div class='modal-header'>"
                + "<a class='close' data-dismiss='modal'>×</a>"
                + "<h3>" + locale.image.insert + "</h3>"
                + "</div>"
                + "<div class='modal-body'>"
                + "<input value='http://' class='bootstrap-wysihtml5-insert-image-url input-xlarge'>"
                + "</div>"
                + "<div class='modal-footer'>"
                + "<a href='#' class='btn' data-dismiss='modal'>" + locale.image.cancel + "</a>"
                + "<a href='#' class='btn btn-primary' data-dismiss='modal'>" + locale.image.insert + "</a>"
                + "</div>"
                + "</div>"

                + "<a class='btn btn-sm btn-default ' data-wysihtml5-command='insertImage' title='" + locale.image.insert + "'><i class='glyphicon glyphicon-picture'></i></a>"

                + "</li>"
        },

        "html": function(locale) {
            return "<li>"
                + "<div class='btn-group'>"
                + "<a class='btn btn-sm btn-default ' data-wysihtml5-action='change_view' title='" + locale.html.edit + "'><i class='fa fa-pencil'></i></a>"
                + "</div>"
                + "</li>"
        }
    };
    function pageLoad(){
        $('#tooltip-enabled, #max-length').tooltip();
        $('.selectpicker').selectpicker();
        $(".autogrow").autosize({append: "\n"});
        $('#wysiwyg').wysihtml5({
            html: true,
            customTemplates: bs3Wysihtml5Templates,
            stylesheets: []
        });
    }
    pageLoad();
    SingApp.onPageLoad(pageLoad);
});