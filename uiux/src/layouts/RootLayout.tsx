import { Outlet, useLocation } from "react-router-dom";

import Carousel from '../components/Carousel';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';


const RootLayout = () => {
    const location = useLocation()
    const isCategoryPage = location.pathname.startsWith("/category/");
    return (
        <div className="max-w-[1536px] mx-auto">
            {!isCategoryPage && <Carousel />}
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default RootLayout