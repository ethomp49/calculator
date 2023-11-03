document.querySelector(".buttons").addEventListener("click", (e) => buttonEventHandler(e));

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
    return Math.round(operation(a, b) * 1000) / 1000;
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
        const input = getInputDisplay();
        buttonFunction(input, button.id);
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

function giveNumber(currentInput, number) {
    if (hasResult()) {
        setResultDisplay('');
    }

    setInputDisplay(currentInput + number);        
}

function giveOperator(currentInput, operator) {
    let newInput;

    if (hasResult()) {
        newInput = getResult() + ` ${operator} `;
        setResultDisplay('');
    } else if (hasOperator(currentInput)) {  //case: "38 * "
        if (lastNumber(currentInput) === '') {
            newInput = currentInput.replace(
                getOperator(currentInput), operator);
        } else {
            const a = parseFloat(getA(currentInput))
                , b = parseFloat(getB(currentInput))
                , op = getOperator(currentInput);   
            newInput = calculate(a, b, op) + ` ${operator} `;
        }
    } else {
        newInput = currentInput + ` ${operator} `;
    }
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
    const a = parseFloat(getA(input));
    let result;
    if (hasOperator(input)) {
        const b = parseFloat(getB(input));
        const op = getOperator(input);
        result = calculate(a, b, op);
    } else {
        result = a;
    }
    setResultDisplay(`= ${result}`);
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