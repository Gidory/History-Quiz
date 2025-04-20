console.log("script.js loaded");
let rumkis = localStorage.getItem('rumki');
console.log(rumkis);
let sr = document.querySelector("#showresult");
function importi(){
    sr.innerText = "Ваш результат: " + rumkis + "/11";
}
importi();
let rm = document.querySelector('#resultcomm');
function commenting(){
    if(rumkis <=3){
        rm.innerText = "Ну ти просто ..., Я не знаю навіть, що сказати, майже нічого не знаєте."
    }
    if(rumkis > 3&&rumkis <=6){
        rm.innerText = "Щось знаєте, щось не знаєте. Раджу пошукати в Інтернеті відповіді на питання. Якщо ви їх ще пам'ятаєте звісно."
    }
    if(rumkis > 6&&rumkis <=9){
        rm.innerText = "Чудова робота!"
    }
    if(rumkis > 9){
        rm.innerText = "Ідеально."
    }
}
commenting();