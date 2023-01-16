import React from 'react'

const SearchBar = ({cityName,setCityName}) => {
  return (
   <div className="search__bar">
        <input
          type="text"
          className="search__input"
          placeholder="Enter a city name"
          value={cityName}
          onChange={(e) => setCityName(e.target.value.trim())}
        />
      </div>
  )
}

export default SearchBar