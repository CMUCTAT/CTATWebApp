/**
 * These are the functions for giving the correct or wrong answers green or red colors.
 * If the answer is correnct, then the function will disabled this question.
 * And show the next question.
 */
$(setTimeout(adjustElementPositions, 2000));

function markAnswer(answerClass) {

    // Grading checkmarks.
    if (CURRENT_INPUT_ID.substr(0, 5) === "check") {
        if (!$("#" + CURRENT_INPUT_ID).prop("checked")) {
            $('#hint-text').empty();
            return;
        }

        var boxNum = CURRENT_INPUT_ID.slice(-2)[0];
        var boxPosition = CURRENT_INPUT_ID.slice(-2)[1];

        // Checking if the boxes below have been already solved. 
        if (boxPosition === 'a') {
            var hasCorrectInputs = ($("#input" + boxNum + 'b').hasClass('right-answer') && $("#input" + boxNum + 'c').hasClass('right-answer'));
        } else {
            var hasCorrectInputs = ($("#input" + boxNum + 'e').hasClass('right-answer') && $("#input" + boxNum + 'f').hasClass('right-answer'));
        }

        // If the checkmark is checked with the correct units and substance, disable both 
        // elements and add correct class. 
        if (answerClass === "right-answer" && hasCorrectInputs) {
            $('#' + CURRENT_INPUT_ID).removeClass("wrong-check");
            $('#' + CURRENT_INPUT_ID).addClass("correct-check");
            $('#' + CURRENT_INPUT_ID).attr("disabled", "disabled");
        } else {
            $('#' + CURRENT_INPUT_ID).addClass("wrong-check");
        }
        return;
    }

    // Otherwise, grading inputs.
    var input = $("#" + CURRENT_INPUT_ID).val();

    // If the input is the empty string, remove all attributes to it.
    if (input === "----") {
        $('#' + CURRENT_INPUT_ID).removeClass("wrong-answer red-border green-border");
    } else {
        if (answerClass === "right-answer") {
            $('#' + CURRENT_INPUT_ID).removeClass("wrong-answer red-border");
            $('#' + CURRENT_INPUT_ID).addClass("right-answer green-border");
            $('#' + CURRENT_INPUT_ID).attr("disabled", "disabled");
        } else {
            $('#' + CURRENT_INPUT_ID).removeClass("wrong-answer red-border");
            $('#' + CURRENT_INPUT_ID).addClass("wrong-answer red-border");
        }
    }

}