import { Stripe } from "stripe";

let stripe: Stripe | null;

stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export { stripe }