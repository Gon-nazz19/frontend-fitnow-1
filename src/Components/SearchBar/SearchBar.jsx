import React from 'react';
import './SearchBar.css';
// Importar el ícono de búsqueda
import { FaSearch } from 'react-icons/fa';

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">
      <input 
        type="text" 
        placeholder="Buscar rutina por nombre..."
        value={searchTerm}
        onChange={onSearchChange}
      />
      <button>
        <FaSearch />
      </button>
    </div>
  );
}

export default SearchBar;