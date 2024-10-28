const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const vowels = ['A', 'E', 'I', 'O', 'U']
const t1 = ['T', 'S', 'R'];
const t2 = ['N', 'H', 'C']
const t3 = ['D', 'L','K', 'B'];
const t4 = ['M', 'W', 'F', 'G'];
const t5 = ['Y', 'P', 'V'];
const t6 = ['J', 'X', 'Q', 'Z'];
let index = 0;

let vowelCount;
let chosenLetters = [];
let letter = "";
let nextLetter;
let skips = 3;
let randomIndex;
let currentCheck;
let isFetching = false;

let gameStarted = false;
let wordCount = 0;
let rowCount = 0;
let letterCount = parseInt(localStorage.getItem('total letters')) || 0;
let wins = parseInt(localStorage.getItem('wins')); 
let matches = parseInt(localStorage.getItem('matches')); 
let skipsUsed = parseInt(localStorage.getItem('skipsUsed')) || 0;
let skiplessWins = parseInt(localStorage.getItem('skiplessWins')) || 0;

if (!localStorage.getItem('visited')) {

    openModal('how')
    localStorage.setItem('wins', 0);
    wins = 0;
    localStorage.setItem('matches', 0);
    matches = 0;
    localStorage.setItem('visited', 'true');
  
    
}

function home(){
    document.location.href = 'https://wordpyra.com'
}

function openModal(id){
    let modal = document.getElementById(id);
    modal.showModal();
}

function closeModal(id){
    let modal = document.getElementById(id);
    modal.close();
}

document.addEventListener("DOMContentLoaded", function() {
  chosenLetters = [];
  generateList();
  generateLetter();
  wordCount = 0;
  rowCount = 0;
  skips = 3;  

  var squares = document.querySelectorAll(".space");


  squares.forEach(function(square) {
      square.addEventListener("click", function() {
          var squareId = square.id;
          addLetter(squareId);
      });
  });

  function addLetter(squareId) {
    if(isFetching){
      return undefined;
    }

    if(gameStarted != true){
        gameStarted = true;
        matches++;
        console.log("match counted")
        localStorage.setItem('matches', matches);
    }
    

      console.log("Square clicked:", squareId);
      let id = document.getElementById(squareId);
      let existingP = id.querySelector('p');
      if(!existingP) {
        var audio = document.getElementById('add');
        audio.play();
        audio.currentTime = 0;
          letterCount++;
          localStorage.setItem('total letters', letterCount);
          id.classList.add("space-add");
          let text = document.createElement('p');
          let letterText = document.createTextNode(letter);
          text.appendChild(letterText);
          id.appendChild(text);
          generateLetter();
          
          
          rowCheck(squareId);
      }
  }
});

function generateList(){
 choseLetters();
 shuffleLetters();
}

function choseLetters(){
    vowelCount = Math.floor(Math.random() * (3) + 6); 
    console.log(vowelCount)
    let totalConsonants = 16 - vowelCount;
    let t1Count = Math.floor(Math.max(1, totalConsonants - 6))
    let t2Count = Math.floor(Math.max(1, totalConsonants - 6))
    let t3Count = Math.floor(Math.max(1, totalConsonants - 8))
    let t4Count = Math.floor(Math.max(1, totalConsonants - 9))
    let t5Count = Math.floor(Math.max(1, totalConsonants - 10))
    let t6Count = Math.floor(Math.max(1, totalConsonants - 11))
    while(t1Count + t2Count + t3Count + t4Count + t5Count + t6Count > totalConsonants){
        if(t6Count > 0){
            t6Count--;
        } else if(t5Count > 0){
            t5Count--;
        } else {
            break;
        }
    }
  
    for(let i = 0; i < vowelCount; i++){
        chosenLetters.push(vowels[(Math.floor(Math.random() * vowels.length))])
    }
    for(let i = 0; i < t1Count; i++){
        chosenLetters.push(t1[(Math.floor(Math.random() * t1.length))])
    }
    for(let i = 0; i < t2Count; i++){
        chosenLetters.push(t2[(Math.floor(Math.random() * t2.length))])
    }
    for(let i = 0; i < t3Count; i++){
        chosenLetters.push(t3[(Math.floor(Math.random() * t3.length))])
    }
    for(let i = 0; i < t4Count; i++){
        chosenLetters.push(t4[(Math.floor(Math.random() * t4.length))])
    }
    for(let i = 0; i < t5Count; i++){
        chosenLetters.push(t5[(Math.floor(Math.random() * t5.length))])
    }
    for(let i = 0; i < t6Count; i++){
        chosenLetters.push(t6[(Math.floor(Math.random() * t6.length))])
    }
  
    if(vowelCount == 6){
        chosenLetters.pop()
    }

    for(let i = 0; i < 4; i++){
        chosenLetters.push(letters[Math.floor(Math.random() * letters.length)]);
    }
}

function shuffleLetters(){
    let currentIndex = chosenLetters.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [chosenLetters[currentIndex], chosenLetters[randomIndex]] = [
        chosenLetters[randomIndex], chosenLetters[currentIndex]];
    }
    console.log(chosenLetters);
}

function generateLetter() {
  letter = chosenLetters[index];
  nextLetter = chosenLetters[index + 1];
  displayLetter();
}

function displayLetter(){
    //diplay current letter
      const display = document.getElementById("letter");
      display.innerText = letter;
      let letterElement = document.querySelector('.letter');
      letterElement.style.animation = 'none';
      void letterElement.offsetWidth; 
      letterElement.style.animation = 'right-in 0.2s ease'; 
      chosenLetters.splice(randomIndex, 1)
      //displayt next letter
      const nextLetterText = document.getElementById("next-letter-text");
      nextLetterText.innerText = nextLetter;
      let nextLetterElement = document.querySelector('.next-letter');
      nextLetterElement.style.animation = 'none';
      void nextLetterElement.offsetWidth; 
      nextLetterElement.style.animation = 'pop-in 0.2s ease'; 
}

function skip(){
  if(skips > 0){
      generateLetter();
      skips--;
      document.querySelector("#skip-counter").innerText = skips;
      skipsUsed++;
      localStorage.setItem('skipsUsed', skipsUsed);
      var audio = document.getElementById('skip');
      audio.play();
      audio.currentTime = 0.2;
  }
}

function refresh(){
  location.reload();
}


function rowCheck(Id){
  let row = Id.substring(1, 2); 
  currentCheck = row;
  let word = [];
  for(let i = 1; i <= row; i++){
      let id = document.getElementById("r" + row + "s" + i);
      if (id) {
          let check = id.querySelector('p');
          if (check != null) {
              word.push(check.textContent);
          } else {
              console.log("RNC");
              return undefined;
          }
      }
  }
  let pushed = word.join(""); 
  console.log(pushed + " was pushed");
 Get(pushed);
}


function Get(word) {
  if(word == "IS" || word == "BE" || word == "NET" || word == "CUE" || word == "TOW"){
    animate("correct");
    return;
  }

  if (word == "B" || word == "C" || word == "D" || word == "F" || word == "G" || word == "H" || word == "J" || word == "K" || word == "L" || word == "M" || word == "N" || word == "P" || word == "Q" || word == "R" || word == "S" || word == "T" || word == "V" || word == "W" || word == "X" || word == "Y" || word == "Z") {
    animate("wrong");
    return;
}

  rowCount++;
  console.log(rowCount);
  isFetching = true;
  return new Promise((resolve, reject) => {
      let url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
      fetch(url)
          .then(response => {
              if (response.status === 404) {
                  animate("wrong");
                  reject(new Error('Word not found in the dictionary.'));
              } else if (!response.ok) {
                  Get(word);
                  throw new Error('Request failed: ' + response.status);
              } else {
                addCoins(word.length);
                animate("correct");
                resolve();
              }
          })
          .catch(error => {
  });
})
}

function animate(rw){
isFetching = false;
  if(rw == "correct" || rw == "wrong") {
      for(let i = 1; i <= currentCheck; i++){
          let id = document.getElementById("r" + currentCheck + "s" + i);
          if (id) {
              id.classList.add(rw);
          } else {
              console.error("Element with ID 'r" + currentCheck + "s" + i + "' not found.");
          }
      }
  } else {
      console.error("Invalid animation type:", rw);
  }

  if(rw == "correct"){
    wordCount++;
    console.log(wordCount);
  }
winCheck();
}

function winCheck(){
if(wordCount == 5){
    
    const jsConfetti = new JSConfetti()

    jsConfetti.addConfetti()
    console.log('win');
    wins++;
    console.log("win count: " + wins)
    localStorage.setItem('wins', wins);
    if(skips == 3){
        skiplessWins++;
        localStorage.setItem('skiplessWins', skiplessWins);
    }
    return undefined;
}
}

function addCoins(amount){
    let totalWords = parseInt(localStorage.getItem('total words')) || 0;
    totalWords++;
    localStorage.setItem('total words', totalWords); 
}
