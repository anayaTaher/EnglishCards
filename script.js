const shuffle = array => {
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const swap = obj => {
  let res = {}
  res[obj[Object.keys(obj)[0]]] = Object.keys(obj)[0]
  return res
}

const addCard = (word, meaning) => {
  const card = document.createElement("div")
  card.classList.add("card")
  card.innerHTML = `
    <div class="front">${word}</div>
    <div class="back">${meaning}</div>
  `
  wordList.appendChild(card)
  card.addEventListener("click", _ => card.classList.toggle("flipped"))
}

let showNextCard = _ => {
  const cards = document.querySelectorAll(".card")
  if (currentCard < cards.length) {
    wordList.previousSibling.innerHTML = currentCard+1 + " / " + cards.length
    cards.forEach((card, index) => card.style.display = (index === currentCard) ? "block" : "none")
  } else {
    wordList.previousSibling.innerHTML = "Done"
    if(correctAnswers > Math.ceil(cards.length/2)) {
      wordList.innerHTML = `
      <p class="passed">You got ${correctAnswers} / ${cards.length} &#128516</p>
      <button id="reset">Play Again</button>
      `
    } else {
      wordList.innerHTML = `
      <p class="failed">You got ${correctAnswers} / ${cards.length} &#128546</p>
      <button id="reset">Play Again</button>
      `
    }
    const resetButton = document.getElementById("reset")
    resetButton.addEventListener("click", _ => location.reload())
  }
}
words.forEach(word => words.push(swap(word)))
shuffle(words)

const wordList = document.getElementById("word-list")
wordList.insertAdjacentHTML('beforebegin', '<p></p>')
wordList.previousSibling.innerHTML = 1 + " / " + words.length
wordList.previousSibling.classList.add("progress")
words.forEach(word => addCard(Object.keys(word)[0], word[Object.keys(word)[0]]))

const separated = document.createElement("div")
separated.classList.add("separated")
wordList.appendChild(separated)

const userInput = document.createElement("input")
userInput.autofocus=  true
userInput.placeholder = 'Enter your answer'
userInput.classList.add("user-input")
userInput.type = 'password';
wordList.appendChild(userInput)

let currentCard = 0
let correctAnswers = 0
userInput.addEventListener("keydown", e => {
  if(e.code == "Enter" || e.code == "NumpadEnter") {
    let userAnswer = userInput.value
    let correctAnswer = words[currentCard][Object.keys(words[currentCard])[0]]
    if(userAnswer.toUpperCase() === correctAnswer.toUpperCase()) {
      correctAnswers++
      wordList.style.borderColor = "#02a340"
    } else {
      wordList.style.borderColor = "#c22737"
    }
    userInput.value = ""
    currentCard++
  }
})

const cards = document.querySelectorAll(".card")
cards.forEach((card, index) => index > 0 ? card.style.display = "none" : null)
