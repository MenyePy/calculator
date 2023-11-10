const operations = {
    '+': (a, b) => a + b, 
    '-': (a, b) => a - b,
    '×': (a, b) => a * b,
    '÷': (a, b) => a / b,
}
const display = document.getElementById('display');
const currentOp = document.querySelector('#pre');
const topDisplay = document.querySelector('.top');
let numbers = [];
let ops = [];

function enter(n){
    if (display.textContent != 0){
        if (Number(n)){
            display.textContent += n.toString();
        }
    } else {
        display.textContent = n.toString();
    }
}

function special(n){
    if (n == 1){
        currentOp.textContent = '';
        display.textContent = 0;
        topDisplay.textContent = '...';
        numbers = [];
        ops = [];
    } else if (n == 2){
        if (display.textContent.length > 1){
            let ichi = display.textContent.split('');
            ichi.pop();
            display.textContent = ichi.join('');
        } else if (display.textContent != 0) {
            display.textContent = 0;
        } else {
            if (numbers.length == 0) {
                display.textContent = 0;
            } else {
                display.textContent = numbers.pop();
                ops.pop();
                if (ops.length > 0){
                    currentOp.textContent = ops.slice(-1);
                } else {
                    currentOp.textContent = '';
                }
                if (numbers.length > 0){
                    topDisplay.textContent = numbers.slice(-1);
                } else {
                    topDisplay.textContent = '...';
                }
            }
        }
    } else if (n == 3){
        display.textContent += '.';
    }
}

function operation(n){
    if (n == 1){
        numbers.push(parseFloat(display.textContent));
        ops.push('+');
        display.textContent += '+';
        currentOp.textContent = '+';
        topDisplay.textContent = numbers.slice(-1);
        display.textContent = 0;
    } else if (n == 2) {
        numbers.push(parseFloat(display.textContent));
        ops.push('-');
        display.textContent += '-';
        currentOp.textContent = '-';
        topDisplay.textContent = numbers.slice(-1);
        display.textContent = 0;
    } else if (n == 3){
        numbers.push(parseFloat(display.textContent));
        ops.push('×');
        display.textContent += '×';
        currentOp.textContent = '×';
        topDisplay.textContent = numbers.slice(-1);
        display.textContent = 0;
    } else if (n == 4){
        numbers.push(parseFloat(display.textContent));
        ops.push('÷');
        display.textContent += '÷';
        currentOp.textContent = '÷';
        topDisplay.textContent = numbers.slice(-1);
        display.textContent = 0;
    }
}

function operate(){
    numbers.push(parseFloat(display.textContent));
    while (numbers.length > 1){
        x = numbers.shift();
        y = numbers.shift();
        op = ops.shift();
        numbers.unshift(operations[op](x, y));
    }
    currentOp.textContent = '';
    display.textContent = numbers[0];
    topDisplay.textContent = '...';
    numbers = [];
    ops = [];
}