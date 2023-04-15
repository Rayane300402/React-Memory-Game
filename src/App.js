import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

// each card is an object with property src
const cardImages = [
  {"src" : "/img/choco-1.png", matched: false},
  {"src" : "/img/cupcake-1.png", matched: false},
  {"src" : "/img/macaron-1.png", matched: false},
  {"src" : "/img/strawberry-1.png", matched: false},
  {"src" : "/img/cake-1.png", matched: false},
  {"src" : "/img/blueberry-1.png", matched: false},
  {"src" : "/img/rasberry-1.png", matched: false},
  {"src" : "/img/rollcake-1.png", matched: false}
]

function App() {

  // state to store cards in for a particular game
  const[cards, setCards] = useState([])
  // turns state, nuber of turns he took, ++ every turn
  const [turns, setTurns] = useState(0)
  // store cards, so we compare the cards, both null at start, when i click on card1, choice one is the first card
  const [choiceOne, setChoiceOne] =  useState(null)
  const [choiceTwo, setChoiceTwo] =useState(null)
  const [disabled, setDisabled] =useState(false)


  

  // shuffle cards
  const shuffleCards = () => {
    // Duplicate each card once
    //... is used to spread , so we have to content in cardImages spread twice, aka we have 2 of the same src
    const shuffledCards = [...cardImages, ...cardImages]
    // sort, if we return a number less than 0 the order stays same, if greater than we swap 
    .sort(() =>  Math.random() - 0.5)         // randomize order, if negative number = items is same order, positive, switch order around
    // wnat to fire a function for each iteam, for each one i want to add an ID property
    // apply random ID as a key for react
    .map((card) => ({...card, id: Math.random()}))

    setChoiceOne(null)
    setChoiceTwo(null)

    setCards(shuffledCards)
    setTurns(0)
  }
  // this cte ^ has a random id for each src

  // handle a choice
  const handleChoice = (card) => {
    // if it doesn't have a value = update choice one, else update choice two
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare 2 selected cards, fire again when dependency changes, its the ,[choiceOne, choiceTwo] -> fireagain anytime one of the two changes
  useEffect(() => {
    
    if(choiceOne && choiceTwo){
      // can't click other cards
    setDisabled(true)
      // is src of choiceOne == src of choiceTwo
      if(choiceOne.src === choiceTwo.src){
        // have to update state, find cards user picked + change matched to true
        setCards(prevCards => {
          // have all cards but choiceOne & choiceTwo -> mathced:true
          return prevCards.map(card => {
            if(card.src === choiceOne.src){
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else{
        // wait a second before nulling
        setTimeout(()=>resetTurn(),1000)
      }
    }
  }, [choiceOne, choiceTwo])

  // reset choice & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    // back to click cards
    setDisabled(false)
  }

  // start game automatically, we have 2 useEffects and its fine, no errors
  useEffect(()=>{
    // default of cards is empty array so we're calling shuffleCards
    shuffleCards()
  },[])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      
      <div className="card-grid">
        {cards.map((card)=> (
          // SingleCard(card) <-- another way, we can keep card.id 
          <SingleCard  
            key={card.id} 
            card={card}
            // passing card as a prop
            handleChoice = {handleChoice}
            // gonna be either true or false, add flipped class to the card
            // only 3 scenarios where flipped == true, when card = choiceOne, case 2 card = choiceTwo, three when cards match
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            // dynamic true or false
            disabled= {disabled}
            />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;

