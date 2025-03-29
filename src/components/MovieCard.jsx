import React, { useEffect, useState } from 'react'
import ModalWin from './ModalWin'

const MovieCard = ({ movie:{id, title, overview, vote_average, poster_path, backdrop_path, release_date, original_language, adult}}) => {

const [modal, setModal] = useState(false);

  return (
    <li className='movie-card' >
        <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}`:`/no-movie.png`} alt={title}/>        
        <div className="mt-4">
            <h3>{title}</h3>            
            <div className="content">
                <div className="rating">
                    <img src="Star.svg" alt="star-icon"/>
                    <p>{vote_average ? vote_average.toFixed(1):'N/A'}</p>
                </div>

                <span>.</span>
                <p className="lang">{original_language}</p>
                <span>.</span>
                <p className="year">{release_date ? release_date.split('-')[0]:'N/A'}</p>
                <span>{adult ? '|':''}</span>
                <p className="adult">{adult ? 'Adult':''}</p>
            </div>
            <button id={id} onClick={() => setModal(true)}>See Info</button>
        </div>
        <ModalWin id={id} title={title} overview={overview} backdrop_path={backdrop_path} openModal={modal} closeModal={() => setModal(false)}/>
    </li>
  )
}

export default MovieCard