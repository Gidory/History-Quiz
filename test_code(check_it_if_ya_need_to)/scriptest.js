console.log("YEPPIE");
let answ1 = document.querySelector("#answer1");
let answ2 = document.querySelector("#answer2");
let answ3 = document.querySelector("#answer3");
let answ4 = document.querySelector("#answer4");
let question = document.querySelector("#question");
let questionnum = 0;
let rumki = 0;
let testnumber = 0;
let Questions = [
[
    "Who are You?",
], 
[

], 
[

], 
[

]
];
let Answers = [[["An Idiot1", "An Idiot2", "An Idiot3", "An Idiot4"], [], [], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], [], [], []], 
[[], [], [], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], [], [], []]];
let Correct = [[["An Idiot2", ], [], [], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], [], [], []], 
[[], [], [], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], [], [], []]];

let TetsInProgress = setInterval(function(){
    TestProgress(questionnum, testnumber);
}, 10);
function TestProgress(i, b){
    question.innerText = Questions[b][i];
    answ1.innerText = Answers[b][i][0];
    answ2.innerText = Answers[b][i][1];
    answ3.innerText = Answers[b][i][2];
    answ4.innerText = Answers[b][i][3];
}
function handleAnswerClick(answerText) {
    const correctAnswer = Correct[testnumber][questionnum][0];
    console.log(correctAnswer, answerText);
    if (answerText === correctAnswer) {
      rumki++;
      console.log("correct");
      console.log(rumki);
    } else {
      console.log("incorrect");
    }
  }
  
  // Event listeners
  [answ1, answ2, answ3, answ4].forEach(button => {
    button.addEventListener("click", () => {
      handleAnswerClick(button.innerText);
    });
  });