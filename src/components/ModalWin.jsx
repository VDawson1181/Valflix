import React, { useRef, useEffect } from 'react';


const ModalWin = ({id, title, overview, backdrop_path, openModal, closeModal}) => {
    const ref = useRef();

    const loadMovieStreamingData = () => {
        const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${API_KEY}`,
            }
          };
          
          fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers`, options)
            .then(res => {
                if(!res.ok) {
                    throw new Error(`HTTP Error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                if(data.results.US){
                    // console.log('No streaming data available');
                    console.log('Streaming data:', data.results.US);
                }else{
                    console.log('Non Streaming data:', data.results);
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

  return (
    <dialog ref={ref} id={id} onCancel={closeModal} className="modal">
        <h1>{title}</h1>
        <h2>#{id}</h2>
        <img src={backdrop_path ? `https://image.tmdb.org/t/p/w500/${backdrop_path}`:`/no-movie.png`} alt={title}/>
        <p className='modalDescrip'>{overview}</p>
        <hr />

        <button className='modal-close' onClick={closeModal}>Close</button>
    </dialog>
  )
}

export default ModalWin