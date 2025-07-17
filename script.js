// Functions to do the calculator operations
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
    if (num2 === 0) {
        return "ERROR";
    }

    return num1 / num2;
}

// Choose the right operation
function operate(num1, operator, num2) {
    let result;

    switch (operator.trim()) {
        case "+":
            result = add(num1, num2);
            return result;
        case "—": // Subtraction symbol is a special character
            result = subtract(num1, num2)
            return result;
        case "×": //  Add symbol is a special character
            result = multiply(num1, num2)
            return result;
        case "÷":
            result = divide(num1, num2);
            return result;
        default:
            return "ERROR";
    }
}

// Stores the first number, the operator (+,-, etc) and the second number inserted by the user
let num1 = "";
let operator = "";
let num2 = "";

/*
Key to change between the first and second number to be inserted:
false = num1
true = num2
*/
let operatorClicked = false;

// Stores every digit button (0 ~ 9) in a NodeList
const displayContent = document.querySelector("p");
const digitButtons = document.querySelectorAll(".digitButton");

// Changes the display content and stores first or second number when pressed a digit button
digitButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (displayContent.textContent.length === 13) return;

        if (displayContent.textContent === "0" && button.textContent === "0") { return; };

        if (displayContent.textContent === "0" && button.textContent != "0") {
            num1 = button.textContent;
            console.log(num1);
            displayContent.textContent = button.textContent;
            return;
        };

        if (displayContent.textContent === "ERROR") {
            displayContent.textContent = "";
            num1 = "";
        };
        if (operatorClicked === false) {
            num1 += button.textContent;
            //console.log(`num1: ${num1}`);
        }
        if (operatorClicked === true) {
            num2 += button.textContent;
            //console.log(`num2: ${num2}`);
        }
        displayContent.textContent += `${button.textContent}`;
    });
});

// "." button
const dotButton = document.querySelector(".dotButton");
dotButton.addEventListener("click", () => {
    if (displayContent.textContent === "ERROR") {
        displayContent.textContent = "";
    }

    // Constraint to not allow more than one dot in the screen and put "0." when there is no number in the calculator
    if (!operatorClicked) {
        if (num1.includes(".") === false) {
            if (num1 === "" && displayContent.textContent === "") {
                num1 = "0.";
                displayContent.textContent += "0.";

            } else if (num1 === "" && displayContent.textContent === "0") {
                num1 += "0.";
                displayContent.textContent += ".";
            } else {
                num1 += ".";
                displayContent.textContent += ".";
            }
        }
    } else {
        if (num2.includes(".") === false) {
            if (num2 === "") {
                num2 = "0.";
                displayContent.textContent += "0.";
            } else {
                num2 += ".";
                displayContent.textContent += ".";
            }
        }
    }
});

// Saves the operator button content in the "operator" variable
const operatorButtons = document.querySelectorAll(".operatorButton");
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (num1 === "") return;

        operatorClicked = true;

        num2 = "";
        displayContent.textContent = "";
        //console.log(operatorClicked);

        operator = button.textContent;
    });
});

// "=" button
const equalButton = document.querySelector(".equalButton");
equalButton.addEventListener("click", () => {
    if (!operatorClicked) return;

    if (num2 === "") {
        num1 = "";
        operatorClicked = false;
        displayContent.textContent = "ERROR";
        return
    }

    operatorClicked = false;
    //console.log(operatorClicked);


    // Transform num1 and num2 into float number to make the mathematical operations
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    let result = operate(n1, operator, n2);

    // Reset the operation if there is an error
    if (result === "ERROR" || isNaN(result)) {
        displayContent.textContent = "ERROR";
        num1 = "";
        num2 = "";
        operator = "";
        return;
    }

    // Removes every garbage digit after the dot, e.g, "4.000" to "4" or "3.123000" to "3.123"
    if (Number.isInteger(result)) {
        displayContent.textContent = result.toString().slice(0, 13);
    } else {
        displayContent.textContent = parseFloat(result.toFixed(3)).toString().slice(0, 13);
    }

    // Stores the result into num1 to continue new operations
    num1 = result.toString().slice(0, 13);
    num2 = "";
    //console.log(`num1: ${num1}`);
});

// "C", clear button. Resets everything.
const clearButton = document.querySelector("#clearButton");
clearButton.addEventListener("click", () => {
    displayContent.textContent = "0";

    num1 = "";
    num2 = "";
    operator = "";
    result = "";
    //console.log(`num1: ${num1}`);

    operatorClicked = false;
});

// "DEL" button, deletes the digit on the right.
const deleteButton = document.querySelector("#deleteButton");
deleteButton.addEventListener("click", () => {
    if (displayContent.textContent === "ERROR") return;

    // Removes the last digit typed and transform the content on screen into 0 if there is no more digit to delete.
    if (!operatorClicked) {
        num1 = num1.slice(0, -1);
        displayContent.textContent = num1 || 0;
    } else {
        num2 = num2.slice(0, -1);
        displayContent.textContent = num2 || 0;
    }
});