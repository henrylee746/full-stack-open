import { useDispatch } from "react-redux";
import { handleChange } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  const handleTextChange = (event) => {
    dispatch(handleChange(event.target.value));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleTextChange} />
    </div>
  );
};

export default Filter;
