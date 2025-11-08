import { useSelector, useDispatch } from "react-redux";
import { updateVote } from "../reducers/anecdoteReducer";

const Anecdotes = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) =>
    state.filter
      ? state.anecdotes
          .filter((anecdote) =>
            anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
          )
          .toSorted((a, b) => b.votes - a.votes)
      : state.anecdotes.toSorted((a, b) => b.votes - a.votes)
  );

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                dispatch(updateVote(anecdote.id, anecdote.votes));
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
