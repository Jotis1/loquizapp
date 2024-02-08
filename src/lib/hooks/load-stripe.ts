import { Stripe } from "stripe";

function stripe() {
    const { STRIPE_SECRET_KEY } = process.env;
    return new Stripe(STRIPE_SECRET_KEY as string);
}

const stripeClient = stripe();

export { stripeClient as stripe }