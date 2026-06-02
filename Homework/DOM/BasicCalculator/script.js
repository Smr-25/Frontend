let buttons = document.querySelectorAll(".btn");
let result = document.getElementById("result");
buttons.forEach(button => {
    button.onclick = function (){
        let num1 = document.getElementById("num1").value;
        let num2 = document.getElementById("num2").value;
        if(button.innerText === "Sum") {
            result.value = `${Number(num1) + Number(num2)}`;
        }else if(button.innerText === "Subtract") {
            result.value = `${Number(num1) - Number(num2)}`;
        }else if(button.innerText === "Multiply") {
            result.value = `${Number(num1) * Number(num2)}`;
        }else if(button.innerText === "Divide") {
            if(Number(num2) === 0) {
                result.value = `Error: Division by zero`;
            } else {
                result.value = `${Number(num1) / Number(num2)}`;
            }
        }
    };
})
const num1Input = document.getElementById("num1");
const num2Input = document.getElementById("num2");
function autoSelect(input) {
    input.addEventListener("focus", () => {
        setTimeout(() => input.select(), 0);
    });
}

autoSelect(num1Input);
autoSelect(num2Input);

