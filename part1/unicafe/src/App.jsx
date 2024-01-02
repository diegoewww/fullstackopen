import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad) {
    return (
      <table>
        <tbody>
          <StatisticLine text="STATISTICS"></StatisticLine>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="average" value={(good - bad) / (good + bad + neutral)} />
          <StatisticLine text="positive" value={(good) / (good + bad + neutral) * 100} />
        </tbody>
      </table>
    )
  }

  return (
    <p>No feedback given</p>
  )

}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{text === "positive" ? `${value}  %` : value}</td>
    </tr>
  )
}

const Button = ({ onClick, children }) => {
  return (
    <button onClick={onClick}>{children}</button>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>GIVE FEEDBACK</h1>
      <Button onClick={() => setGood(good + 1)}>good</Button>
      <Button onClick={() => setNeutral(neutral + 1)}>neutral</Button>
      <Button onClick={() => setBad(bad + 1)}>bad</Button>
      <Statistics good={good} neutral={neutral} bad={bad} ></Statistics>
    </div>
  )
}

export default App