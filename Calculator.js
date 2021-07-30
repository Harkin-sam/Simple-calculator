const display1num = document.querySelector(".display1");
const display2num = document.querySelector(".display2");
const tempResult = document.querySelector(".temp-result");
const allNumbers = document.querySelectorAll(".number");
const allOperators = document.querySelectorAll(".operator");
const clearScreen = document.querySelector(".clear-all");
const clearLastElement = document.querySelector(".clear-last-element");
const equalsEl = document.querySelector(".equals");


let disNum1 = "";
let disNum2 = "";
let result = null;
let lastOperation = "";
let haveDot = false;


allNumbers.forEach((num) => {
    num.addEventListener("click", (e) =>{
        if( e.target.innerText === "." && !haveDot){
            haveDot = true;      // to set prior value of "haveDot"for the first dot input
        } else if( e.target.innerText === "." && haveDot){
            return;                // to trigger return or stop since it already has a dot
        }
        disNum2 += e.target.innerText;
        display2num.innerText = disNum2; // to show in the display
    })
})

allOperators.forEach((operator) =>{
    operator.addEventListener("click",(e) =>{
        if(!disNum2) return;
        haveDot = false;
        const operationName = e.target.innerText;
        if(disNum2 && disNum1 && lastOperation){
            mathOperation();
        } else {
            result = parseFloat(disNum2);
        }
        clearVal(operationName);
        lastOperation = operationName;
        console.log(result);
    })
})

function mathOperation(){
    if(lastOperation === "*"){
        result = parseFloat(result) * parseFloat(disNum2);
    }   else if (lastOperation === "+"){
        result = parseFloat(result) + parseFloat(disNum2);
    }   else if (lastOperation === "-"){
        result = parseFloat(result) - parseFloat(disNum2);
    }   else if (lastOperation === "/"){
        result = parseFloat(result) / parseFloat(disNum2);
    } 

}

function clearVal(name = ""){
    disNum1 += disNum2 + " " + name + " ";
    display1num.innerText = disNum1;
    display2num.innerText = "";
    disNum2 = "";
    tempResult.innerText = result;
}

equalsEl.addEventListener("click", () =>{
    if (!disNum2 || !disNum1) return;
    haveDot = false;
    mathOperation();
    clearVal();
    display2num.innerText = result;
    tempResult.innerText = "";
    disNum2 = result;
    disNum1 = "";
})

clearScreen.addEventListener("click", () =>{
    display1num.innerText = "";
    display2num.innerText = "";
    tempResult.innerText = "";
    result = "";
    disNum2 = "";
    disNum1 = "";
})


clearLastElement.addEventListener("click", () =>{
    display2num.innerText = "";
    disNum2 = "";
})

// to create input by keyboard to match the click function

window.addEventListener("keydown", (e) =>{
    if (e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9"){
            makeClick(e.key);
        }
    else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key ==="*"){
            makeOperatorsClick(e.key);
    }
    else if ( e.key === "=" || e.key == "enter"){
        makeEqualsClick();    
    }
})

function makeClick(key){
    allNumbers.forEach((numButton) => {
        if (numButton.innerText === key){
            numButton.click();
        }
    })
}

function makeOperatorsClick(key){
    allOperators.forEach((opButton) =>{
        if(opButton.innerText === key){
            opButton.click()
        }
    })
}

function makeEqualsClick(){
    equalsEl.click();
}