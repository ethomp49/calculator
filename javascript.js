document.querySelector(".buttons").addEventListener("click", (e) => eventHandler(e.target.id));

document.addEventListener("keydown", (e) => eventHandler(e.key));

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function divide(a, b) {
    if (b === 0) {
        return "Error";
    }
    return a / b;
}

function multiply(a, b) {
    return a * b;
}

function calculate(a, b, operator) {
    const operation = getOperation(operator);
    const result = operation(a,b);
    return (result === "Error") ?
        result :
        Math.round(result * 1000) / 1000;
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

function eventHandler(e) {
    const buttonFunction = getButtonFunction(e);
    if (!(buttonFunction === undefined)) {
        const input = getInputDisplay();
        buttonFunction(input, e);
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
        case "Enter":
            return giveEquals;

        case "clear":
        case "Escape":
            return clearDisplay;
    }
}

function giveNumber(currentInput, number) {
    if (hasResult()) {
        setResultDisplay('');
        setInputDisplay(number);
    } else {
        setInputDisplay(currentInput + number);
    }
}

function giveOperator(currentInput, operator) {
    const result = calcResult(currentInput);
    let newInput = (result === "Error") ?
            '':
            result + ` ${operator} `;
    setResultDisplay('');
    setInputDisplay(newInput);
}

function giveDecimal(currentInput) {
    if (hasResult()) {
        setResultDisplay('');
        setInputDisplay('0.');
    } else if (noDecimal(currentInput)) {
        setInputDisplay((lastNumber(currentInput) === '') ?
            currentInput + "0." :
            currentInput + ".");
    }
}

function giveEquals(input) {
    const result = calcResult(input);
    setResultDisplay(`= ${result}`);
    return result;
}

function getInputDisplay() {
    return document.querySelector(".input-display").textContent;
}

function setInputDisplay(input) {
    document.querySelector(".input-display").textContent = input;
}

function hasOperator(input) {
    return input.search(/[-+/*]/) >= 0;
}

function getOperator(input) {
    return input.split(" ")[1];
}

function getA(input) {
    return input.split(" ")[0];
}

function getB(input) {
    return input.split(" ")[2];
}

function setResultDisplay(string) {
    document.querySelector(".result-display").textContent = string;
}

function hasResult() {
    return !(getResultDisplay() === '');
}

function getResultDisplay() {
    return document.querySelector(".result-display").textContent;
}

function getResult() {
    return getResultDisplay().split(" ")[1];
}

function noDecimal(input) {
    return !(lastNumber(input).includes("."));
}

function lastNumber(input) {
    const pieces = input.split(" ");
    return pieces[pieces.length - 1];
}

function calcResult(input) {
    const a = parseFloat(getA(input));
    if (hasOperator(input)) {    
        const b = parseFloat(getB(input));
        const op = getOperator(input);
        if (isNaN(b)) { //ex: "38 * ''"
            return a;
        }

        return calculate(a, b, op);
    }
    return a;
}

function clearDisplay() {
    setInputDisplay('');
    setResultDisplay('');
}