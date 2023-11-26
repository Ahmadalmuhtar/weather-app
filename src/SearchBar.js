// src/SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [city, setCity] = useState('');

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const handleSearch = () => {
        onSearch(city);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter City"
                value={city}
                onChange={handleInputChange}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;
