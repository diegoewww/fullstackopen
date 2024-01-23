// import { useState } from 'react';
// import styles from './styles.module.css';


// const Button = () => {
//   const [first, setFirst] = useState(0)
//   return (
//     <>
//       <button
//         className={styles.button}
//         onClick={() => setFirst(first + 1)}
//       >
//         Happy Coding! {first}
//       </button>
//     </>
//   )
// }

const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <p>Number of exercises: {props.course.parts[0].exercise + props.course.parts[1].exercise + props.course.parts[2].exercise} </p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.course.parts[0].name} exercises={props.course.parts[0].exercise} />
      <Part part={props.course.parts[1].name} exercises={props.course.parts[1].exercise} />
      <Part part={props.course.parts[2].name} exercises={props.course.parts[2].exercise} />
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.part}: {props.exercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercise: 10
      },
      {
        name: 'Using Props to pass data',
        exercise: 7
      },
      {
        name: 'State of a component',
        exercise: 14
      }
    ]
  }



  return (
    <div>
      <Header course={course} />
      <Content
        course={course} />
      <Total
        course={course} />
      {/* <Button> </Button> */}
    </div>
  )
}

export default App