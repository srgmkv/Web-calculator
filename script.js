const display = document.querySelector('#field');
const resField = document.querySelector('#result');
const numButtons = document.querySelectorAll('.num');
const acBut = document.querySelector('.ac');
const ceBut = document.querySelector('.ce');
const bsBut = document.querySelector('.bs');
const dotBut = document.querySelector('.dot');
const addBut = document.querySelector('.add');
const subBut = document.querySelector('.sub');
const divBut = document.querySelector('.div');
const mulBut = document.querySelector('.mul');
const resBut = document.querySelector('.res');
const sqrtBut = document.querySelector('.sqrt');
const byXbut = document.querySelector('.divbyx');

const isEqualFirst = () => resField.textContent[0] === '=';
const isLastDot = (str) => str[str.length - 1] === '.';
const isDot = (str) => str.indexOf('.') !== -1;

function toField() {

  if (resField.textContent === '0' || isEqualFirst()) {
    resField.textContent = '';
  }
  resField.textContent += this.textContent;

  resField.style.fontSize = resField.textContent.length > 17 ? '16px' : '';

  if (resField.textContent.length > 23) {
    resField.textContent = resField.textContent.substr(0, 23)
  }
};
numButtons.forEach(button => button.addEventListener('click', toField));

dotBut.onclick = () => {
  const resF = resField.textContent;
  if (resF === '' || isEqualFirst()) resField.textContent = '0';

  resField.textContent += '.';

  if (isDot(resF)) {
    resField.textContent = resF;
  }
};

acBut.onclick = () => {
  resField.style.fontSize = '';
  resField.textContent = '0';
  display.value = '';
};

ceBut.onclick = () => {
  resField.style.fontSize = '';
  resField.textContent = '0';
};

bsBut.onclick = () => {
  resField.textContent = resField.textContent.substr(0, resField.textContent.length - 1);
};

const mathTable = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '\xF7': (x, y) => x / y,
  '\xD7': (x, y) => x * y,
  '\u221A': (x, y) => Math.sqrt(x),
  'reciproc': (x, y) => 1 / x,
};

const fuun = (op) => {
  const resF = resField.textContent;
  const arr = display.value.split(' ').filter(el => el !== '');
  const val1 = arr[0];
  let val2 = isEqualFirst() ? resF.split(' ')[1] : resF;
  if (isLastDot(resF)) {
    val2 = resF.substr(0, resF.length - 1)
  }
  const prevOp = display.value.split(' ')[1];

  if (arr.length === 1 && !val2) {
    display.value = `${val1} ${op}`;
  }

  if (!val1 && val2) {
    display.value = `${val2} ${op}`;
  }
  if (arr.length === 2 && !val2) {
    display.value = `${val1} ${op}`;
  }
  resField.textContent = '';

  if (val1 && val2) {
    display.value = `${mathTable[prevOp](parseFloat(val1), parseFloat(val2))} ${op}`;
  }
  display.style.fontSize = (display.value.length > 17) ? '14px' : '';
};

addBut.onclick = () => fuun('+');

subBut.onclick = () => fuun('-');

divBut.onclick = () => fuun('\xF7');

mulBut.onclick = () => fuun('\xD7');

sqrtBut.onclick = () => fuun('\u221A');

byXbut.onclick= () => fuun('reciproc');

resBut.onclick = () => {
  const resF = resField.textContent;
  const val1 = parseFloat(display.value.split(' ')[0]);
  const val2 = parseFloat(resF);
  const operand = display.value.split(' ')[1];
  const result = mathTable[operand](val1, val2);
  display.value = '';
  resField.textContent = `= ${result}`;
  if (isNaN(result)) {
    resField.textContent = `= ${val1}`;
  }
  resField.textContent.length > 17 ? resField.style.fontSize = '14px' : resField.style.fontSize = '';
};
