

const Hello = (props) => {
  console.log(props)
  return (
    <p>Hello {props.name}, you are {props.age} years old!</p>
  )
}


const App = () => {
  const friends = ['Peter', 'Maya']
  return (
    <div>
      <p>{friends}</p>
    </div>
  )
}

export default App