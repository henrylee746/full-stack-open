import { useSelector, useDispatch } from "react-redux";
import { incrementVote } from "../reducers/anecdoteReducer";
import { displayNotification } from "../reducers/notificationReducer";

const Anecdotes = () => {
  const anecdotes = useSelector((state) =>
    state.filter
      ? state.anecdotes
          .filter((anecdote) =>
            anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
          )
          .toSorted((a, b) => b.votes - a.votes)
      : state.anecdotes.toSorted((a, b) => b.votes - a.votes)
  );
  const dispatch = useDispatch();

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                dispatch(incrementVote(anecdote.id));
                dispatch(displayNotification(`You voted ${anecdote.content}`));
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Anecdotes;
