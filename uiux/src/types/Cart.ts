
export type CartProduct = {
    product_name: string,
    product_id: string,
    price: number,
    quantity: number,
    sub_total: number,
    image: string,

}

export type CartResponse = {
    _id: string,
    items: CartProduct[],
    cart_total: number
}

export type CartRequest = {
    image: string,
    product_name: string,
    product_id: string,
    price: number,
    quantity: number,
    sub_total: number
}