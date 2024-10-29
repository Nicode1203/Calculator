let resultField = document.querySelector(".display");
let firstNumber = "";
let operator = "";
let isResult = false; 

function add(num1, num2) {
    return num1 + num2;
}

function substract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num1 === 0) {
        return "can't divide by 0";
    } else {
        return num1 / num2;
    }
}

function appendValue(value) {
    if (isResult) {
        resultField.value = value; // Resets Display
        isResult = false; // Resets value of isResult
    } else {
        if (resultField.value === "0" || resultField.value === "") {
            resultField.value = value; 
        } else {
            if (value === '.' && resultField.value.includes('.')) {
                return; 
            }
            resultField.value += value; 
        }
    }
}

function setOperator(op) {
    if (firstNumber === "") {
        firstNumber = parseFloat(resultField.value); 
    } else {
        
        firstNumber = calculate(firstNumber, parseFloat(resultField.value), operator);
    }
    operator = op; // 
    resultField.value = ""; 
    isResult = false; 
}

function calculate(num1, num2, op) {
    switch (op) {
        case '+':
            return add(num1, num2);
        case '-':
            return substract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return num1; 
    }
}

function result() {
    if (firstNumber !== "" && operator !== "" && resultField.value !== "") {
        let resultado = calculate(firstNumber, parseFloat(resultField.value), operator);
        resultField.value = resultado; 
        firstNumber = ""; 
        operator = "";
        isResult = true; 
    }
}

function clearDisplay() {
    resultField.value = "0"; 
    firstNumber = "";
    operator = "";
    isResult = false; 
}

//DOM events for buttons
document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            if (button.classList.contains("operator")) {
                if (button.textContent === "=") {
                    result(); // Calls result()
                } else if (button.textContent === "C") {
                    clearDisplay(); // Calls clearDisplay() to clear the screen
                } else {
                    setOperator(button.textContent); 
                }
            } else {
                appendValue(button.textContent); 
            }
        });
    });
});
