const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateBtn = document.getElementById('generate');
const resultEl = document.getElementById('result');
const copyBtn = document.getElementById('copy');


const CHARACTER_SETS = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+{}[]|:;<>,.?/~`'
};


function generatePassword() {
    const length = parseInt(lengthEl.value, 10);
    const includeUppercase = uppercaseEl.checked;
    const includeLowercase = lowercaseEl.checked;
    const includeNumbers = numbersEl.checked;
    const includeSymbols = symbolsEl.checked;

   
    let charPool = '';
    if (includeUppercase) charPool += CHARACTER_SETS.uppercase;
    if (includeLowercase) charPool += CHARACTER_SETS.lowercase;
    if (includeNumbers) charPool += CHARACTER_SETS.numbers;
    if (includeSymbols) charPool += CHARACTER_SETS.symbols;

   
    if (!charPool) {
        resultEl.value = 'Please select at least one option!';
        return;
    }

    
    const password = Array.from({ length }, () =>
        charPool.charAt(Math.floor(Math.random() * charPool.length))
    ).join('');

    resultEl.value = password;
}


function copy() {
    if (!resultEl.value) {
        showNotification('No password to copy!', 'error');
        return;
    }

    resultEl.select();
    document.execCommand('copy');
    showNotification('Password copied !', 'success');
}


function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('fade-out');
        notification.addEventListener('transitionend', () => notification.remove());
    }, 2000); 
}


generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copy);
