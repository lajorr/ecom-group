import { useNavigate } from "react-router-dom"

const Checkout = () => {
    const navigate = useNavigate()
    return (
        <div className="my-12 max-w-[600px] mx-auto px-8 py-4 rounded-[8px] bg-gray-300">
            <h1 className="text-[20px] font-bold mb-4 text-center">Delivery Information</h1>
            <form className="flex flex-col" >
                <div className="w-full my-4">
                    <label className="mb-2.5 block text-black">
                        Name <span className="text-meta-1">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="John Doe"
                        className="w-full rounded border-[1.5px] border-stroke py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary"
                    />
                </div>
                <div className="w-full my-4">
                    <label className="mb-2.5 block text-black">
                        Address <span className="text-meta-1">*</span>
                    </label>
                    <input
                        type="text"
                        name="address"
                        required
                        placeholder="Nepal"
                        className="w-full rounded border-[1.5px] border-stroke py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary"
                    />
                </div>
                <div className="w-full my-4">
                    <label className="mb-2.5 block text-black">
                        Phone <span className="text-meta-1">*</span>
                    </label>
                    <input
                        type="number"
                        name="phone"
                        required
                        placeholder="9800000000"
                        className="w-full rounded border-[1.5px] border-stroke py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary"
                    />
                </div>
                <button className="px-4 py-2 rounded-md bg-green-400 my-4" onClick={() => {
                    navigate('/cart/checkout/success')
                }} >Confirm</button>
            </form>
        </div>
    )
}

export default Checkout