import { Stripe } from "stripe";

export interface BackendContext {
    session: Stripe.Response<Stripe.Checkout.Session> | undefined;
    setSession: (session: Stripe.Response<Stripe.Checkout.Session>) => void;
    cart: Cart[];
    setCart: (cart: Cart[]) => void;
    addToCart: (cart: Cart) => void;
}

export interface Cart {
    id: string;
    quantity: number;
    price: number;
    name: string;
}