const Filter = ({ filterName, setFilterName }) => {
  const handleFilterName = (e) => setFilterName(e.target.value);
  return (
    <div>
      filter by name: <input value={filterName} onChange={handleFilterName} />
    </div>
  );
};

export default Filter;
