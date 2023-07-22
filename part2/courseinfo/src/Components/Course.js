import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({course}) => {
    const {id, name, parts} = course;
    
    return <>
        <Header text={name} />
        <Content parts={parts} />
        <Total parts={parts}/>
    </>
}

export default Course;