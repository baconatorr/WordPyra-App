loadStats();

function loadStats(){
  let matches = parseInt(localStorage.getItem('matches')) || 0;
  document.querySelector('#matchesStat').innerText = matches.toLocaleString();

  let wins = parseInt(localStorage.getItem('wins')) || 0;
  document.querySelector('#winsStat').innerText = wins.toLocaleString();

  let wordsPlaced = parseInt(localStorage.getItem('total words')) || 0;
  document.querySelector('#wordsPlacedStat').innerText = wordsPlaced.toLocaleString();

  let lettersPlaced = parseInt(localStorage.getItem('total letters')) || 0;
  document.querySelector('#lettersPlacedStat').innerText = lettersPlaced.toLocaleString();

  let skipsUsed = parseInt(localStorage.getItem('skipsUsed')) || 0;
  document.querySelector('#skipsUsedStat').innerText = skipsUsed.toLocaleString();

  let skiplessWins = parseInt(localStorage.getItem('skiplessWins')) || 0;
  document.querySelector('#skiplessWinsStat').innerText = skiplessWins.toLocaleString();
}

function home(){
  document.location.href = '/WordPyra-App/home/index.html';
}
