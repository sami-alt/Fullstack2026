
const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}
const Part = (props) =>{
  return(
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Constent = (props) => {
  return (
    <>
      {props.parts.map(part => <Part part={part}></Part>)}
    </>
  )
  }
  
const Total = (props) =>{
  console.log('total',props.parts[0].exercises)
  return (
    <>
      <p>Number of exercises {props.parts.reduce((acc, exers)=> acc + exers.exercises , 0)}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
 const parts = [
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

  return (
    <>
      <Header course={course}/>
      <Constent parts={parts} />
      <Total  parts={parts}/>
    </>
  )
}

export default App