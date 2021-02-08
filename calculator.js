setupButtonPressDisplay();

function setupButtonPressDisplay() {
    let buttons = document.querySelectorAll("button");
    
    buttons.forEach((button) => {
        button.addEventListener("click", displayButtonPress);
    });
}

function displayButtonPress() {
    let symbol = this.textContent;
    let console = document.getElementById("calculator-display");

    if (symbol.match(/[0-9]/g)) {
        console.textContent += `${symbol}`;
    } else if (symbol.match(/[*\-+/]/g)) {
        console.textContent += ` ${symbol} `;
    } else if (symbol.match(/[=]/g)) {
        calculateResult();
    } else if (symbol.match("Clear")) {
        console.textContent = "";
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
            return "Invalid operator";
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