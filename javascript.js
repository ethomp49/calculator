function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function divide(a, b) {
    return a / b;
}

function multiply(a, b) {
    return a * b;
}

function calculate(a, b, operator) {
    const operation = getOperation(operator);
    return operation(a, b);
}

function getOperation(operator) {
    switch (operator) {
        case "+":
            return add;

        case "-":
            return subtract;

        case "/":
            return divide;

        case "*":
            return multiply;
    }
}