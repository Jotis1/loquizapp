"use client";

import { useBackend } from "@/context";
import { Cart } from "@/props";
import { Button } from "@/components"
import { AnimatePresence, motion } from "framer-motion";
import { IconShoppingBagX } from "@tabler/icons-react";
import CartItem from "./item";

function calculateTotalMoney(cart: Cart[]) {

    let total = 0;

    cart.forEach((product) => {
        total += product.price * product.quantity;
    })

    return total;

}

function getPayInfo(cart: Cart[]) {
    if (cart.length === 0) return null;

    const products = cart.map((item) => ({
        id: item.id,
        quantity: item.quantity
    }));

    if (products.length === 0) return null;

    return products[0];

}

export function Cart() {

    const { cart } = useBackend();
    const total = calculateTotalMoney(cart);

    return (
        <section className="rounded-b-2xl translate-y-0.5 font-medium text-sm p-2.5 bg-white ring-2 ring-white sm:w-[400px] w-full flex flex-col gap-2.5 px-5">
            {cart.length === 0 ? (
                <section className="text-negro flex flex-col gap-2.5 size-full items-center justify-center h-40">
                    <p className="text-lg">Esto está vacío</p>
                    <p className="text-zinc-400">Añade algo a tu cesta para poder verlo</p>
                    <IconShoppingBagX className="text-zinc-400" size={20} />
                </section>
            ) : (
                <>
                    <p className="text-azul">Tu cesta</p>
                    {
                        cart.map((item) => (
                            <CartItem key={item.id} {...item} />
                        ))
                    }
                    <span className="h-0.5 rounded-lg bg-negro" />
                    <section className="flex justify-between items-center h-9 relative">
                        <p className="text-azul">Total</p>
                        <AnimatePresence>
                            <section
                                className="absolute right-0 px-4 py-0.5 bg-cielo/60 rounded-2xl text-azul">
                                <motion.p
                                    key={total}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}>
                                    {total / 100}€
                                </motion.p>
                            </section>
                        </AnimatePresence>
                    </section>
                    <span className="h-0.5 rounded-lg bg-negro" />
                    <footer className="flex items-center gap-2.5">
                        <Button pay priceID={getPayInfo(cart)?.id} quantity={getPayInfo(cart)?.quantity} type="secondary">
                            Comprar ya
                        </Button>
                    </footer>
                </>
            )
            }
        </section >
    );
}