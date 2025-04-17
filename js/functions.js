console.log("functions.js loaded");
let start = document.querySelector("#start");
let start1 = document.querySelector("#start1");
let start2 = document.querySelector("#start2");
let start3 = document.querySelector("#start3");
start.addEventListener("click", function(){
    localStorage.setItem('testnumbers', 0);
    window.location.href = 'testindex.html';
});
start1.addEventListener("click", function(){
    localStorage.setItem('testnumbers', 1);
    window.location.href = 'testindex.html';
});
start2.addEventListener("click", function(){
    localStorage.setItem('testnumbers', 2);
    window.location.href = 'testindex.html';
});
start3.addEventListener("click", function(){
    localStorage.setItem('testnumbers', 3);
    window.location.href = 'testindex.html';
});