import LocalMallIcon from '@mui/icons-material/LocalMall';

const Footer = () => {
    return (
        <footer className="bg-black mt-[140px] text-white ">
            <div className='flex flex-col items-center w-min px-12 py-4'>
                <LocalMallIcon color='primary' sx={{ fontSize: "80px", color: "#DDBDD5" }} />
                <h1 className='text-[28px] font-bold'>Hamro E-commerce</h1>
            </div>
            <hr />
            <div className='flex px-12 py-2 justify-center text-[12px]'>@Copyright Hamro E-commerce</div>

        </footer>
    )
}

export default Footer