setTimeout(addEventHandlers, 1000);

function addEventHandlers() {

    // Hiding strikes when webpage loads.
    for (var i = 1; i <= 5; i++) {
        $("#strike" + i + "a").hide();
        $("#strike" + i + "b").hide();
    }

    // Grading checkmarks
    $(".checks").click(function () {
        CURRENT_INPUT_ID = this.id;
        var uniqueId = CURRENT_INPUT_ID.slice(-2);
        showStrike(uniqueId);
        gradeItemSAI($(this).attr("data-id"), "UpdateCheckBox", ": true");

    })

    // Grading input text boxes
    $("ion-input").focusout(function() {
        CURRENT_INPUT_ID = this.id;
        if ($("#" + CURRENT_INPUT_ID).val().length == 0) {
            $('#' + CURRENT_INPUT_ID).removeClass("right-answer wrong-answer red-border green-border");
        } else {
            gradeItemSAI($(this).attr("data-id"), "UpdateTextField", $("#" + CURRENT_INPUT_ID).val());
        }
    });

    // Grading input select boxes
    $("ion-select").click(function () {
        let that = $(this);
        CURRENT_INPUT_ID = this.id;
        setTimeout(function () {
            $("ion-radio").click(function () {
                $("ion-radio").attr("disabled","disabled");
                gradeItemSAI($(that).attr("data-id"), "UpdateComboBox", $("#" + CURRENT_INPUT_ID).val());
            });
        }, 100);
    });

    // Done button 
    $("#btnDone").click(function () {
        gradeItemSAI("done", "ButtonPressed", -1);
        setTimeout(function () {
            if ($('.CTATHintWindow--hint-content').is(':empty')) {
                showElement("finalText")
            }
        }, 100);

    })

    eventListeners = {
        processCommShellEvent: function (event, message) {
            if (event === "InterfaceAction") {
                ctatMessage = (new CTATMessage((new CTATXML()).parseXML(message))).getSAI().getSelection();
                if (ctatMessage && ctatMessage !== "undefined") {
                    currentGradedSelection = ctatMessage;
                }
            } else if (event === "AssociatedRules") {
                demoMessageAR = message;
                var indicator = message.getProperty("Indicator").toLowerCase();
                console.log(indicator);
                if (indicator === "correct") {
                    markAnswer('right-answer');
                } else if (indicator === "incorrect") {
                    markAnswer('wrong-answer');
                }
            }
        }
    };

    $("#btnHint").click(function () {
        var sai = new CTATSAI("hint", "ButtonPressed", -1);
        CTATCommShell.commShell.processComponentAction(sai);
    });

    CTATCommShell.commShell.addGlobalEventListener(eventListeners);
}