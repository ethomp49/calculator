document.querySelector(".num-buttons").addEventListener("click", (e) => buttonEventHandler(e));

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
    const button = e.target;
    const buttonFunction = getButtonFunction(button.id);
    if (!(buttonFunction === undefined)) {
        buttonFunction(button.id);
    }
}



function getButtonFunction(id) {
    switch (id) {
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
            return giveNumber;

        case ".":
            return giveDecimal;

        case "/":
        case "*":
        case "-":
        case "+":
            return giveOperator;

        case "=":
            return giveEquals;
    }
}

function giveNumber(number) {
    const currentInput = getDisplayInput();
    const newInput = (currentInput !== '0') ? 
        currentInput + number :
        number;
    setDisplayInput(newInput);        
}

function giveOperator(operator) {
    const currentInput = getDisplayInput();
    const newInput = (currentInput.search(/[-+/*]/) === -1) ?
        currentInput + ` ${operator} ` :
        currentInput.replace(/[-+/*]/, operator);

    setDisplayInput(newInput);
}

function giveDecimal() {

}

function giveEquals() {

}

function getDisplayInput() {
    return document.querySelector(".input-display").textContent;
}

function setDisplayInput(input) {
    document.querySelector(".input-display").textContent = input;
}
