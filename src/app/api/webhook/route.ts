import { stripe } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {

        console.log(req.headers.get('stripe-signature'));

        const sig = req.headers.get('stripe-signature') as string;
        const body = await req.body as any;
        let event;

        console.log(body);

        try {
            event = stripe.webhooks.constructEvent(body as Buffer, sig, process.env.STRIPE_WEBHOOK_SECRET as string);
        } catch (err) {
            return NextResponse.json({ ok: false });
        }

        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntentSucceeded = event.data.object;
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        return NextResponse.json({ ok: true });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ ok: false });
    }

}