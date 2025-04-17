
console.log("YEPPIE");
let answ1 = document.querySelector("#answer1");
let answ2 = document.querySelector("#answer2");
let answ3 = document.querySelector("#answer3");
let answ4 = document.querySelector("#answer4");
let question = document.querySelector("#question");
let questnum = document.querySelector("#Vopros");
let testholder = document.querySelector("#testholder");
let questionnum = 0;
let testnumber = localStorage.getItem('testnumbers');
let TetsInProgress;
let Questions = [];
  let Answers = [];
  let Correct = [];
  
//В синіх тегах писати, питання і відповіді. Залежачи від масиву. Пурпурні(рожевих.. не знаю фіолетових), це складова номера
// тесту. Жовтий це сам масив(увесь).
async function loadQuestions() {
  try {
    const response = await fetch('js/arrayOfQuestions_and_Answers.json');
    const data = await response.json();

    data.questions.forEach(item => {
      Questions.push(item);
    });
    data.answers.forEach(item1 => {
      Answers.push(item1);
    })
    data.correct_answers.forEach(item2 => {
      Correct.push(item2);         
    });

    console.log("Loaded Questions:", Questions);
     // Викликаємо тільки коли завантаження завершене
     [answ1, answ2, answ3, answ4].forEach(button => {
      button.addEventListener("click", () => {
        handleAnswerClick(button.innerText);
      });
    });
    TetsInProgress = setInterval(function(){
      if(!(questionnum>9)){
        TestProgress(questionnum, testnumber);
      }
    }, 10);
  } catch (error) {
    console.error('You fucked up here:', error);
  }
}
loadQuestions();
function TestProgress(i, b){
  let a = i+(10*b);
  if (!(questionnum>9)) {
    question.innerText = Questions[a];
    answ1.innerText = Answers[a][0];
    answ2.innerText = Answers[a][1];
    answ3.innerText = Answers[a][2];
    answ4.innerText = Answers[a][3];
  }
    questnum.innerText = questionnum+1 +"/"+ 10;
    console.log(i);
}
function handleAnswerClick(answerText) {
    const correctAnswer = Correct[questionnum+(10*testnumber)];
    console.log(correctAnswer, answerText);
    if (answerText === correctAnswer&&!(questionnum>9)) {
      rumki++;
      console.log("correct");
      questionnum++;
      console.log(rumki);
    } else if(!(answerText === correctAnswer)&&!(questionnum>9)) {
      console.log("incorrect");
      questionnum++;
    }
    if(questionnum>9){
      console.log("The END!")
      testholder.style.display="none";
      clearInterval(TetsInProgress);
      window.location.href = 'results.html';
      localStorage.setItem('rumki', 0);
    }
  }
  
  // Event listeners