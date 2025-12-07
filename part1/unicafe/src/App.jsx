import { useState } from "react";

const Button = ({ rating, onClick }) => (
  <button onClick={onClick}>{rating}</button>
);

const StatisticLine = ({ text, value }) => (
  <>
    <td>{text}</td>
    <td>{value}</td>
  </>
);

const Stats = ({ good, neutral, bad }) => {
  const arr = [good, neutral, bad];
  const total = arr.reduce((a, b) => a + b, 0);
  return (
    <>
      <h1>statistics</h1>
      <br />
      {good || neutral || bad ? (
        <div>
          <table>
            <tbody>
              <tr>
                <StatisticLine text="good" value={good} />
              </tr>
              <tr>
                <StatisticLine text="neutral" value={neutral} />
              </tr>
              <tr>
                <StatisticLine text="bad" value={bad} />
              </tr>
              <tr>
                <StatisticLine text="total" value={good + neutral + bad} />
              </tr>
              <tr>
                <StatisticLine text="average" value={(good - bad) / total} />
              </tr>
              <tr>
                <StatisticLine
                  text="positive"
                  value={(good / total) * 100 + "%"}
                />
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (rating) => {
    if (rating === "good") setGood(good + 1);
    else if (rating === "neutral") setNeutral(neutral + 1);
    else setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <br />
      <Button rating="good" onClick={() => handleClick("good")} />
      <Button rating="neutral" onClick={() => handleClick("neutral")} />
      <Button rating="bad" onClick={() => handleClick("bad")} />
      <Stats good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
