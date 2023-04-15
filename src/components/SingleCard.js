// import './SingleCard.css';

// function SingleCard({card, handleChoice, flipped}) {
//   const handleClick = () => {
//     // want to update some states in app.js aka choiceone & choice two
//     handleChoice(card)
//   }
//     return ( 
//       <div className='card'>
//           {/* apply flipped class if flipped is true */}
//         <div className={flipped ? "flipped" : ""}>
//           <img  className="front" src={card.src} alt="card front" />
//           <img 
//             className="back" 
//             src="/img/cover.png" 
//             onClick={handleClick}
//             alt="cover" />
//         </div>
//       </div>
//      );
// }

// export default SingleCard;

import './SingleCard.css'

export default function SingleCard({ card, handleChoice, flipped, disabled }) {

  const handleClick = () => {
    // only if disabled is false can we handle the choice
    if(!disabled){
      handleChoice(card)
    }
  }

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img className="back" src="/img/cover.png" onClick={handleClick} alt="cover" />
      </div>
    </div>
  )
}