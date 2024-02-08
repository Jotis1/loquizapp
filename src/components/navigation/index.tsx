"use client";

import Link from "next/link";
import { IconShoppingBag } from "@tabler/icons-react";
import { Cart } from "@/components";
import { useBackend } from "@/context";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { bungee } from "@/lib";

export function NavBar() {

    const [showCart, setShowCart] = useState(false);
    const { cart } = useBackend();

    return (
        <motion.nav
            animate={{ borderRadius: showCart ? "20px 20px 0px 20px" : "20px 20px 20px 20px" }}
            className="z-10 font-medium sticky top-2.5 flex h-[60px] items-center justify-between rounded-2xl bg-white backdrop-blur-md border-white border-2  px-5 py-2.5">
            <aside className="flex h-full items-center gap-2.5">
                <Link href={"/"} className="w-20 h-full rounded-2xl bg-amarillo"></Link>
                <p className={`${bungee.className}`}>Tour City Games</p>
            </aside>
            <aside>
                <button onClick={() => setShowCart(!showCart)} className="flex gap-2.5 text-negro text-sm">
                    <p>Tu cesta</p>
                    <figure className="relative">
                        <IconShoppingBag size={20} />
                        <AnimatePresence>
                            {cart.length > 0 && (
                                <motion.span
                                    key={"cart"}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="size-2 rounded-full bg-rojo absolute top-0 right-0"></motion.span>
                            )}
                        </AnimatePresence>
                    </figure>
                </button>
            </aside>
            <AnimatePresence>
                {showCart && (
                    <motion.section
                        initial={{ opacity: 0, scale: .95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: .95, y: 10 }}
                        className="absolute top-full right-0">
                        <Cart />
                    </motion.section>
                )}
            </AnimatePresence>
        </motion.nav >
    )
}