
const Header = (props) => {
  return (
    <>
      <h1>
        {props.course}
      </h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      {props.parts.map((e,i)=>(
        <Part key={i} part={e.name} exercises={e.exercises}></Part>
      ))}
    </>
  )
}

const Total = (props) => {
  let numOfExcercises = 0
  props.parts.forEach(e => {
    numOfExcercises+=e.exercises
  });
  return (
    <>
      <p>Number of exercises {numOfExcercises}</p>
    </>
  )
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}></Header>
      <Content 
        parts={course.parts}
      ></Content>
      <Total
        parts={course.parts}
      ></Total>
    </div>
  )
}

export default App
