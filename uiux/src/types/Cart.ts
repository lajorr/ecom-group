
export type CartProduct = {
    _id: string,
    product: {
        _id: string,
        name: string
    },
    price: number,
    quantity: number,
    sub_total: number,
    image: string,
}

export type CartResponse = {
    items: CartProduct[],
    cart_total: number
}

export type CartRequest = {
    image: string,
    product: string,
    price: number,
    quantity: number,
    sub_total: number
}