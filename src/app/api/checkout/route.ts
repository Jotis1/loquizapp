import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib";

export async function POST(req: NextRequest) {
    try {

        let baseURL;

        if (process.env.NODE_ENV === "development") baseURL = "http://localhost:3000";
        else baseURL = "https://tourcitygames.com";

        const body = await req.json();
        const session = await stripe?.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card", "paypal"],
            line_items: [
                {
                    price: body.priceID,
                    quantity: body.quantity
                }
            ],
            success_url: baseURL + "/success",
            cancel_url: baseURL
        });

        if (!session) throw new Error("Failed to create session");

        return NextResponse.json(session);

    } catch (error) {

    }

}