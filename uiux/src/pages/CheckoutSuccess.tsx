import { useNavigate } from "react-router-dom"

const CheckoutSuccess = () => {
    const navigate = useNavigate()
    return (
        <div className="my-12 max-w-[600px] mx-auto px-8 py-4 rounded-[8px] bg-gray-300" >
            <h1 className="text-2xl font-bold text-center" >Checkout Success</h1>
            <p className="text-center">Your order has been placed successfully</p>

            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold mt-4">Order Details</h2>
                <table className=" w-max mb-6" cellPadding="8px">
                    <tr >
                        <td className="">
                            <p>Order Id:</p>
                        </td>
                        <td><p>12314123</p></td>
                    </tr>
                    <tr>
                        <td className="">
                            <p>Full Name:</p>
                        </td>
                        <td><p>12314123</p></td>
                    </tr>
                    <tr>
                        <td className="">
                            <p>Phone:</p>
                        </td>
                        <td><p>12314123</p></td>
                    </tr>
                    <tr>
                        <td className="">
                            <p>Delivery Address:</p>
                        </td>
                        <td><p>12314123</p></td>
                    </tr>
                </table>
            </div>

            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded" onClick={() => { navigate('/') }}>Go back</button>
        </div>
    )
}

export default CheckoutSuccess