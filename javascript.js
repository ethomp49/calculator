document.querySelector(".num-buttons").addEventListener("click", buttonEventHandler);

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

function buttonEventHandler(e) {
    switch (e.target.id) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case ".":
            console.log("number");
            break;
        case "/":
        case "*":
        case "-":
        case "+":
            console.log("operator");
            break;
        case "=":
            console.log("equals");
            break;
    }
}