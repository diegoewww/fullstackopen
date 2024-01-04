
const Part = ({ text, value }) => {
  return (
    <div>
      <p> {text} {value}  </p>
    </div>
  )
}

const Content = ({ course }) => {

  return (
    <div>
      {
        course.parts.map(part => (
          <Part key={part.id} text={part.name} value={part.exercises} />
        ))
      }
    </div>
  )
}

const Total = ({ course }) => {

  const total = course.parts.reduce((sum, current) => {
    return sum + current.exercises
  }, 0)

  return (
    <h2>Total of {total} exercises</h2>
  )
}

const Header = ({ course }) => {
  return (
    <h1>
      {
        course.name
      }
    </h1>
  )
}


const Course = ({ course }) => {
  return (
    <div>
      <Header course={course}></Header>
      <Content course={course}></Content>
      <Total course={course}></Total>
    </div>
  )
}

export default Course
