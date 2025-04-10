import React, { useRef, useState, useEffect } from 'react';
// import { getSavedMovies, updateSavedCount } from '../appwrite2';

const ModalWin = ({id, title, overview, backdrop_path, openModal, closeModal}) => {
    const ref = useRef();

    const [modalMovie, setModalMovie] = useState([]);
    const [modalBuyList, setModalBuyList] = useState([]);
    const [modalRentList, setModalRentList] = useState([]);
    // const [savedMovies, setSavedMovies] = useState([]);

    const loadMovieStreamingData = () => {
        const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${API_KEY}`,
            }
          };

          console.log(`MovieID: ${id} | MovieName: ${title} | PosterPath: https://image.tmdb.org/t/p/w500/${backdrop_path}`);
        // search terms with Appwrite
        // updateSavedCount(title, id, backdrop_path);
          
        //Streaming data from TMDB...
          fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers`, options)
            .then(res => {
                if(!res.ok) {
                    throw new Error(`HTTP Error! Status: ${res.status}`);
                    setModalMovie([]);
                }
                return res.json();
            })
            .then(data => {
                if(data.results.US){
                    // console.log('No streaming data available');
                    // console.log('Streaming data:', data.results.US);
                    // console.log(data.results.US.buy)

                    setModalMovie(data.results.US||[]);
                    setModalBuyList(data.results.US.buy||[]);
                    setModalRentList(data.results.US.flatrate||[]);
                }else{
                    // console.log('Non Streaming data:', data.results);
                    setModalMovie([]);
                    setModalBuyList([]);
                    setModalRentList([]);
                }
            })
            .catch(err => {                
                console.error('Fetch Error: ',err)
            });
    
    }

    useEffect(() => {
        if(openModal){
            loadMovieStreamingData();
            ref.current.showModal();           
        }else{
            ref.current.close();
        }
    }, [openModal])

    //   useEffect(() => {
    //   }, []);

  return (
    <dialog ref={ref} id={id} onCancel={closeModal} className="modal">
        <button className='modal-close' onClick={closeModal}>Close</button>
        <h1>{title}</h1>
        <h4>#{id}</h4>
        <img className='modalMainImg' src={backdrop_path ? `https://image.tmdb.org/t/p/w500/${backdrop_path}`:`/no-movie.png`} alt={title}/>
        <p className='modalDescrip'>{overview}</p>
        <hr />
        <h3><a href={modalMovie.link} target='_blank'>{title} -- TMDB Page</a></h3>
        <h4>Available to stream on these platforms:</h4>
        <ul>
        {
            modalRentList.map((item, index) => (
                <li key={index} className='modalBuy'>
                    <img src={`https://image.tmdb.org/t/p/w500/${item.logo_path}`} alt={item.provider_name} width="50" height="50"/>
                    <p>{item.provider_name}</p>
                </li>
            ))
        }        
        </ul>
        {/* <h4>Available for purchase on these platforms:</h4>
        <ul>
        {
            modalBuyList.map((item, index) => (
                <li key={index} className='modalBuy'>
                    <img src={`https://image.tmdb.org/t/p/w500/${item.logo_path}`} alt={item.provider_name} width="50" height="50"/>
                    <p>{item.provider_name}</p>
                </li>
            ))
        }        
        </ul> */}
        

    </dialog>
  )
}

export default ModalWin