import React from 'react'

const Search = ({searchTerm, setSearchTerm}) => {
    return (
        <div className="search">
            <div>
                <img src="Search.svg" alt="search"/>
                <input 
                    type="text"
                    placeholder='Search for a movie'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <p onClick={(e) => setSearchTerm('')} >X</p>
            </div>
        </div>
    )
}

export default Search