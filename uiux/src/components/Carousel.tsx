import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';


import { useState } from 'react';

import { data } from '../data';

const Carousel = () => {
    const [slide, setSlide] = useState(0)
    const [isVisible, setIsVisible] = useState(true);
    function nextSlide() {
        setSlide(slide === data.length - 1 ? 0 : slide + 1)
    }
    function previousSlide() {
        setSlide(slide === 0 ? data.length - 1 : slide - 1)
    }

    return (
        <>
            <div className='bg-black h-10 flex items-center justify-center' onClick={() => { setIsVisible(prev => !prev) }}>
                <p className='text-white underline cursor-pointer'>View Advertisement</p>
                <KeyboardArrowDownRoundedIcon sx={{
                    color: 'white',
                    transform: isVisible ? 'rotate(180deg)' : 'rotate(0deg)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease-in-out',
                }} />
            </div>
            <hr />
            {isVisible ?
                <div className='h-[500px] mx-auto relative' >
                    {/* <CancelOutlinedIcon sx={{ position: 'absolute', right: -8, top: -8, cursor: 'pointer', color: 'red' }} onClick={handleClose} /> */}
                    <div className="flex items-center justify-center  overflow-auto  ">

                        <ArrowCircleLeftIcon fontSize='large' sx={{ color: 'white', position: 'absolute', left: '1rem', cursor: 'pointer', filter: 'drop-shadow(0px 0px 5px #555)' }} onClick={previousSlide} />
                        {data.map((item, idx) => {
                            return slide === idx ? <img key={idx} className="rounded-xl shadow-lg w-full h-[500px] " src={item.src} alt={item.alt} /> : null
                        })}
                        <ArrowCircleRightIcon fontSize='large' sx={{ color: 'white', position: 'absolute', right: '1rem', cursor: 'pointer', filter: 'drop-shadow(0px 0px 5px #555)' }} onClick={nextSlide} />
                        <span className='flex absolute bottom-[1rem] '>
                            {data.map((_, idx) => {
                                return <button key={idx} className={`${slide === idx ? 'bg-white' : 'bg-gray-300'} size-[0.5rem] rounded-full border-none outline-none mr-1 shadow-lg pointer`} onClick={() => { setSlide(idx) }} ></button>
                            })}
                        </span>
                    </div>
                </div> : <></>}
        </>
    )
}

export default Carousel