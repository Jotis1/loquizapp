import { stripe } from "@/lib";
import config from "@/config/config";
import { BackendProvider } from "@/context";
import { NavBar, Hero, Item } from "@/components";
import { bungee } from "@/lib";
import { StripeConfigAdaper } from "@/props";
import Link from "next/link";

async function getPrices(id: string) {

    const prices = await stripe?.prices.list();
    const configObj = config.pages[id]
    if (!prices) {
        throw new Error("Failed to fetch prices");
    }


    const data: any = prices.data.filter((price) => price.id === configObj?.price)[0];
    if (!data) return null;

    const adaptedData = { ...data, ...configObj }
    return adaptedData as StripeConfigAdaper;
}

export default async function Page(params: { params: { id: [id: string] } }) {

    const id = params.params.id[0];
    const price = await getPrices(id);

    return (
        <>
            <BackendProvider>
                {price ? (
                    <>
                        <header className="bg-negro px-5 pt-2.5 pb-10">
                            <NavBar />
                            <Hero price={price} />
                        </header>
                        <main className="flex flex-col gap-10 items-center py-12 px-2.5 bg-amarillo">
                            <p className={`${bungee.className} text-3xl text-negro`}>¿A qué esperas?</p>
                            <Item {...price} />
                        </main>
                    </>
                ) : (
                    <>
                        <header className="bg-negro px-5 py-2.5">
                            <NavBar />
                        </header>
                        <main className="bg-amarillo grow flex flex-col gap-5 items-center justify-center">
                            <p className={`${bungee.className} text-3xl text-negro`}>No se encuentra este producto</p>
                            <Link href={"/"} className="px-5 py-2 bg-white rounded-2xl text-sm hover:scale-105 transition-all">
                                Volver al inicio
                            </Link>
                        </main>
                    </>
                )}
                <footer className="font-medium bg-white h-16 flex items-center justify-center">
                    <p>tourcitygames.com © 2024</p>
                </footer>
            </BackendProvider>
        </>
    );
}