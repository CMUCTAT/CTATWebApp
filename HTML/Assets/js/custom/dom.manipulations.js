/**
 * Having the elements on the page invisible and giving them the animation 
 * for the action (duration and fadein style).
 */
function compileAndLoadTemplate(id) {
    $("#content").html((_.template($("#" + id).html()))(STATIC_CONTENT));
}

setTimeout(adjustElementPositions, 2000);

function adjustElementPositions() {
    $("#templateDiv").removeClass('hidden');

    // Hide overlay and show content.
    $("#overlay").hide();
    $("#templateDiv").hide();
    $("#templateDiv").removeClass('hidden');
    setTimeout(function () { $("#templateDiv").show(); }, 500);
}

function makeElementVisible(id) {
    $("#" + id).removeClass("invisible");
    $("#" + id).addClass("animated fadeIn animation-duration-2sec");
}

function makeElementInvisible(id) {
    $("#" + id).addClass("invisible");
    $("#" + id).removeClass("animated fadeIn animation-duration-2sec");
}

function hideElement(id) {
    $("#" + id).removeClass("animated fadeIn animation-duration-2sec");
    $("#" + id).addClass("animated fadeOut animation-duration-2sec");
    setTimeout(function () { $("#" + id).addClass("hiddenElement"); }, 1000);
}

function showElement(id) {
    $("#" + id).removeClass("hiddenElement animated fadeOut animation-duration-2sec");
    $("#" + id).addClass("animated fadeIn animation-duration-2sec");
}

/**
 * Grabs the coordinates of the stirke and toggles the visibility of the strike
 * on click.
 * @param  {string} id The last two characters of the id of the strike. 
 *                     i.e. 2a, 2b, 3a, etc...
 */
function showStrike(id) {
    var gridNum = id[0];
    var position = id[1];

    // If the selection is in the numerator
    if (position == 'a') {

        // If the answer box is incorrect, then toggle disabled when 
        // check is clicked
        if (!($("#input" + gridNum + "b").hasClass("right-answer"))) {
            $("#input" + gridNum + "b").prop('disabled', function (i, v) { return !v; });
        }

        if (!($("#input" + gridNum + "c").hasClass("right-answer"))) {
            $("#input" + gridNum + "c").prop('disabled', function (i, v) { return !v; });
        }

        // Finding the positions to calculate the height 
        var b = $("#input" + gridNum + "b").parent().position();
        var height = $("#input" + gridNum + "b").parent().height();
        var c = $("#input" + gridNum + "c").parent().position();
        var width = $("#input" + gridNum + "c").parent().outerWidth();
    } else {

        if (!($("#input" + gridNum + "e").hasClass("right-answer"))) {
            $("#input" + gridNum + "e").prop('disabled', function (i, v) { return !v; });
        }
        if (!($("#input" + gridNum + "f").hasClass("right-answer"))) {
            $("#input" + gridNum + "f").prop('disabled', function (i, v) { return !v; });
        }
        var b = $("#input" + gridNum + "e").parent().position();
        var height = $("#input" + gridNum + "e").parent().height();
        var c = $("#input" + gridNum + "f").parent().position();
        var width = $("#input" + gridNum + "f").parent().outerWidth();
    }

    var line = document.querySelector("#strike" + id);
    line.setAttribute("x1", c.left + width);
    line.setAttribute("y1", c.top);
    line.setAttribute("x2", b.left);
    line.setAttribute("y2", c.top + height);
    $("#strike" + id).toggle();
}