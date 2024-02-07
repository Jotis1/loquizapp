"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib";

export function Button({ onClick, priceID, pay, type = "primary", dashed, children }: { onClick?: () => void, priceID?: string, pay?: boolean, type?: "primary" | "secondary", dashed?: boolean, children: React.ReactNode }) {

    const router = useRouter();

    const handleCheckout = async () => {

        if (!pay) return;

        const response = await fetch("/api/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ priceID })
        })

        const data = await response.json();

        router.push(data.url);
    }

    const backgroundClass = cn(
        dashed && "bg-white",
        type === "primary" && dashed && "border border-2 border-dashed border-rojo text-rojo",
        type === "primary" && !dashed && "bg-rojo text-white",
        type === "secondary" && dashed && "border border-2 border-dashed border-amarillo text-negro",
        type === "secondary" && !dashed && "bg-amarillo text-negro",
    )

    return (
        <button onClick={onClick} className={cn(
            `h-9 rounded-2xl px-5 w-fit flex items-center justify-center truncate text-sm`,
            backgroundClass
        )}>
            {children}
        </button>
    )
}