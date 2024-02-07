import { Cart } from '@/props'
import { IconMinus, IconPlus } from '@tabler/icons-react'
import { useBackend } from '@/context'

export default function CartItem({ ...item }: Cart) {

    const { addToCart } = useBackend();

    return (
        <article key={item.id} className="text-black h-9 flex items-center justify-center gap-5">
            <p className="w-full truncate">{item.name}</p>
            <section className="flex gap-2">
                <button onClick={() => addToCart({ ...item, quantity: item.quantity - 1 })} className="size-5 flex items-center justify-center text-black/60">
                    <IconMinus size={20} />
                </button>
                {item.quantity}
                <button onClick={() => addToCart({ ...item, quantity: item.quantity + 1 })} className="size-5 flex items-center justify-center text-black/60">
                    <IconPlus size={20} />
                </button>
            </section>
            <p className="px-4 py-0.5 bg-cielo/60 text-azul rounded-2xl text-end">{item.price / 100}€</p>
        </article>
    )
}