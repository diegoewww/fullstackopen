const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Total = ({ sumOfExercises }) => {
  return <p>Number of exercises: {sumOfExercises}</p>;
};

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part}: {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, index) => (
        <Part key={index} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const App = () => {
  const course = 'Half Stack application development';
  const parts = [
    { name: 'Fundamentals of React', exercises: 10 },
    { name: 'Using props to pass data', exercises: 7 },
    { name: 'State of a component', exercises: 14 },
  ];

  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total sumOfExercises={totalExercises} />
    </div>
  );
};

export default App;
