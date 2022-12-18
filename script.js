"use strict";

const clearBtn = document.getElementById("clear");
const deleteBtn = document.getElementById("delete");
const operatorBtns = document.querySelectorAll("#operator");
const numberBtns = document.querySelectorAll("#number");
const equalsBtn = document.getElementById("equals");
const display = document.getElementById("display-text");
let count = 0;
let dpCount = 1;
let opCount = 0;
let equalsBtnCounter = 0;
let inputArray = [];
let ansArray = [];

const selectNumber = (event) => {
  const op = /[+−×÷]/g;
  if (
    ansArray.length > 0 &&
    display.innerText !== "" &&
    op.test(display.innerText) === false
  ) {
    return;
  }
  let number = event.target.value;
  displayValue(number);
};

const selectOperator = (event) => {
  let operator = event.target.value;
  if (ansArray.length > 0) {
    if (opCount === 0) {
      display.innerText = "";
      displayValue(operator);
      opCount++;
    } else if (opCount > 0) {
      displayValue(operator);
    }
  } else if (
    display.innerText.length <= 6 &&
    display.innerText !== "" &&
    ansArray.length === 0
  ) {
    displayValue(operator);
  }
};

const displayValue = (input) => {
  deleteBtn.addEventListener("click", deleteDisplayValue);
  equalsBtn.addEventListener("click", operate);
  if (ansArray.length > 0) {
    const num = /[0-9]/;
    const dot = /\./;
    const sym = /[+−×÷\.]/;
    if (
      num.test(display.innerText) === true &&
      dot.test(display.innerText) === true &&
      sym.test(display.innerText) === true
    ) {
      if (
        display.innerText.match(/\./g).length === 1 &&
        display.innerText.match(/[0-9]/g).length === 4 &&
        display.innerText.match(/[+−×÷]/g).length === 3
      ) {
        return;
      }
    }
  }
  if (
    display.innerText.length <= 7 ||
    (display.innerText.length <= 7 &&
      display.innerText.match(/\./g).length <= 2) ||
    (display.innerText.length <= 8 &&
      !display.innerText.match(/[+−×÷\.]/).length === 2) ||
    (display.innerText.length <= 8 &&
      display.innerText.match(/[+−×÷\.]/g).length === 3) ||
    (display.innerText.length === 8 &&
      display.innerText.match(/[+−×÷\.]/g).length === 4)
  ) {
    let exp = /\./;
    let lastChar = display.innerText.charAt(display.innerText.length - 1);
    if (
      display.innerText.length === 8 &&
      exp.test(display.innerText) === true &&
      display.innerText.match(/[+−×÷]/g).length === 2
    ) {
      if (display.innerText.match(/\./g).length === 1) {
        return;
      }
    } else if (input.match(/[0-9]/)) {
      let secondToLastChar = display.innerText.charAt(
        display.innerText.length - 2
      );
      if (secondToLastChar === "." || dpCount >= 2) {
        if (dpCount === 1) {
          display.innerText += `${input}`;
          dpCount++;
          return;
        } else if (dpCount >= 2) {
          return;
        }
      }
    } else if (
      input === "+" ||
      input === "−" ||
      input === "×" ||
      input === "÷" ||
      input === "."
    ) {
      if (input === lastChar) {
        return;
      } else if (
        (lastChar === "" && !ansArray === 0) ||
        lastChar === "+" ||
        lastChar === "−" ||
        lastChar === "×" ||
        lastChar === "÷" ||
        lastChar === "."
      ) {
        return;
      } else if (input === ".") {
        count++;
        if (
          display.innerText.length === 8 &&
          display.innerText.match(/[+−×÷\.]/g).length === 3
        ) {
          return;
        } else if (count >= 1) {
          let secondToLastChar = display.innerText.charAt(
            display.innerText.length - 2
          );
          let thirdToLast = display.innerText.charAt(
            display.innerText.length - 3
          );
          if (secondToLastChar === "." || thirdToLast === ".") {
            return;
          } else if (count >= 2) {
            if (display.innerText.match(/\./g).length === 2) {
              return;
            } else if (display.innerText.match(/\./g).length === 1) {
              display.innerText += `${input}`;
              return;
            }
            return;
          }
        }
      } else if (
        input === "+" ||
        input === "−" ||
        input === "×" ||
        input === "÷"
      ) {
        count = 0;
        dpCount = 1;
      }
    }
    display.innerText += `${input}`;
  }
};

const add = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};

const multiply = (a, b) => {
  return a * b;
};

const divide = (a, b) => {
  return a / b;
};

const operate = (operator) => {
  equalsBtnCounter++;
  let counter = 0;
  let result = 0;
  let ans = 0;
  let lastCharacter = display.innerText.charAt(display.innerText.length - 1);
  if (
    lastCharacter === "" ||
    lastCharacter === "+" ||
    lastCharacter === "−" ||
    lastCharacter === "×" ||
    lastCharacter === "÷" ||
    lastCharacter === "."
  ) {
    return;
  }
  inputArray = ansArray.concat(
    display.innerText.split(/([+−×÷])/).filter((item) => item)
  );
  ansArray = [];
  inputArray.forEach((input, index) => {
    result = 0;
    if (counter === 0) {
      if (input === "+") {
        result = add(+inputArray[index - 1], +inputArray[index + 1]);
        console.log(result);
        counter++;
        ans = result;
      } else if (input === "−") {
        result = subtract(+inputArray[index - 1], +inputArray[index + 1]);
        console.log(result);
        counter++;
        ans = result;
      } else if (input === "×") {
        result = multiply(inputArray[index - 1], inputArray[index + 1]);
        console.log(result);
        counter++;
        ans = result;
      } else if (input === "÷") {
        result = divide(inputArray[index - 1], inputArray[index + 1]);
        console.log(result);
        counter++;
        ans = result;
      }
    } else if (counter > 0) {
      if (input === "+") {
        result = add(+ans, +inputArray[index + 1]);
        console.log(result);
        counter++;
        ans = result;
      } else if (input === "−") {
        result = subtract(+ans, +inputArray[index + 1]);
        console.log(result);
        counter++;
        ans = result;
      } else if (input === "×") {
        result = multiply(ans, inputArray[index + 1]);
        console.log(result);
        counter++;
        ans = result;
      } else if (input === "÷") {
        result = divide(ans, inputArray[index + 1]);
        console.log(result);
        counter++;
        ans = result;
      }
    }
  });
  console.log(ans);
  let point = /\./;
  let finalAns = ans;
  if (
    point.test(ans) === true &&
    ans.toString().charAt(ans.toString().length - 2) === "."
  ) {
    finalAns = finalAns.toFixed(1);
    display.innerText = finalAns;
    console.log(finalAns);
    inputArray = [];
    opCount = 0;
    ansArray.push(finalAns);
    console.log(ansArray[0]);
    deleteBtn.removeEventListener("click", deleteDisplayValue);
    equalsBtn.removeEventListener("click", operate);
  } else if (
    point.test(ans) === true &&
    ans.toString().charAt(ans.toString().length - 2) !== "."
  ) {
    finalAns = finalAns.toFixed(2);
    display.innerText = finalAns;
    console.log(finalAns);
    inputArray = [];
    opCount = 0;
    ansArray.push(finalAns);
    console.log(ansArray[0]);
    deleteBtn.removeEventListener("click", deleteDisplayValue);
    equalsBtn.removeEventListener("click", operate);
  } else {
    display.innerText = finalAns;
    console.log(finalAns);
    inputArray = [];
    opCount = 0;
    ansArray.push(finalAns);
    console.log(ansArray[0]);
    deleteBtn.removeEventListener("click", deleteDisplayValue);
    equalsBtn.removeEventListener("click", operate);
  }
};

const clearDisplayText = () => {
  display.innerText = "";
  count = 0;
  dpCount = 1;
  inputArray = [];
  ansArray = [];
};

const deleteDisplayValue = () => {
  display.innerText = display.innerText.substring(
    0,
    display.innerText.length - 1
  );
  dpCount = 1;
  let exp = /\./;
  if (display.innerText.length === 1 || exp.test(display.innerText) === false) {
    count = 0;
    let Arr = display.innerText.split(/([+−×÷])/);
    console.log(Arr);
    return;
  }
  count = 1;
  let Arr = display.innerText.split(/([+−×÷])/);
  console.log(Arr);
};

operatorBtns.forEach((button) => {
  button.addEventListener("click", selectOperator);
});
numberBtns.forEach((button) => {
  button.addEventListener("click", selectNumber);
});
clearBtn.addEventListener("click", clearDisplayText);
deleteBtn.addEventListener("click", deleteDisplayValue);
equalsBtn.addEventListener("click", operate);
