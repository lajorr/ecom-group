import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import { useState } from 'react';

export const AdBanner = (props: any) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
    };

    return <>
        {isVisible && <div className="container  mt-2  relative p-0" style={{ height: props.height ?? 400 }}>
            <CancelOutlinedIcon sx={{ position: 'absolute', right: -8, top: -8, cursor: 'pointer', color: 'red' }} onClick={handleClose} />
            <div className=" bg-gradient-to-r from-gray-300 to bg-gray-400 size-full rounded-xl overflow-hidden">
                {props.children}
            </div>
        </div>}</>

}
