console.log("YEPPIE");
let answ1 = document.querySelector("#answer1");
let answ2 = document.querySelector("#answer2");
let answ3 = document.querySelector("#answer3");
let answ4 = document.querySelector("#answer4");
let question = document.querySelector("#question");
let questnum = document.querySelector("#Vopros");
let testholder = document.querySelector("#testholder");
let questionnum = 0;
let rumki = 0;
let testnumber = 0;
//В синіх тегах писати, питання і відповіді. Залежачи від масиву. Пурпурні(рожевих.. не знаю фіолетових), це складова номера
// тесту. Жовтий це сам масив(увесь).
fetch('json/arrayOfQuestions_and_Answers.json')
.then(response => response.json())
.then(data => {

});

let Questions = [
[  "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "test"], ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"], ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"], ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"]
];
let Answers = [[["An Idiot1", "An Idiot2", "An Idiot3", "An Idiot4"], [], [], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], [], [], []], 
[[], [], [], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], [], [], []]];
let Correct = [["An Idiot2", "", "", "", "", "", "", "", "", ""], ["An Idiot2", "", "", "", "", "", "", "", "", ""], 
["An Idiot2", "", "", "", "", "", "", "", "", ""], ["An Idiot2", "", "", "", "", "", "", "", "", ""]];

let TetsInProgress = setInterval(function(){
  if(!(questionnum>9)){
    TestProgress(questionnum, testnumber);
  }
}, 10);
function TestProgress(i, b){
    question.innerText = Questions[b][i];
    answ1.innerText = Answers[b][i][0];
    answ2.innerText = Answers[b][i][1];
    answ3.innerText = Answers[b][i][2];
    answ4.innerText = Answers[b][i][3];
    questnum.innerText = questionnum+1 +"/"+ Answers[b].length;
    console.log(i);
}
function handleAnswerClick(answerText) {
    const correctAnswer = Correct[testnumber][questionnum];
    console.log(correctAnswer, answerText);
    if (answerText === correctAnswer&&!(questionnum>=9)) {
      rumki++;
      console.log("correct");
      console.log(rumki);
      questionnum++;
    } else if(!(answerText === correctAnswer)&&!(questionnum>=9)) {
      console.log("incorrect");
      questionnum++;
    } else if(questionnum>=9){
      console.log("The END!")
      testholder.style.display="none";
      clearInterval(TetsInProgress);
    }
  }
  
  // Event listeners
  [answ1, answ2, answ3, answ4].forEach(button => {
    button.addEventListener("click", () => {
      handleAnswerClick(button.innerText);
    });
  });