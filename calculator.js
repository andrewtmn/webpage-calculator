setupButtonPressDisplay();
setupEqualsKey();
setupNumberKeys();
setupOperatorKeys();

function setupButtonPressDisplay() {
    let buttons = document.querySelectorAll("button");
    
    buttons.forEach((button) => {
        button.addEventListener("click", displayButtonPress);
    });
}

function setupEqualsKey() {
    document.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            document.getElementById("equals").click();
        }
    }); 
}

function setupNumberKeys() {

}

function setupOperatorKeys() {
    
}

function displayButtonPress() {
    let symbol = this.textContent;
    let display = document.getElementById("calculator-display");

    if (symbol.match(/[0-9]/g)) {
        display.textContent += `${symbol}`;
    } else if (symbol.match(/[*\-+/]/g)) {
        appendOperator(symbol);
    } else if (symbol.match(/[=]/g)) {
        calculateResult();
    } else if (symbol.match("Clear")) {
        display.textContent = "";
    }
}

function appendOperator(symbol) {
    let display = document.getElementById("calculator-display");
    let currentExpr = display.textContent;

    if (currentExpr.charAt(currentExpr.length - 1).match(/[0-9]/g)) {
        display.textContent += ` ${symbol} `;
    }
}

function calculateResult() {
    let display = document.getElementById("calculator-display");
    let expr = display.textContent;

    let elements = expr.split(" ", 3);

    let x = Number(elements[0]);
    let y = Number(elements[2]);
    let op = elements[1];

    display.textContent = `${operate(x, y, op)}`;
}

function operate(x, y, op) {
    switch (op) {
        case '+':
            return add(x, y);
        case '-':
            return subtract(x, y);
        case '*':
            return multiply(x, y);
        case '/':
            return divide(x, y);
        default:
            return "";
    }
}

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function isNumber(x) {
    return (typeof x) === "number";
}