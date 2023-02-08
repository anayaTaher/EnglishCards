const shuffle = array => {
  for (let loop = 0; loop < 5; loop++) {
    for (let i = 0; i < array.length; i++) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }
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
    wordList.previousSibling.style.backgroundColor = "#117c5c"
    wordList.innerHTML = `<button class="play-again">Play Again</button>`
    const playAgainButton = document.getElementsByClassName("play-again")[0]
    playAgainButton.addEventListener("click", _ => location.reload())
  }
}
shuffle(words)
words.forEach(word => words.push(swap(word)))
shuffle(words)

const wordList = document.getElementById("word-list")
wordList.insertAdjacentHTML('beforebegin', '<p></p>')
wordList.previousSibling.innerHTML = 1 + " / " + words.length
wordList.previousSibling.classList.add("progress")
words.forEach(word => addCard(Object.keys(word)[0], word[Object.keys(word)[0]]))

const nextCard = document.createElement("button")
nextCard.innerHTML = 'Next Card'
nextCard.classList.add("next-card")
wordList.appendChild(nextCard)

let currentCard = 0
nextCard.addEventListener("click", _ => {
  console.log("Hello")
  ++currentCard == cards.length-1 && (nextCard.innerHTML = 'Finsih Test')
  showNextCard()
})

const cards = document.querySelectorAll(".card")
cards.forEach((card, index) => index > 0 ? card.style.display = "none" : null)
