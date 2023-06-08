import logo from './logo.svg';
import 'flag-icon-css/css/flag-icons.css'
import nations from './nations';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  
const [country, setCountry] = useState([])
const [flagCountry , setFlagCountry] = useState({})
const [score, setScore] = useState({total: 0, correct: 0, incorrect: 0})
const [showAnswer, setShowAnswer] = useState(false)
const [selected, setSelected] = useState({})

const generateRandomNations = () => {
  let ct=[];
  for(let i=0 ; i<4 ; i++){
    const r = Math.floor(Math.random() * nations.length);
  ct.push(nations[r]);
  }
  console.log(ct)
  setCountry(ct)
  const index = Math.floor(Math.random()*4)
  setFlagCountry(ct[index]);
}
const checkAnswer=(country)=>{
  setSelected(country)
  if(country.name === flagCountry.name){
    setScore({...score, correct: score.correct+1, total:score.total+1})
  }
  else{
    setScore({...score, incorrect: score.incorrect+1, total:score.total+1})
  }
  setShowAnswer(true);
  setTimeout(()=>{
    setShowAnswer(false)
    nextQuestion();
  },5000)
}
const nextQuestion =()=>{
  generateRandomNations();
}
useEffect(()=>{
  generateRandomNations();
},[])
  return (
    <div className="App">
      <div>
        <h4>Total : {score.total}/Correct : {score.correct}/Incorrect : {score.incorrect}</h4>
      </div>
      {flagCountry.name?(<span className={`flag-icon flag-icon-${flagCountry['alpha-2'].toLowerCase()}`}></span>):null}
      
      {/* <span class="flag-icon flag-icon-gr"></span> */}

      <div>
        {country.map(c=><button onClick={e=>checkAnswer(c)}>{c.name}</button>)}
        
      </div>
      <div>
        {showAnswer ? <h2 className={flagCountry.name===selected.name ? 'correct' : 'incorrect'}>Correct option : {flagCountry.name}</h2> : null}
      </div>
    </div>
  );
}

export default App;