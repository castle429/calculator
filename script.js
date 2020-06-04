let display = document.getElementById("display");
let expressionBox = document.getElementById("expression");
let numBtns = document.querySelectorAll(".number");
let operatorBtns = document.querySelectorAll(".operator");
let decimalButton = document.getElementById("decimal");
let equal = document.getElementById("equals");
let clear = document.getElementById("clear");
let answerDisplayed;
let operatorToggle;

numBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
        if(answerDisplayed) {
            expressionBox.textContent = "";
            display.textContent = "";
            answerDisplayed = false;
        }
        display.textContent += this.textContent;
        operatorToggle = false;
    });
});

operatorBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
        if(!answerDisplayed) {
            if(!operatorToggle) {
                expressionBox.textContent += display.textContent;
                expressionBox.textContent += this.textContent;
                display.textContent = "";
                operatorToggle = true;
            }
        }
    });
});

equal.addEventListener("click", function () {
    expressionBox.textContent += display.textContent;
    if(evaluateExpression(expressionBox.textContent) == Infinity) {
        display.textContent = "Can't divide by 0. In fact, what you did makes absolutely no sense.";
    }
    else {
        display.textContent = evaluateExpression(expressionBox.textContent);

    }
    answerDisplayed = true;
});

clear.addEventListener("click", function() {
    display.textContent = "";
    expressionBox.textContent = "";
});

document.getElementById("backspace").addEventListener("click", function() {
   display.textContent = display.textContent.substring(0, display.textContent.length - 1); 
});


decimalButton.addEventListener("click", function() {
    if(!display.textContent.includes(".")) {
        display.textContent += ".";
    }

});

function evaluateExpression(expression) {
    return new Function('return ' + expression)();
}