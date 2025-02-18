import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { CartProduct } from '../../types/Cart';

type CartOrderTileProps = {
    order: CartProduct;
    removeItem: (id: string) => void;
    incrementQuantity: (id: string) => void;
    decrementQuantity: (id: string) => void;
}

const CartOrderTile = ({ order, removeItem, incrementQuantity, decrementQuantity }: CartOrderTileProps) => {
    return (
        <div className="relative px-6" >
            <button className="absolute size-6 top-[-8px] left-4 bg-red-500 rounded-full flex justify-center items-center" onClick={() => { removeItem(order.product._id) }} >
                <CloseRoundedIcon fontSize='small' sx={{ color: "white" }} />
            </button>
            <div key={order.product._id} className="grid grid-cols-4 gap-2 items-center place-items-end text-[16px]" >
                <div className="flex items-center gap-2 place-self-start">
                    <img className="size-16 object-cover rounded-[4px]" src={order.product.image} alt="" />
                    <div className="font-[500] ">{order.product.name}</div>
                </div>
                <div>${order.product.price.toFixed(2)}</div>
                <div className=" border flex gap-2" >
                    <button className='bg-green-400 rounded-[4px]'
                        onClick={() => incrementQuantity(order.product._id)}>
                        <AddRoundedIcon sx={{ color: "white" }} />
                    </button>
                    {order.quantity}
                    <button className='bg-red-500 rounded-[4px]'
                        onClick={() => decrementQuantity(order.product._id)}>
                        <RemoveRoundedIcon sx={{ color: "white" }} />
                    </button>
                </div>
                <div>${order.sub_total.toFixed(2)}</div>
            </div>
            <hr className='mt-4 h-0.5 bg-black/30 ' />
        </div>
    )
}
export default CartOrderTile