import './FilterDropdown.css';

function FilterDropdown({ viewMode, setViewMode }) {
  const handleChange = (event) => {
    setViewMode(event.target.value);
  };

  return (
    <div className="filter-dropdown-container">
      <select 
        value={viewMode} 
        onChange={handleChange}
        className="filter-select"
      >
        <option value="current">Current list</option>
        <option value="old">Old tasks</option>
      </select>
    </div>
  );
}

export default FilterDropdown;