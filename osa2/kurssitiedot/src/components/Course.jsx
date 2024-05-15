const Part = ({part}) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    )
  }
  
const Content = ({parts}) => {
    return (
        <>
        {parts.map(part=>
            <Part key={part.id} part={part}></Part>
        )}
        </>
    )
}
  
const Course = ({course}) => {
    const total = course.parts.reduce((acc,p)=>{
        return acc+p.exercises
    },0)

    return (
        <>
        <h1>{course.name}</h1>
        <Content parts={course.parts}></Content>
        <b>total of {total} exercises</b>
        </>
    )
}

export default Course

