import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import Pagination from './components/Pagination';
import { useDebounce } from 'react-use';


const API_BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_Options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movies, setMovies] = useState([]);
  const [moviePage, setMoviePage] = useState(1);
  const [movieTotalPages, setTotalMoviePages] = useState(500);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');


  // Debounce the search term to avoid too many API calls by waiting for the user to stop typing for 500ms
  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm);
    },
    500,
    [searchTerm]
  );

  const fetchMovies = async (query='', moviePage) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = query 
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${moviePage}`
      // :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      :`${API_BASE_URL}/discover/movie?include_adult=false&include_video=true&language=en-US&page=${moviePage}&sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_Options);
      
      if(!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(debouncedSearchTerm, data);

      if(data.Response === "False") {
        setErrorMessage(data.Error||'Failed to fetch movies. Please try again later.');
        setMovies([]);
        return;
      }

      setMovies(data.results||[]);
      // setMoviePage(data.page||[]);
      setTotalMoviePages(data.total_pages||[]);
      

    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Failed to fetch movies. Please try again later.');
    } finally{
      setIsLoading(false);
    }
  }

  // Pagination functions start
  const firstPage = () => {
    if(moviePage === 1) return;
    setMoviePage(1);
  }

  const prevPage = () => {
    if(moviePage === 1) return;
    setMoviePage(moviePage - 1);
  }

  const nextPage = () => {
    if(moviePage === movieTotalPages) return;
    if(moviePage === 500) return;
    setMoviePage(moviePage + 1);
  }

  const lastPage = () => {
    if(moviePage === 500) return;
    if(movieTotalPages > 500){
      setMoviePage(500);
      return;
    };
    setMoviePage(movieTotalPages);
  }
  // Pagination functions end



  useEffect(() => {
    fetchMovies(debouncedSearchTerm, moviePage);
  }, [debouncedSearchTerm, moviePage]);

  return (
    <main>
      <div className="pattern"/>
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without The Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className="all-movies">
          <h2 className='mt-[40px]'>All Movies</h2>

          {isLoading ? (
            <Spinner/>
          ) : errorMessage ? (
            <p className="error-message text-red-500">{errorMessage}</p>
          ):(
            <ul>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}

        </section>
        {/* <h1 className="text-white">{searchTerm}</h1> */}
        <Pagination 
          moviePage={moviePage} 
          setMoviePage={setMoviePage} 
          movieTotalPages={movieTotalPages} 
          firstPage={firstPage} 
          prevPage={prevPage} 
          nextPage={nextPage} 
          lastPage={lastPage}
        />
      </div>
    </main>
  )
}

export default App