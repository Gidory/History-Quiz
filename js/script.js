console.log("script.js loaded");
let rumkis = localStorage.getItem('rumki');
console.log(rumkis);
let sr = document.querySelector("#showresult");
function importi(){
    sr.innerText = "Ваш результат: " + rumkis + "/10";
}
importi();