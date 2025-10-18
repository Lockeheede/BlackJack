let player = {
    name: "Per",
    chips: 200
}


let cards = []
let dealersCards = []
let sum = 0
let dealerSum = 0
let hasBlackJack = false
let standing = false
let dealerHasBlackJack = false
let isAlive = false
let newGame = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let dealerSumEl = document.getElementById("dealer-sum-el")
let dealersCardsEl = document.getElementById("dealer-cards-el")

playerEl.textContent = player.name + ": $" + player.chips

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1 && sum <= 21) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    if (newGame === true && isAlive === false) {
        newGame = false;
        startGame()
    }
    if (standing === true || newGame === true) return;
    for(let i = 0; i < dealersCards.length; i++) {
        dealersCards.pop()
    }
    dealersCardsEl.textContent = "Dealer's Cards: "
    dealerSumEl.textContent = "Dealer's Sum: "
    newGame = true;
    isAlive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame()
}

function renderGame() {
    cardsEl.textContent = "Player's Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }

    sumEl.textContent = "Player's Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21 && cards.length === 2) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else if (sum === 21 && cards.length > 2) {
        message = "You have 21, you should stand.";
    } else {
        message = "Bust!"
        isAlive = false
    }
    messageEl.textContent = message
}

function renderDealerGame() {
    dealersCardsEl.textContent = "Dealer's Cards: "
    for (let i = 0; i < dealersCards.length; i++) {
        dealersCardsEl.textContent += dealersCards[i] + " "
    }

    dealerSumEl.textContent = "Dealer's Sum: " + dealerSum
    if (dealerSum >= 17) {
        playGame();
    }
    if (dealerSum <= 16) {
        dealerNewCard()
    } else if (dealerSum === 21 && dealerCards.length === 2) {
        message = "Dealer Has Blackjack!"
        dealerHasBlackJack = true
        playGame();
    } else if (dealerSum === 21 && dealerCards.length > 2) {
        message = "Dealer has 21.";
        playGame();
    } else if (dealerSum > 21) {
        message = "Dealer Busts!"
        message += " You win!"
    } else {
        message = "Dealer stands."
        playGame();
    }
    messageEl.textContent = message
}


function newCard() {
    if (standing === true) return;
    if (isAlive === true) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()
    }
}

function dealerStartGame() {
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    dealersCards = [firstCard, secondCard]
    dealerSum = firstCard + secondCard
    renderDealerGame()
}

function dealerNewCard() {
    if (dealerHasBlackJack === false) {
        let card = getRandomCard()
        dealerSum += card
        dealersCards.push(card)
        renderDealerGame()
    }
}

function stand() {
    if (isAlive === false || newGame === false) return;
    if (isAlive === true) {
        standing = true;
        dealerStartGame();
    }
}

function playGame() {
    if(sum > dealerSum) {
        message = "You win!"
    } else if (sum < dealerSum) {
        message = "Dealer wins!"
    } else {
        message = "It's a tie!"
    }
    messageEl.textContent = message
    newGame = false;
    hasBlackJack = false;
    dealerHasBlackJack = false;
    isAlive = false;
    standing = false;
}
