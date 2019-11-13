/**
 * Requests CTAT to grade an item by passing the id of the component, the action that was performed on the component and that value that is to be graded as an input.
 * @param selection - The value of the id attribute for the component that the student has interacted with.
 * @param action - The action that was performed on the component.
 * @param input - The value that is to be graded.
 * @example
 * // Requests CTAT to grade a multiple choice question that uses a radio button group called 'whyQchoices'.
 * // The action that is performed on the radio option in CTAT is an 'UpdateRadioButton'.
 * // In this case, CTAT expects a value of the radio button clicked by the student as an input, which is choiceC.
 * gradeItem('whyQchoices', 'UpdateRadioButton', 'choiceC').
 */
var unanswered = false;

function gradeItemSAI(selection, action, input) {
    if (selection != undefined && action != undefined && input != undefined && input != "" && input != ".") {
        CTATCommShell.commShell.gradeSAI(selection, action, input);
            
    }
}
