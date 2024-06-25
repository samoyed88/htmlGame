let sequence = [];
let userSequence = [];
let currentStep = 0;

window.onload = function() {
    injectStyles();
    startGame();
};

function injectStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #f0f0f0;
            margin: 0;
        }
        
        #game {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            background: white;
            padding: 4vw; /* Adjusted padding using viewport width units */
            border-radius: 10px;
            box-shadow: 0 0 2vw rgba(0, 0, 0, 0.1); /* Adjusted shadow using viewport width units */
            width: 90vw; /* Set maximum width relative to viewport width */
            max-width: 800px; /* Limit maximum width */
            height: 90vh; /* Set height relative to viewport height */
            max-height: 600px; /* Limit maximum height */
        }
        
        #question-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 90%; /* Adjusted width using percentage */
            margin-bottom: 3vw; /* Adjusted margin using viewport width units */
        }
        
        #question {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-left: 4vw; /* Adjusted margin using viewport width units */
        }
        
        #questionText {
            font-size: 2.5vw; /* Adjusted font size using viewport width units */
            margin-bottom: 1.5vw; /* Adjusted margin using viewport width units */
        }
        
        #numberDisplay {
            font-size: 3.5vw; /* Adjusted font size using viewport width units */
            margin-bottom: 3vw; /* Adjusted margin using viewport width units */
        }
        
        #number-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2vw; /* Adjusted gap using viewport width units */
            margin-right: 4vw; /* Adjusted margin using viewport width units */
        }
        
        .option {
            font-size: 2.5vw; /* Adjusted font size using viewport width units */
            padding: 2.5vw 5vw; /* Adjusted padding using viewport width units */
            border: 0.3vw solid #000; /* Adjusted border using viewport width units */
            border-radius: 1vw; /* Adjusted border radius using viewport width units */
            cursor: pointer;
            text-align: center;
        }
        
        .option:hover {
            background-color: #f0f0f0;
        }
        
        #message {
            margin-top: 3vw; /* Adjusted margin using viewport width units */
            font-size: 1.8vw; /* Adjusted font size using viewport width units */
        }
        
        #settingButton {
            margin-top: 3vw; /* Adjusted margin using viewport width units */
            font-size: 1.5vw; /* Adjusted font size using viewport width units */
            padding: 2.5vw 5vw; /* Adjusted padding using viewport width units */
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
}


function generateSequence(length) {
    sequence = [];
    let numbers = Array.from({ length: 9 }, (_, i) => i + 1); // 生成1到9的數字
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * numbers.length);
        sequence.push(numbers[randomIndex]);
        numbers.splice(randomIndex, 1); // 確保數字不重複
    }
}

function displaySequence() {
    const numberDisplay = document.getElementById('numberDisplay');
    numberDisplay.textContent = sequence.join('');
}

function hideSequence() {
    const numberDisplay = document.getElementById('numberDisplay');
    numberDisplay.textContent = '';
}

function displayOptions() {
    const numberContainer = document.getElementById('number-container');
    numberContainer.innerHTML = '';

    let numbers = Array.from({ length: 9 }, (_, i) => i + 1);
    shuffleArray(numbers);

    numbers.forEach(number => {
        let option = document.createElement('div');
        option.classList.add('option');
        option.textContent = number;
        option.onclick = () => checkNumber(number, option);
        numberContainer.appendChild(option);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startGame() {
    generateSequence(5); // 生成5個數字的序列
    displaySequence();
    displayOptions();
    document.getElementById('message').textContent = '';
    currentStep = 0;
    userSequence = [];

    setTimeout(hideSequence, 3000); // 3秒後隱藏數字
}

function checkNumber(num, optionElement) {
    if (sequence.length === 0) return;

    userSequence.push(num);
    if (userSequence[currentStep] === sequence[currentStep]) {
        optionElement.style.visibility = 'hidden'; // 隱藏已正確點選的數字
        if (currentStep === sequence.length - 1) {
            document.getElementById('message').textContent = '恭喜你，答對了！';
            document.getElementById('message').style.color = 'green';
        } else {
            currentStep++;
        }
    } else {
        document.getElementById('message').textContent = '抱歉，答錯了。再試一次！';
        document.getElementById('message').style.color = 'red';
        resetGame();
    }
}

function resetGame() {
    currentStep = 0;
    userSequence = [];
    const numberContainer = document.getElementById('number-container');
    const options = numberContainer.querySelectorAll('.option');
    options.forEach(option => option.style.visibility = 'visible'); // 恢復所有選項的顯示
    displaySequence(); // 重新顯示題目數字
    setTimeout(hideSequence, 3000); // 3秒後再次隱藏數字
}

function showInstructions() {
    alert('遊戲說明：\n1. 系統會展示一串數字。\n2. 3秒後數字會隱藏。\n3. 玩家需要點選左側的選項來重複這些數字序列。');
}
