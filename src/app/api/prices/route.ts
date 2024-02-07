import { Stripe } from "stripe";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
        const prices = await stripe.prices.list();

        return NextResponse.json(prices.data);

    } catch (error) {

    }

}