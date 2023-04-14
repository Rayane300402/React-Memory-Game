import { useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

// each card is an object with property src
const cardImages = [
  {"src" : "/img/choco-1.png"},
  {"src" : "/img/cupcake-1.png"},
  {"src" : "/img/macaron-1.png"},
  {"src" : "/img/strawberry-1.png"},
  {"src" : "/img/cake-1.png"},
  {"src" : "/img/blueberry-1.png"},
  {"src" : "/img/rasberry-1.png"},
  {"src" : "/img/rollcake-1.png"}
]

function App() {

  // state to store cards in for a particular game
  const[cards, setCards] = useState([])
  // turns state, nuber of turns he took, ++ every turn
  const [turns, setTurns] = useState(0)
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

    setCards(shuffledCards)
    setTurns(0)
  }
  // this cte ^ has a random id for each src
  console.log(cards, turns)

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      
      <div className="card-grid">
        {cards.map((card)=> (
          // SingleCard(card) <-- another way, we can keep card.id 
          <SingleCard  key={card.id} card={card}/>
        ))}
      </div>
    </div>
  );
}

export default App;
