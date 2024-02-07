"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Stripe } from "stripe";
import { BackendContext, Cart } from "@/props";

const BackendContext = createContext<BackendContext | null>(null);

export const BackendProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Stripe.Response<Stripe.Checkout.Session>>();
    const [cart, setCart] = useState<Cart[]>([]);

    const addToCart = (item: Cart) => {

        const { quantity, id, name, price } = item;

        const exist = cart.find((cartItem) => cartItem.id === id);

        if (exist) {

            if (quantity === 0) {
                const newCart = cart.filter((cartItem) => cartItem.id !== id);
                setCart(newCart);
                localStorage.setItem("cart", JSON.stringify(newCart));
                return;
            }

            const newCart = cart.map((cartItem) => {
                if (cartItem.id === id) {
                    return {
                        ...cartItem,
                        quantity
                    }
                } else {
                    return cartItem;
                }
            });

            setCart(newCart);
            localStorage.setItem("cart", JSON.stringify(newCart));
            return;
        }

        if (quantity === 0) {
            return;
        }

        const newCart = [...cart, { id, quantity, price, name }];

        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));

    }

    useEffect(() => {

        const localCart = localStorage.getItem("cart");

        if (localCart) {
            setCart(JSON.parse(localCart));
        };

    }, []);


    const value = {
        session,
        setSession,
        cart,
        setCart,
        addToCart
    };

    return (
        <BackendContext.Provider value={value}>
            {children}
        </BackendContext.Provider>
    );

};

export const useBackend = () => {
    const context = useContext(BackendContext);
    if (!context) {
        throw new Error("useBackend must be used within a BackendProvider");
    }
    return context;
}
