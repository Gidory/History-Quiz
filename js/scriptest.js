console.log("YEPPIE");
const blockConnections = new Map();
let answ1 = document.querySelector("#answer1");
let answ2 = document.querySelector("#answer2");
let answ3 = document.querySelector("#answer3");
let answ4 = document.querySelector("#answer4");
let answ12 = document.querySelector("#answer12");
let answ22 = document.querySelector("#answer22");
let answ32 = document.querySelector("#answer32");
let answ42 = document.querySelector("#answer42");
let answ123 = document.querySelector("#answer123");
let answ223 = document.querySelector("#answer223");
let answ323 = document.querySelector("#answer323");
let answ423 = document.querySelector("#answer423");
let question = document.querySelector("#question");
let question1 = document.querySelector("#question1");
let questnum = document.querySelector("#Vopros");
let testholder = document.querySelector("#testholder");
let testholder1 = document.querySelector("#testholder1");
let questionnum = parseInt(localStorage.getItem('questium'));
let testnumber = parseInt(localStorage.getItem('testnumbers'));
let itctv = document.querySelector("#ITC");
let SA = [];
let AC = [];
let counter1 = 0;
let counter2 = 0;
let FstAnswer;
let SndAnswer;
let TestInProgressity = true;
let CTCA = [];
let counter = 0;

if (!questionnum) {
  questionnum = 0;
}
if (!testnumber) {
  testnumber = 0;
}
let rumki = parseInt(localStorage.getItem('rumki'));
if (!rumki) {
  rumki = 0;
}
let TetsInProgress;
let Questions = [];
let Answers = [];
let Correct = [];

async function loadQuestions() {
  try {
    const response = await fetch('js/arrayOfQuestions_and_Answers.json');
    const data = await response.json();

    data.questions.forEach(item => {
      Questions.push(item);
    });
    data.answers.forEach(item1 => {
      Answers.push(item1);
    });
    data.correct_answers.forEach(item2 => {
      Correct.push(item2);         
    });

    console.log("Loaded Questions:", Questions);
    [answ1, answ2, answ3, answ4].forEach(button => {
      button.addEventListener("click", () => {
        handleAnswerClick(button.innerText);
      });
    });
    itctv.addEventListener("click", function(){
      ICTfunc(questionnum, testnumber);
    });
    TetsInProgress = setInterval(function(){
      if(!(questionnum>10)){
        TestProgress(questionnum, testnumber);
      }
    }, 10);
  } catch (error) {
    console.error('You fucked up here:', error);
  }
}
loadQuestions();
function ICTfunc(){
    DOIT(questionnum, testnumber, Correct);
    clearAllLines();
}
function TestProgress(i, b){
  let a = i+(11*b);

  if (!(questionnum>10) && !(questionnum==8)) {
    question.innerText = Questions[a];
    answ1.innerText = Answers[a][0];
    answ2.innerText = Answers[a][1];
    answ3.innerText = Answers[a][2];
    answ4.innerText = Answers[a][3];
    testholder.style.display = "flex";
    testholder1.style.display = "none";
  }
  if(questionnum==8){
    testholder.style.display = "none";
    testholder1.style.display = "flex";
    question1.innerText = Questions[a];
    answ12.innerText = Answers[a][0];
    answ22.innerText = Answers[a][1];
    answ32.innerText = Answers[a][2];
    answ42.innerText = Answers[a][3];
    answ123.innerText = Answers[a][4];
    answ223.innerText = Answers[a][5];
    answ323.innerText = Answers[a][6];
    answ423.innerText = Answers[a][7];
  }
  questnum.innerText = questionnum+1 +"/"+ 11;
  console.log(i);
}
function DOIT(i, b, c){
  let a = i+(11*b);
    const correctAnswer = c[a];
    console.log(correctAnswer);
    for (let index = 0; index < correctAnswer.length; index++) {
      if (CTCA.includes(correctAnswer[index])) {
        rumki += 0.25;
        console.log("FOUND DA CORRECT");
      } else {
        console.log("DIDN'T FIND DA CORRECT IDIOTO");
      }
    }
    SA.push(CTCA);
    localStorage.setItem("SAs", JSON.stringify(SA));
    questionnum++;
    console.log(rumki);
    if(TestInProgressity == true){
      localStorage.setItem('questium', questionnum);
      localStorage.setItem('rumki', rumki);
    }
}
function handleAnswerClick(answerText) {
    const correctAnswer = Correct[questionnum+(11*testnumber)];
    console.log(correctAnswer, answerText);
    SA.push(answerText);
    if (answerText === correctAnswer && !(questionnum>10)) {
      rumki++;
      console.log("correct");
      questionnum++;
      console.log(rumki);
    } else if(!(answerText === correctAnswer) && !(questionnum>10)) {
      console.log("incorrect");
      questionnum++;
    }
    if(TestInProgressity == true){
      localStorage.setItem('SAs', JSON.stringify(SA))
      localStorage.setItem('questium', questionnum);
      localStorage.setItem('rumki', rumki);
    }
    if(questionnum>10){
      console.log("The END!");
      testholder.style.display="none";
      clearInterval(TetsInProgress);
      window.location.href = 'results.html';
      localStorage.setItem('rumki', rumki);
      localStorage.setItem('questium', 0);
      TestInProgressity = false;
    }
}

let firstBlock = null;

function setupConnectionClicks() {
    const clickableAnswers = [
      answ12, answ22, answ32, answ42,
      answ123, answ223, answ323, answ423
    ];
  
    clickableAnswers.forEach(block => {
      if (block) {
        block.addEventListener('click', (event) => {
          event.stopPropagation(); 
          handleConnectionClick(block);
        });
      }
    });
}
//Awim bawe, awim bawe, awim bawe
function handleConnectionClick(block) {
  if (!firstBlock) {
      if (block.classList.contains('leftones')) {
          firstBlock = block;
          block.style.backgroundColor = 'green';
          FstAnswer = block.innerText;
      } else {
          console.log("Починати можна тільки з лівого блоку!");
      }
  } else {
      if (block.classList.contains('rightones')) {
          SndAnswer = block.innerText;
          drawLine(firstBlock, block);
          firstBlock.style.backgroundColor = '';
          firstBlock = null;

          counter++;
          if (counter >= 1) {
            const answer = FstAnswer + " - " + SndAnswer;
            let existingIndex = CTCA.findIndex(el => el.startsWith(FstAnswer + "/"));
            if (existingIndex !== -1) {
              CTCA[existingIndex] = answer;
              console.log(`Замінено відповідь на індексі ${existingIndex}:`, answer);
            } else {
              CTCA[counter1] = answer;
              counter1++;
              console.log(`Додано нову відповідь:`, answer);
            }
            counter = 0;
            console.log(CTCA);
            if(CTCA.length>=4){
              itctv.style.display = "block";
            }
          }
      } else {
          console.log("З'єднувати можна тільки з правим блоком!");
          firstBlock.style.backgroundColor = '';
          firstBlock = null;
      }
  }
}


function drawLine(block1, block2) {
  const svg = document.getElementById('svg-lines');

  function safelyRemoveConnections(block) {
      if (blockConnections.has(block)) {
          const lines = blockConnections.get(block);
          lines.forEach(line => {
              if (line && svg.contains(line)) {
                  svg.removeChild(line);
              }
          });
          blockConnections.delete(block);
      }
  }

  safelyRemoveConnections(block1);
  safelyRemoveConnections(block2);

  const rect1 = block1.getBoundingClientRect();
  const rect2 = block2.getBoundingClientRect();

  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  const pageWidth = document.body.scrollWidth;
  const pageHeight = document.body.scrollHeight;

  const absX1 = rect1.left + scrollX + rect1.width / 2;
  const absY1 = rect1.top + scrollY + rect1.height / 2;
  const absX2 = rect2.left + scrollX + rect2.width / 2;
  const absY2 = rect2.top + scrollY + rect2.height / 2;

  // Конвертуємо в відсотки
  const perX1 = (absX1 / pageWidth) * 100;
  const perY1 = (absY1 / pageHeight) * 100;
  const perX2 = (absX2 / pageWidth) * 100;
  const perY2 = (absY2 / pageHeight) * 100;

  const newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');

  // Встановлюємо через відсотки
  newLine.setAttribute('x1', `${perX1}%`);
  newLine.setAttribute('y1', `${perY1}%`);
  newLine.setAttribute('x2', `${perX2}%`);
  newLine.setAttribute('y2', `${perY2}%`);
  newLine.setAttribute('stroke', 'black');
  newLine.setAttribute('stroke-width', '2');
  newLine.style.pointerEvents = 'none';

  svg.appendChild(newLine);

  blockConnections.set(block1, [newLine]);
  blockConnections.set(block2, [newLine]);
}


setupConnectionClicks();
function clearAllLines() {
  const svg = document.getElementById('svg-lines');
  while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
  }
}