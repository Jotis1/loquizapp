import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib";

export async function POST(req: NextRequest) {
    try {

        const body = await req.json();
        const session = await stripe?.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card", "paypal"],
            line_items: [
                {
                    price: body.priceID,
                    quantity: 1
                }
            ],
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/pricing"
        });

        if (!session) throw new Error("Failed to create session");

        return NextResponse.json({ url: session.url });

    } catch (error) {

    }

}