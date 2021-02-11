setupButtonPressDisplay();
setupKeyPresses();
setupClearKeyPress();

function setupButtonPressDisplay() {
    let buttons = document.querySelectorAll("button");
    
    buttons.forEach((button) => {
        button.addEventListener("click", displayButtonPress);
    });
}

function setupKeyPresses() {
    document.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            document.getElementById("equals").click();
        } else if (e.key.match(/[0-9+*/-]/g)) {
            document.getElementById(`${e.key}`).click();
        }
    }); 
}

function setupClearKeyPress() {
    document.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" || e.key === "Delete") {
            document.getElementById("clear").click();
        }
    });
}

function displayButtonPress() {
    let symbol = this.textContent;
    let display = document.getElementById("calculator-display");

    if (symbol.match(/[0-9]/g)) {
        appendNumber(symbol); 
    } else if (symbol.match(/[*\-+/]/g)) {
        appendOperator(symbol);
    } else if (symbol.match(/[=]/g)) {
        evaluateExpression();
    } else if (symbol.match("Clear")) {
        clearDisplay();
    }
}

function appendNumber(symbol) {
    let display = document.getElementById("calculator-display");
    
    let currentExpr = display.textContent;
    let len = currentExpr.length;
    if (!currentExpr.charAt(len - 1).match(/[0-9]/g) && 
        !currentExpr.charAt(len - 2).match(/[*\-+/]/g)) {
        clearDisplay();
    }
    display.textContent += `${symbol}`;
}

function clearDisplay() {
    document.getElementById("calculator-display").textContent = "";
}

function appendOperator(symbol) {
    let display = document.getElementById("calculator-display");
    let currentExpr = display.textContent;

    if (!isANumber(currentExpr)) {
        evaluateExpression();
    } 
    
    if (currentExpr.charAt(currentExpr.length - 1).match(/[0-9]/g)) {
        display.textContent += ` ${symbol} `;
    }
}

function isANumber(str) {
    let num = Number(str);

    if (Number.isNaN(num)) {
        return false;
    }

    return true;
}

function evaluateExpression() {
    let display = document.getElementById("calculator-display");
    let expr = display.textContent;

    if (!expr.charAt(expr.length - 1).match(/[0-9]/g)) {
        display.textContent = "Invalid Expression";
        return;
    }

    let elements = expr.split(" ", 3);

    let x = Number(elements[0]);
    let y = Number(elements[2]);
    let op = elements[1];

    console.log(`${x}, ${y}, ${op}`);

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
            if (y === 0) {
                return "Divide by Zero Err";
            }
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