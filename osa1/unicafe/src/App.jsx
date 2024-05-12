import { useState } from 'react'

const Button =({name,handleClick})=>{
  return(
    <>
    <button onClick={handleClick}>{name}</button>
    </>
  )
}

const StatisticLine = ({text,value,mark=null}) => {
  
  return(
    <tr>
      <td>{text}</td>
      <td>{value} {mark}</td>
    </tr>
  )
}

const Statistics = ({good, neutral,bad}) => {
  let all = good+neutral+bad

  if (all === 0){
      return(
        <>
            <span>No feedback given</span>
        </>
      )
  }

  return(
    <table>
      <tbody>
        <StatisticLine
        text="good"
        value={good}
        ></StatisticLine>

        <StatisticLine
        text="neutral"
        value={neutral}
        ></StatisticLine>

        <StatisticLine
        text="bad"
        value={bad}
        ></StatisticLine>

        <StatisticLine
        text="all"
        value={all}
        ></StatisticLine>

        <StatisticLine
        text="average"
        value={(good-bad)/all}
        ></StatisticLine>

        <StatisticLine
        text="positive"
        value={(good/all)*100}
        mark="%"
        ></StatisticLine>
      </tbody>
    </table>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
      <div>
        <h1>give feedback</h1>
        <Button name="good" handleClick={()=> setGood(good+1)}></Button>
        <Button name="neutral" handleClick={()=> setNeutral(neutral+1)}></Button>
        <Button name="bad" handleClick={()=> setBad(bad+1)}></Button>
        <h1>statistics</h1>
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
        ></Statistics>
      </div>
  )
}

export default App
