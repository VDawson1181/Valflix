import React, { useRef, useEffect } from 'react';

const ModalWin = ({id, title, overview, backdrop_path, openModal, closeModal}) => {
    const ref = useRef();

    useEffect(() => {
        if(openModal){
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
        <button className='modal-close' onClick={closeModal}>Close</button>
    </dialog>
  )
}

export default ModalWin