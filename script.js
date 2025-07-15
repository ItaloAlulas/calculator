function add(num1, num2) {
    return num1 + num2;
};

function subtract(num1, num2) {
    return num1 - num2;
};

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(num1, operator, num2) {
    let result;

    switch (operator) {
        case "+":
            result = add(num1, num2);
            return result;
        case "-":
            result = subtract(num1, num2)
            return result;
        case "×":
            result = multiply(num1, num2)
            return result;
        case "÷":
            result = divide(num1, num2);
            return result;
    }
}

let num1 = "";
let operator = "";
let num2 = "";

let operatorClicked = false;

const displayContent = document.querySelector("p");
const digitButtons = document.querySelectorAll(".digitButton");

// Changes the display content when pressed a digit button
digitButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (operatorClicked === false) {
            num1 += button.textContent;
            console.log(`num1: ${num1}`);
        }
        if (operatorClicked === true) {
            num2 += button.textContent;
            console.log(`num2: ${num2}`);
        }
        displayContent.textContent += `${button.textContent}`;
    });
});

// Saves the operator button content in the "operator" variable
const operatorButtons = document.querySelectorAll(".operatorButton");
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        operatorClicked = operatorClicked === false ? true : false;
        displayContent.textContent = "";
        console.log(operatorClicked);
        operator = button.textContent;
    })
});

const equalButton = document.querySelector(".equalButton");
equalButton.addEventListener("click", () => {
    operatorClicked = operatorClicked === false ? true : false;
    console.log(operatorClicked);
    num2 = parseFloat(num2);
    result = operate(num1, operator, num2);
    displayContent.textContent = `${result}`;
    num1 = result;
    num2 = "";
    console.log(`num1: ${num1}`);
})

const clearButton = document.querySelector("#clearButton");
clearButton.addEventListener("click", () => {
    displayContent.textContent = "";

    if (operatorClicked === false) {
        num1 = 0;
    } else {
        num2 = 0;
    }
});