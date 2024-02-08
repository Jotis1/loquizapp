import { Stripe } from "stripe"

export interface Config {
    pages: {
        [key: string]: {
            hero_title: string,
            hero_subtitle: string,
            hero_image_url: string,
            image_url: string,
            price: string,
            description: string,
            avaiable_at: string,
        }
    }
}

export type StripeConfigAdaper = Stripe.Price & { description: string, image_url: string, avaiable_at: string, hero_title: string, hero_subtitle: string, hero_image_url: string };