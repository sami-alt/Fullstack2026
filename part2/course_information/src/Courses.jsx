
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

export default Courses