
export type CartProduct = {
    product: {
        _id: string,
        name: string,
        image: string,
        price: number,
    },
    quantity: number,
    sub_total: number,
}

export type CartResponse = {
    _id: string, //cart id
    items: CartProduct[],
    cart_total: number,
    status: "pending" | "paid"
}

export type CartRequest = {
    product_id: string,
    quantity: number,
    sub_total: number,
    cart_id?: string | null
}

export type CartCheckoutRequest = {
    full_name: string
    address: string
    total_amount: number
    cart_id: string
    phone: number
}