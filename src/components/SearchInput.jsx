import './SearchInput.css';

function SearchInput({ searchTerm, onSearchChange }) {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Поиск задач..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default SearchInput;