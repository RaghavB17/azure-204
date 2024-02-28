import useGameState from "../utility/useGameState";
import utils from "../utility/utils";
import StarsDisplay from "./StarsDisplay";
import PlayNumber from "./PlayNumber";
import PlayAgain from "./PlayAgain";

const Game = (props) => {
    const {
      stars,
      availableNums,
      candidateNums,
      secondsLeft,
      setGameState,
    } = useGameState();
    
    const wrongCandidates = utils.sum(candidateNums) > stars;
    const gameStatus = availableNums.length === 0
      ? 'won'
      : secondsLeft === 0 ? 'lost' : 'active'
    
    const numberStatus = (number) => {
      if(!availableNums.includes(number)) {
        return 'used';
      }
      if(candidateNums.includes(number)) {
        return wrongCandidates ? 'wrong' : 'candidate';
      }
      return 'available';
    }
    
    const onNumberClick = (number, currentStatus) => {
      if(gameStatus !== 'active' || currentStatus === 'used'){
        return;
      }
      
      const newCandidateNums = 
            currentStatus === 'available'
            ? candidateNums.concat(number)
            : candidateNums.filter(cn => cn !== number);
      
      setGameState(newCandidateNums);
    };
    
    return (
      <div className="game">
        <div className="help">
          Pick 1 or more numbers that equals the sum of the number of stars
        </div>
        <div className="body">
          <div className="left">
            {gameStatus !== 'active' ? (
              <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus}/> 
            ) : (
              <StarsDisplay stars={stars}/>
            )}
          </div>
          <div className="right">         
            {utils.range( 1, 9).map(number =>
               <PlayNumber 
                 key={ number} 
                 status={numberStatus(number)}
                 number={number}
                 onClick={onNumberClick}
               />
            )}
          </div>
        </div>
        <div className="timer">Time Remaining: {secondsLeft}</div>
      </div>
    );
  };

export default Game;
