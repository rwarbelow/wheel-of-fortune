(function() {
  const phrase = []
  const allPhraseLetters = document.querySelectorAll(".letter");
  for (var i = 0; i < allPhraseLetters.length; i++) {
    phrase.push(allPhraseLetters[i].dataset.letter);
  }
  const answer = phrase.join('')
  document.getElementById('solve').addEventListener('click', function() {
    var res = prompt("Enter your guess: ");
    
    if(res.replace(/ /gi, '').toUpperCase() === answer) {
      document.querySelector('.picture').style.visibility = 'visible'
    } else {
      alert('Sorry, that is not the correct answer.')
    }
  });
  function flashWheel() {
    for (i = 0; i < 2; i++) {
      $('.wheel-container').fadeTo('slow', 0.2).fadeTo('slow', 1);
    }
  }
  flashWheel();
  const consonantChoices = document.getElementsByClassName("choice");
  const vowelChoices = document.getElementsByClassName("v-choice");

  for (var i = 0; i < consonantChoices.length; i++) {
    consonantChoices[i].addEventListener('click', function() {
      var letter = this.innerText;
      var res = $('*[data-letter="' + letter + '"]')
      res.removeClass('unsolved');
      var count = 0;
      for(i = 0; i < res.length; i++) {
        count++;
        res[i].innerText = letter;
        delete res[i].dataset.letter;
      }
      const unsolved = document.getElementsByClassName("unsolved");
      if(unsolved.length === 0) {
        document.querySelector('.picture').style.visibility = 'visible'
      }
      console.log(count)
      if(count === 0) {
        alert('Sorry, there are no ' + letter + '\'s on the board. Spin again!')
      } else {
        var amount = parseInt(display.innerText.replace('$', '')) * count;
        var total = parseInt(earnings.innerText.replace('$', ''));
        earnings.innerText = '$' + (amount + total)
      }
      choices.style.visibility = 'hidden';
      display.style.visibility = 'hidden';
      startButton.style.pointerEvents = 'auto';
      flashWheel();
    });
  }

  for (var i = 0; i < vowelChoices.length; i++) {
    vowelChoices[i].addEventListener('click', function () {
      var total = parseInt(earnings.innerText.replace('$', ''));
      var letter = this.innerText;
      var res = $('*[data-letter="' + letter + '"]')
      if (total < res.length * 250) {
        alert('Sorry, you do not have enough money to buy that vowel. (There may be more than one ' + letter + ' in the puzzle and each one costs $250!)');
        return;
      }
      res.removeClass('unsolved');
      var count = 0;
      for (i = 0; i < res.length; i++) {
        count++;
        res[i].innerText = letter
      }
      const unsolved = document.getElementsByClassName("unsolved");
      if (unsolved.length === 0) {
        document.querySelector('.picture').style.visibility = 'visible'
      }
      console.log(count)
      if (count === 0) {
        alert('Sorry, there are no ' + letter + '\'s on the board. Spin again!')
      }
      var amount = count === 0 ? 250 : count * 250
      
      earnings.innerText = '$' + (total - amount)
      choices.style.visibility = 'hidden';
      display.style.visibility = 'hidden';
      startButton.style.pointerEvents = 'auto';
      flashWheel();
    });
  }
  const consonantChoiceCollection = document.querySelector('.consonant-choices')
  const vowelChoiceCollection = document.querySelector('.vowel-choices')
  const choices = document.querySelector('.choices')
  const wheel = document.querySelector('.wheel');
  const startButton = document.querySelector('.wheel-container');
  const display = document.querySelector('.display');
  const earnings = document.querySelector('#earnings');
  
  let deg = 0;
  let zoneSize = 30;

  const symbolSegments = {
    1: "850",
    2: "750",
    3: "400",
    4: "600",
    5: "550",
    6: "800",
    7: "900",
    8: "900",
    9: "650",
    10: "500",
    11: "950",
    12: "BANKRUPT"
  }

  const handleWin = (actualDeg) => {
    const winningSymbolNr = Math.ceil(actualDeg / zoneSize);
    var result = symbolSegments[winningSymbolNr];
    if(result == 'BANKRUPT') {
      alert("Sorry! You are bankrupt. Start over ☹️")
      location.reload();
      return;
    }
    display.innerText = '$' + symbolSegments[winningSymbolNr];
    display.style.visibility = 'visible';
    choices.style.visibility = 'visible';
  }

  startButton.addEventListener('click', () => {
    display.style.visibility = 'hidden';
    startButton.style.pointerEvents = 'none';
    deg = Math.floor(500 + Math.random() * 2500);
    var rotatedDeg = deg % 360;
    const unsolved = document.getElementsByClassName("unsolved");
    if (Math.ceil(rotatedDeg / zoneSize) === 12 && unsolved.length >= unsolved.length / 2) {
      deg = 90;
    }
    var sliceNo = Math.round(rotatedDeg / zoneSize)
    var closeFactor = (sliceNo * zoneSize) - rotatedDeg
    if (closeFactor < 8 && closeFactor >= 0) {
      deg = deg + 15
    } else if (closeFactor > -8 && closeFactor <= 0) {
      deg = deg - 15;
    }
    wheel.style.transition = 'all 1s ease-out';
    wheel.style.transform = `rotate(${deg}deg)`;
    wheel.classList.add('blur');
  });

  wheel.addEventListener('transitionend', () => {
    wheel.classList.remove('blur');
    wheel.style.transition = 'none';
    var actualDeg = deg % 360;
    wheel.style.transform = `rotate(${actualDeg}deg)`;
    handleWin(actualDeg);
  });
})();


