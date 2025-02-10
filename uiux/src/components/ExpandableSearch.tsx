import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useRef, useState } from 'react';

const ExpandableSearch = () => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isSearchVisible && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchVisible]);

    const handleSearchIconClick = () => {
        setIsSearchVisible(!isSearchVisible)

    }

    return (
        <div className='place-self-end h-full flex items-center text-white'>
            {isSearchVisible ? (<div className='inline'>
                <input ref={searchInputRef} className='text-black rounded-2xl h-8 w-30 p-2 mr-4 focus:outline-none focus:p-2 ' type="text" placeholder='Search' />
            </div>) : (<div
                className="inline-block h-8 w-0 transition-all duration-300 ease-in-out"
                style={{ overflow: 'hidden' }}
            ></div>)}
            <SearchIcon fontSize='large' sx={{ cursor: 'pointer', margin: 'auto' }} onClick={handleSearchIconClick} />
        </div>
    )
}

export default ExpandableSearch