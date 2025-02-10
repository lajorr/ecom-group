import LocalMallIcon from '@mui/icons-material/LocalMall';

const Header = () => {
    return (
        <div className="flex justify-center">
            <LocalMallIcon fontSize='medium' color='primary' sx={{ color: "#DDBDD5", marginX: 1 }} />
            <h1 className="text-xl font-bold">
                Hamro E-commerce
            </h1>
        </div>
    )
}

export default Header