"use client";

import Link from "next/link";
import { IconShoppingBag } from "@tabler/icons-react";
import { Cart } from "@/components";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function NavBar() {

    const [showCart, setShowCart] = useState(false);

    return (
        <motion.nav
            animate={{ borderRadius: showCart ? "20px 20px 0px 20px" : "20px 20px 20px 20px" }}
            className="font-medium sticky top-2.5 flex h-[60px] items-center justify-between rounded-2xl bg-white/10 backdrop-blur-md border-white border-2  px-5 py-2.5">
            <aside className="flex h-full items-center">
                <Link href={"/"} className="w-20 h-full rounded-2xl bg-amarillo"></Link>
            </aside>
            <aside>
                <button onClick={() => setShowCart(!showCart)} className="flex gap-2.5 text-white">
                    <p>Tu cesta</p>
                    <figure className="relative">
                        <IconShoppingBag size={20} />
                        <span className="size-2 rounded-full bg-rojo absolute top-0 right-0"></span>
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