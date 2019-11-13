/**
 * Converts an input to the correct format to compare with
 */
function getActualInput(input) {
    let num = parseFloat(input);
    return isNaN(num) ? input : num;
}