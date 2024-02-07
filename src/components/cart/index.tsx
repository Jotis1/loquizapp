"use client";

import { useBackend } from "@/context";
import { Cart } from "@/props";
import { Button } from "@/components"
import { AnimatePresence, motion } from "framer-motion";
import CartItem from "./item";

function calculateTotalMoney(cart: Cart[]) {

    let total = 0;

    cart.forEach((product) => {
        total += product.price * product.quantity;
    })

    return total;

}

export function Cart() {

    const { cart } = useBackend();
    const total = calculateTotalMoney(cart);

    return (
        <section className="rounded-b-2xl translate-y-0.5 font-medium text-sm p-2.5 bg-white ring-2 ring-white w-[400px] flex flex-col gap-2.5 px-5">
            <p className="text-azul">Tu cesta</p>
            {cart.map((item) => (
                <CartItem key={item.id} {...item} />
            ))}
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
                <Button type="secondary">
                    Añadir a la cesta
                </Button>
                <Button type="secondary" dashed>
                    Comprar ya
                </Button>
            </footer>
        </section>
    );
}