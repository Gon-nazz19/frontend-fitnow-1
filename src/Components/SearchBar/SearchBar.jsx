import React from 'react';
import './SearchBar.css';

function SearchBar() {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Buscar rutina por nombre..." />
      <button>
        <i className="fa fa-search"></i> {/* Requiere font-awesome o un ícono personalizado */}
      </button>
    </div>
  );
}

export default SearchBar;
