import { BackendProvider } from "@/context";
import { Item, Cart } from "@/components";

import { stripe } from "@/lib"

async function getPrices() {

  const prices = await stripe?.prices.list();

  if (!prices) {
    throw new Error("Failed to fetch prices");
  }

  return prices.data;

}

export default async function Home() {

  const prices = await getPrices();

  return (
    <main>
      <BackendProvider>
        <Cart />
        {prices.map((price) => (
          <Item key={price.id} {...price} />
        ))}
      </BackendProvider>
    </main>
  );
}
