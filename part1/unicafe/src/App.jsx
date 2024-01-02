import { useState } from 'react'

const Button = ({ onClick, children }) => {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
};

const StatisticLine = (props) => {
  if (props.text === "positive") {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value} %</td>
      </tr>
    );
  }

  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  if (props.good + props.neutral + props.bad > 0) {
    return (
      <>
        <h2>statics</h2>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.good + props.bad + props.neutral} />
        <StatisticLine text="average" value={(props.good - props.bad) / (props.good + props.bad + props.neutral)} />
        <StatisticLine text="positive" value={(props.good) / (props.good + props.bad + props.neutral) * 100} />


      </>
    )
  }

  return (
    <div>No feedback given</div>
  )

}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>GIVE FIDEBACK</h1>
      <Button onClick={() => setGood(good + 1)}>Good</Button>
      <Button onClick={() => setNeutral(neutral + 1)}>Neutral</Button>
      <Button onClick={() => setBad(bad + 1)}>Bad</Button>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App