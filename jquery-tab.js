$(document).ready(function() {

    $("#documents a[tab-href]").click(function() {
        console.log($(this).attr("tab-href"))
        $(this).parents().find('li').each(function(){
            $(this).removeClass('active');
        })
        $(this).parents('li').addClass('active')
        addTab($(this));
    });

    $('#tabs').on('click','a.tab', function() {
        // Get the tab name
        var contentname = $(this).attr("id") + "_content";
        console.log("contentname:"+contentname)

        // hide all other tabs
        $("#content div").hide();
        $("#tabs li").removeClass("current");

        // show current tab
        $("#" + contentname).show();
        $(this).parent().addClass("current");
    });

    $('#tabs').on('click','a.remove', function() {
        // Get the tab name
        var tabid = $(this).parent().find(".tab").attr("id");

        // remove tab and tab-related content
        var contentname = tabid + "_content";
        $("#" + contentname).remove();
        $(this).parent().remove();

        // if there is no current tab and if there are still tabs left, show the first one
        if ($("#tabs li.current").length == 0 && $("#tabs li").length > 0) {

            // find the first tab
            var firsttab = $("#tabs li:first-child");
            firsttab.addClass("current");

            // get its link name and show tab-related content
            var firsttabid = $(firsttab).find("a.tab").attr("id");
            $("#" + firsttabid + "_content").show();
        }
    });
});

//添加选项卡
function addTab(link) {
    // If tab already exist in the list, return
    if ($("#" + $(link).attr("tab-id")).length != 0)
        return;

    // hide other tabs
    $("#tabs li").removeClass("current");
    $("#content div").hide();

    // add new tab and tab-related content
    $("#tabs").append("<li class='current'><a class='tab' id='" +
    $(link).attr("tab-id") + "' href='#'>" + $(link).attr('tab-name') +
    "</a><a href='#' class='remove'>x</a></li>");

    var frame_id=$(link).attr("tab-id")+"_frame";
    var div_id=$(link).attr("tab-id") + "_content";
    $("#content").append("<div id='" + div_id+"'>" + "<iframe src='"+$(link).attr("tab-href")+"' height:'100%' id='"+frame_id+"'  scrolling='no' frameborder='0'>" + "</div>");

    //auto height
    $('#'+frame_id).on('load',function(){
        var frameObj = document.getElementById(frame_id).contentDocument
                || document.getElementById(frame_id).contentWindow.document,
            mainWrapHeight = $(window).height() - 49 - 21, frame_height = frameObj.documentElement.scrollHeight;
        $(this).height( frame_height < 610 ? mainWrapHeight : frame_height);
    })

    // set the newly added tab as current
    $("#" + $(link).attr("tab-rel") + "_content").show();
}

