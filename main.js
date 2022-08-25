/*Steps To Create The Project
[01] Create HTML Markup
[02] Add Styling And Separate From Logic
[03] Create The App Logic
---- [01] Add Levels
---- [02] Show Level And Seconds
---- [03] Add Array Of Words
---- [04] ِAdd Start Game Button
---- [05] Generate Upcoming Words
---- [06] Disable Copy Word And Paste Event + Focus On Input
---- [07] Start Play Function
---- [08] Start The Time And Count Score
---- [09] Add The Error And Success Messages
[04] Features I Want To Add
---- [01] Save Score To Local Storage With Date
---- [02] Choose Levels From Select Box // done
---- [03] Choose Array Of Words For Every Level
---- [04] Write Game Instruction With Dynamic Values
---- [05] Add 3 Seconds For The First Word
*/

// array of words
let words = [
    "Hello",
    "Programming",
    "Code",
    "Javascript",
    "Town",
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "Python",
    "Scala",
    "Destructuring",
    "Paradigm",
    "Styling",
    "Cascade",
    "Documentation",
    "Coding",
    "Funny",
    "Working",
    "Dependencies",
    "Task",
    "Runner",
    "Roles",
    "Test",
    "Rust",
    "Playing"  
];

// catch selectors
let startBtn = document.querySelector(".start");
let select = document.querySelector(".message .select")
let theWord = document.querySelector(".the-word")
let avrgSeconds = document.querySelector(".message .seconds")
let upcoming = document.querySelector(".upcoming-words");
let countDown = document.querySelector(".time span")
let score = document.querySelector(".got")
let total = document.querySelector(".total")
let input = document.querySelector(".input");
let results = document.querySelector(".finish")

// Setting total
total.innerHTML = words.length

//select function
select.onchange = function () {
    if (this.value === "Easy") {
        let myavg = avrgSeconds.innerHTML = 10
        countDown.innerHTML = myavg
    } else if (this.value === "Medium") {
        let myavg = avrgSeconds.innerHTML = 5
        countDown.innerHTML = myavg
    } else {
        let myavg = avrgSeconds.innerHTML = 3
        countDown.innerHTML = myavg
    }
}

// start game
startBtn.onclick = function () {
    this.remove()
    input.focus();
    //generate random-word
    generate()
};

// generate function
function generate() {
    // get random word
    let random = words[Math.floor(Math.random() * words.length)]
    // get index
    let wordIndex = words.indexOf(random)
    // remove that word from the array
    words.splice(wordIndex, 1)
    // add the random word
    theWord.innerHTML = random
    // upcoming Words
    upcoming.innerHTML = '';
    // generate upcomig words
    for (let i = 0; i < words.length; i++) {
        let div = document.createElement("div");
        let text = document.createTextNode(words[i]);
        div.appendChild(text);
        upcoming.appendChild(div);
    }
    //timer
    timer()
}

// timer function
function timer() {
    countDown.innerHTML = avrgSeconds.innerHTML
    let counter = setInterval(() => {
        countDown.innerHTML--;
        if (countDown.innerHTML <= 0) {
            //stop time
            clearInterval(counter)
            //compare words
            if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
                input.value = '';
                score.innerHTML++
                if (words.length > 0) {
                    //call function generate
                    generate()
                } else {
                    let span = document.createElement("span")
                    span.classList.add("good")
                    let text = document.createTextNode("Gongrats")
                    span.appendChild(text)
                    results.appendChild(span)
                }
            } else {
                let span = document.createElement("span")
                span.classList.add("bad")
                let text = document.createTextNode("Game Over")
                span.appendChild(text)
                results.appendChild(span)
            }
        }
    }, 1000); 
}


// disable paste, copy and cut  events
input.onpaste = function () {
    return false
};