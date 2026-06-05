import { useState } from 'react'

const StatisticsLine = ({text, value}) => <p>{text} {value}</p>

const Statistics = ({good, bad, neutral, all}) => {
  return (
    <>
    <h1>statistics</h1>
    
    {
      all ? 
        <div>  
          <StatisticsLine text={"good"} value={good}></StatisticsLine>
          <StatisticsLine text={"neutral"} value={neutral}></StatisticsLine>
          <StatisticsLine text={"bad"} value={bad}></StatisticsLine>
          <StatisticsLine text={"all"} value={good + bad + neutral}></StatisticsLine>
          <StatisticsLine text={"average"} value={all == 0 ? 0 : (1*good + 0*neutral + -1*bad)/all}></StatisticsLine>
          <StatisticsLine text={"positive"} value={all == 0 ? 0 :(good/all)*100 + " %"}></StatisticsLine>
        </div>
        :
        <p>No feedback given</p>  
    }
    </>
  )
}


const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
 

  const handleGood = () => {setGood(good + 1), setAll(all + 1)}
  const handleNeutral = () => {setNeutral(neutral + 1), setAll(all + 1)}
  const handleBad = () => {setBad(bad + 1), setAll(all + 1)}
  const handleAll = () => setAll(all + 1)

  return (
    <div>
        <h1>give feedback</h1>
        <Button text={"good"} onClick={handleGood}></Button>
        <Button text={"neutral"} onClick={handleNeutral}></Button>
        <Button text={"bad"} onClick={handleBad}></Button>
        <Statistics good={good} bad={bad} neutral={neutral} all={all}></Statistics>
      </div>
  )
}

export default App