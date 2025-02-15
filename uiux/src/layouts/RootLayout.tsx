import { Outlet } from "react-router-dom";

import Carousel from '../components/Carousel';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';


const RootLayout = () => {
    return (
        <div className="max-w-[1536px] mx-auto">
            <Carousel />
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default RootLayout