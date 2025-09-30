document.addEventListener("DOMContentLoaded", async function() {
    console.log("script.js loaded");

    let rumkis = localStorage.getItem('rumki');
    console.log(rumkis);
    let sr = document.querySelector("#showresult");
    sr.innerText = "Ваш результат: " + rumkis + "/11";

    let rm = document.querySelector('#resultcomm');
    if(rumkis <= 3){
        rm.innerText = "Ну ти просто ..., Я не знаю навіть, що сказати, майже нічого не знаєте."
    } else if(rumkis > 3 && rumkis <= 6){
        rm.innerText = "Щось знаєте, щось не знаєте. Раджу пошукати в Інтернеті відповіді на питання."
    } else if(rumkis > 6 && rumkis <= 9){
        rm.innerText = "Чудова робота!"
    } else if(rumkis > 9){
        rm.innerText = "Ідеально."
    }

    let SAl = JSON.parse(localStorage.getItem("SAs"));
    console.log(SAl);

    let Questions = [];
    let Answers = [];
    let Correct = [];
    let testnumber = parseInt(localStorage.getItem('testnumbers'));

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
        console.log("Loaded Questions:", SAl);
        for(let i = 0; i < 11; i++){
            let a = i + (11 * testnumber);
            let keyda = document.createElement("div");
            let text = (SAl[i] === Correct[a]) ? "Good job!" : "";

            keyda.innerHTML = `
                <h3>${Questions[a]}</h3>
                <hr>
                <div>
                    <p>Your answer: ${"|"+SAl[i]+"|"}</p>
                    <p>Correct answer: ${Correct[a]}</p>
                    <p>${text}</p>
                </div>
            `;
            document.getElementById('answerscontainer').appendChild(keyda);
        }

    } catch (error) {
        console.error('Error loading questions:', error);
    }
});