const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

let displayValue='0'; //* Hiç sayı girilmediğinde veya uygulama resetlendiğinde gösterilen değer.
let firstValue = null; //* İlk gelen değer.
let operator = null; //* Gelen operatorün tutulduğu değişken.
let secondValue = false; //* İkinci bir değerin beklenip beklenmediğini kontol ettiğimiz değişken.

updateDisplay();

//* Son kullanıcının butonlar aracılığı ile girmek istediği sayıların güncellendiği kısım.
function updateDisplay() {
    display.value = displayValue;   
}

//* Bir click eventi ekliyoruz ve değerini alıyoruz.
keys.addEventListener('click',function(e) {
    const element = e.target;

    if(!element.matches('button')) return; //* Kullanıcının tıklamış olduğu alanın button mu olduğunu kontrol ettiğimiz kısım.

    if(element.classList.contains('operator')) {
        //console.log("operator",element.value);
        handleOperator(element.value);
        updateDisplay();
        return;
    }
    if(element.classList.contains('decimal')) {
        //console.log("decimal",element.value);
        inputDecimal();
        updateDisplay();
        return;
    }
    if(element.classList.contains('clear')) {
        //console.log("clear",element.value);
        inputClear();
        updateDisplay();
        return;
    }
    //console.log("number ",element.value)
    inputNumber(element.value);
    updateDisplay();
})

function inputNumber(num) {
    if(secondValue) {
        displayValue = num;
        secondValue = false;
    }
    else 
    {
        displayValue = displayValue === '0'? num: displayValue + num;
    }
    //* 1'den fazla basamak yazdırmak için kullandığımız kısım. 
}

//* Decimal değerleri yazabilmek için nokta ifadesinin kullanıldığı fonk.
function inputDecimal() {
    if(!displayValue.includes('.')) { displayValue += '.';};
}
//* AC butonunun çalışmasını sağladığımız kısım.
function inputClear() {
    if(!displayValue=='0') {
        displayValue = '0';
    }
}

//!! HESAPLAMALARIN YAPILDIĞI KISIM..

function handleOperator(nextoperator) {
    const value = parseFloat(displayValue);

    if(operator && secondValue) {
        operator = nextoperator;
        return;
    }    

    if(firstValue === null) {
        firstValue = value;
    }
    else if(operator) {
        const result = calculate(firstValue,value,operator);
        displayValue = String(result);
        firstValue = result;
    }
    secondValue = true;
    operator = nextoperator;
}

function calculate(first,second,op) {
    if(op == '+') {
        return first + second;
    }
    else if(op =='-') {
        return first - second;
    }
    else if(op =='*') {
        return first * second;
    }
    else if(op =='/') {
        return first / second;
    }
    
    return second;
}