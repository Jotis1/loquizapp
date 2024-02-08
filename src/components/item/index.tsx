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
    const [quantity, setQuantity] = useState(1);

    const handleSubstract = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    }

    return (
        <article className="text-negro flex justify-center item:flex-row flex-col items-center bg-white rounded-2xl mx-auto p-5 gap-10">
            <figure className="flex grow relative item:h-[360px] h-72 aspect-square rounded-2xl bg-negro">
                {/* <Image src={price.image_url} alt="Imagen del producto" fill className="rounded-2xl object-cover"></Image> */}
            </figure>
            <aside className="item:w-80 w-72 flex flex-col justify-between min-h-80">
                <header className="flex flex-col gap-4">
                    <h2 className={`${bungee.className} item:text-3xl text-2xl`}>{name}</h2>
                    <p className="item:text-base text-sm">{description}</p>
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
                        <aside className="item:text-sm text-xs flex flex-col justify-center">
                            <p className="font-medium text-zinc-500">Precio por dispositivo único</p>
                            <p className="text-azul font-medium">Dispositivos: {quantity}</p>
                        </aside>
                        <p className="text-2xl font-bold">{unit_amount! / 100}€</p>
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
                        <Button dashed pay={quantity > 0} priceID={price.id} quantity={quantity}>
                            <section className="flex gap-2 items-center">
                                Comprar
                                <IconShoppingBagPlus size={20} />
                            </section>
                        </Button>
                    </section>
                </footer>
            </aside>
        </article >
    )

}