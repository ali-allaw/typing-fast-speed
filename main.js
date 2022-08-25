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
[04] Your Trainings To Add Features
---- [01] Save Score To Local Storage With Date
---- [02] Choose Levels From Select Box
---- [03] Break The Logic To More Functions
---- [04] Choose Array Of Words For Every Level
---- [05] Write Game Instruction With Dynamic Values
---- [06] Add 3 Seconds For The First Word
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

//set levels
let lvls = {
    "Easy": 10, 
    "Medium": 6,
    "Hard": 3
};

let defaultLevelName = "Medium";
let defaultLevelSeconds = lvls[defaultLevelName];

// catch selectors
let startBtn = document.querySelector(".start");
let levels = document.querySelector(".message .lvl")
let theWord = document.querySelector(".the-word")
let avrgSeconds = document.querySelector(".message .seconds")
let upcoming = document.querySelector(".upcoming-words");
let countDown = document.querySelector(".time span")
let score = document.querySelector(".got")
let total = document.querySelector(".total")
let input = document.querySelector(".input");
let results = document.querySelector(".finish")

// Setting level Name + Seconds + Score
levels.innerHTML = defaultLevelName
avrgSeconds.innerHTML = defaultLevelSeconds
countDown.innerHTML = defaultLevelSeconds
total.innerHTML = words.length

// start game
startBtn.onclick = function () {
    this.remove()
    input.focus();

    //countdown timer
    // timer(countDown)

    //generate random-word
    generate()
    
    // score function
    input.oninput = function () {
        if (input.value === theWord.innerHTML) {
            theWord.innerHTML = "";
        }
    };
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
    timer()
}

// timer function
function timer() {
    countDown.innerHTML = defaultLevelSeconds
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
