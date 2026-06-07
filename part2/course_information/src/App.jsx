
const Header = ({name}) => {
  console.log(name)
  return (

    <h1>{name}</h1>
  )
}
const Part = (props) =>{
  return(
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Content = (props) => {

  return (
    <>
      {props.parts.map(part => <Part key={part.id} part={part}></Part>)}
    </>
    )
  }
  

const Total = (props) =>{
  return (
    <>
      <p><b>Total of {props.parts.reduce((acc, exers)=> acc + exers.exercises , 0)} exercises</b> </p>
    </>
  )
}

const Course = (props) => {
  return(
    <>
      <Header name={props.course.name}></Header>
      <Content parts={props.course.parts}></Content>
      <Total parts={props.course.parts}></Total>
    </>
  )
  //console.log(props.course.name)
}

const Courses = ({courses}) => {
    return (
      <>
        {courses.map( (course, i) => <Course key={i} course={course}></Course>)}
      </>
    )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Courses courses={courses} />
}

export default App
