"use client";

import Image from "next/image";
import { useBackend } from "@/context";
import { useState } from "react";
import { bungee } from "@/lib";
import { IconMapPinFilled, IconStarFilled, IconPlus, IconMinus, IconShoppingBagPlus, IconShoppingBagEdit } from "@tabler/icons-react";
import { Button } from "@/components";
import { Cart, StripeConfigAdaper } from "@/props";

function getLocalPrice(cart: Cart[], id: string, unit_amount: number | null) {

    const localCart = cart.find((item) => item.id === id);

    if (!localCart || !unit_amount) return 0;

    return (localCart?.quantity * unit_amount) / 100;
}

export function Item({ ...price }: StripeConfigAdaper) {

    const { id, unit_amount, nickname: name, description } = price;

    const { addToCart, cart } = useBackend();
    const [quantity, setQuantity] = useState(0);

    const handleSubstract = () => {
        if (quantity > 0) setQuantity(quantity - 1);
    }

    return (
        <article className="text-negro flex justify-center flex-wrap items-center bg-white rounded-2xl mx-auto p-5 gap-10">
            <figure className="relative w-[360px] aspect-square rounded-2xl bg-negro">
                <Image src={price.image_url} alt="Imagen del producto" fill className="rounded-2xl object-cover"></Image>
            </figure>
            <aside className="w-[320px] flex flex-col justify-between min-h-[320px]">
                <header className="flex flex-col gap-4">
                    <h2 className={`${bungee.className} text-3xl`}>{name}</h2>
                    <p>{description}</p>
                    <footer className="flex gap-2.5 items-center">
                        <section className="font-medium flex gap-2.5 items-center bg-azul px-4 text-xs py-2 w-fit rounded-2xl text-white">
                            <IconMapPinFilled size={16} />
                            Disponible en {price.avaiable_at}
                        </section>
                        <section className="text-azul/60 flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <IconStarFilled key={i} size={16} />
                            ))}
                        </section>
                    </footer>
                </header>
                <footer className="flex flex-col gap-4">
                    <section className="flex justify-between items-center w-full mt-2 p-2.5">
                        <p className="text-xs font-medium text-zinc-500">Precio por dispositivo único</p>
                        <aside className="flex flex-col justify-center items-end">
                            <p className="text-2xl font-bold">{unit_amount! / 100}€</p>
                            <p className="text-azul text-xs font-medium">Seleccionado: {getLocalPrice(cart, id, unit_amount)}€</p>
                        </aside>
                    </section>
                    <section className="flex gap-2.5 justify-between">
                        <section className="flex items-center">
                            <button onClick={handleSubstract} className="size-9 flex items-center justify-center text-black/60">
                                <IconMinus size={20} />
                            </button>
                            <p className="size-9 flex items-center justify-center">
                                {quantity}
                            </p>
                            <button onClick={() => setQuantity(quantity + 1)} className="size-9 flex items-center justify-center text-black/60">
                                <IconPlus size={20} />
                            </button>
                        </section>
                        <Button dashed onClick={() => {
                            addToCart({ id: `${id}`, quantity: quantity, price: unit_amount as number, name: name as string })
                        }}>
                            {!cart.find((item) => item.id === id) ? (
                                <section className="flex gap-2 items-center">
                                    Añadir al carro
                                    <IconShoppingBagPlus size={20} />
                                </section>
                            ) : (
                                <section className="flex gap-2 items-center">
                                    Cambiar cantidad
                                    <IconShoppingBagEdit size={20} />
                                </section>
                            )}
                        </Button>
                    </section>
                </footer>
            </aside>
        </article >
    )

}