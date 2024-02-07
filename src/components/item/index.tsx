"use client";

import { useBackend } from "@/context";
import { useState } from "react";
import { Stripe } from "stripe";
import { bungee } from "@/lib";
import { IconMapPinFilled, IconStarFilled, IconPlus, IconMinus, IconShoppingBagPlus, IconShoppingBagMinus } from "@tabler/icons-react";
import { Button } from "@/components";
import { AnimatePresence, motion } from "framer-motion";

export function Item({ ...price }: Stripe.Price & { description: string }) {

    const { id, unit_amount, nickname: name, description } = price;

    const { addToCart, cart } = useBackend();
    const [quantity, setQuantity] = useState(0);

    const handleAdd = () => {
        setQuantity(quantity + 1);
    };

    const handleSubstract = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <article className="text-negro flex justify-center flex-wrap items-center bg-white rounded-2xl mx-auto p-5 gap-10">
            <figure className="w-[360px] aspect-square rounded-2xl bg-negro"></figure>
            <aside className="w-[320px] flex flex-col justify-between min-h-[320px]">
                <header className="flex flex-col gap-4">
                    <h2 className={`${bungee.className} text-3xl`}>{name}</h2>
                    <p>{description}</p>
                    <footer className="flex gap-2.5 items-center">
                        <section className="font-medium flex gap-2.5 items-center bg-azul px-4 text-xs py-2 w-fit rounded-2xl text-white">
                            <IconMapPinFilled size={16} />
                            Disponible en León
                        </section>
                        <section className="text-azul/60 flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <IconStarFilled key={i} size={16} />
                            ))}
                        </section>
                    </footer>
                </header>
                <footer className="flex flex-col gap-4">
                    <section className="text-end h-9 p-2.5 text-2xl font-bold">
                        10€
                    </section>
                    <section className="flex gap-2.5 justify-between">
                        <Button>Comprar ahora</Button>
                        <Button dashed onClick={() => {
                            let exist = cart.find((item) => item.id == id);
                            addToCart({ id: `${id}`, quantity: exist ? 0 : 1, price: unit_amount as number, name: name as string })
                        }}>
                            {!cart.find((item) => item.id === id) ? (
                                <section className="flex gap-2 items-center">
                                    Añadir al carro
                                    <IconShoppingBagPlus size={20} />
                                </section>
                            ) : (
                                <section className="flex gap-2 items-center">
                                    Quitar del carro
                                    <IconShoppingBagMinus size={20} />
                                </section>
                            )}
                        </Button>
                    </section>
                </footer>
            </aside>
        </article >
    )

}