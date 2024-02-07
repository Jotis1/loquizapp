import { stripe } from "@/lib";
import config from "@/config/config";
import { BackendProvider } from "@/context";
import { NavBar, Hero, Item } from "@/components";
import { bungee } from "@/lib";
import Stripe from "stripe";

async function getPrices(id: string) {

    const prices = await stripe?.prices.list();

    if (!prices) {
        throw new Error("Failed to fetch prices");
    }

    const data: any = prices.data.filter((price) => price.id === config.pages[id]?.price)[0];
    if (!data) return null;

    data.description = config.pages[id].description;

    return data as Stripe.Price & { description: string };
}


export default async function Page(params: { params: { id: [id: string] } }) {

    const id = params.params.id[0];
    const price = await getPrices(id);

    if (!price) {
        return <h1>Producto no encontrado</h1>
    }

    return (
        <>
            <BackendProvider>
                <header className="bg-negro px-5 pt-2.5 pb-10">
                    <NavBar />
                    <Hero />
                </header>
                <main className="flex flex-col gap-10 items-center py-12 px-2.5 bg-amarillo">
                    <p className={`${bungee.className} text-3xl`}>¿A qué esperas?</p>
                    <Item {...price} />
                </main>
                <footer className="font-medium bg-white h-16 flex items-center justify-center">
                    <p>tourcitygames.com © 2024</p>
                </footer>
            </BackendProvider>
        </>
    );
}