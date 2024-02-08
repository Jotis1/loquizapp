"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib";
import { Stripe } from "stripe";

export function Button({ onClick, priceID, quantity, pay, type = "primary", dashed, children }: { onClick?: () => void, priceID?: string, pay?: boolean, type?: "primary" | "secondary", dashed?: boolean, children: React.ReactNode, quantity?: number }) {

    const router = useRouter();

    const handleCheckout = async () => {

        if (!pay) return;

        const response = await fetch("/api/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ priceID, quantity })
        })

        const data = await response.json() as Stripe.Response<Stripe.Checkout.Session>;

        if (!data.url) return;

        const email = data.customer_email;

        console.log(data);

        router.push(data.url!);

        return;

        const formData = new FormData();
        formData.append('email', email!);

        const responseFromEmail = fetch('/api/mailer', {
            method: 'post',
            body: formData,
        });

        responseFromEmail.then(() => {
            console.log('Email sent');
        }).catch(() => {
            console.log('Error sending email');
        })

    }

    const backgroundClass = cn(
        "transition-all hover:scale-105",
        dashed && "bg-white",
        type === "primary" && dashed && "border border-2 border-dashed border-rojo text-rojo",
        type === "primary" && !dashed && "bg-rojo text-white",
        type === "secondary" && dashed && "border border-2 border-dashed border-amarillo text-negro",
        type === "secondary" && !dashed && "bg-amarillo text-negro",
    )

    return (
        <button onClick={!pay ? onClick : handleCheckout} className={cn(
            `h-9 rounded-2xl px-5 w-fit flex items-center justify-center truncate text-sm`,
            backgroundClass
        )}>
            {children}
        </button>
    )
}