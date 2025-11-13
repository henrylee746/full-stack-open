const Input = ({ label, blogData, setBlogData }) => {
  return (
    <div>
      <label>
        {label}
        <input
          type="text"
          value={blogData[label]}
          placeholder={label}
          onChange={({ target }) =>
            setBlogData({ ...blogData, [label]: target.value })
          }
        />
      </label>
    </div>
  );
};

export default Input;
