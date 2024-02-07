import { stripe } from "@/lib"
import { Button } from "@/components"

async function getPrices() {

    const prices = await stripe?.prices.list();

    if (!prices) {
        throw new Error("Failed to fetch prices");
    }

    return prices.data;

}

export default async function Page() {

    const prices = await getPrices();

    return (
        <main>
            {
                prices.map((price) => {
                    return (
                        <div key={price.id}>
                            <p>{price.nickname}</p>
                            <p>{price.unit_amount! / 100}€</p>
                        </div>
                    )
                })
            }
        </main>
    )
}