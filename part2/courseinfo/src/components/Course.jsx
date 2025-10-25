const Header = ({ name }) => <h1>{name}</h1>;

const Content = ({ parts }) => (
  <div>
    {parts.map((part, index) => (
      <Part name={part.name} exercises={part.exercises} key={part.id} />
    ))}
  </div>
);

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Total = ({ parts }) => (
  <p>Number of exercises {parts.reduce((a, b) => a + b.exercises, 0)}</p>
);

const Courses = ({ courses }) => {
  return (
    <>
      {courses.map((course) => (
        <div key={course.id}>
          <Header name={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </>
  );
};

export default Courses;
