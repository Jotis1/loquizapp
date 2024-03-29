import { Button } from "@/components";
import { IconBrandInstagram, IconBrandFacebookFilled, IconBrandTwitterFilled } from "@tabler/icons-react";
import { bungee } from "@/lib";
import { StripeConfigAdaper } from "@/props";
import Image from "next/image";

export function Hero({ price }: { price: StripeConfigAdaper }) {



    return (
        <article className="flex max-w-screen-xl w-full flex-wrap mx-auto pt-12 items-center justify-center gap-10">
            <aside className="flex flex-col gap-10">
                <header className="max-w-96 hero:text-start text-center  w-full flex flex-col gap-2.5 text-white">
                    <p className={`${bungee.className} hero:text-3xl text-2xl`}>{price.hero_title}</p>
                    <p className="hero:text-base text-sm">{price.hero_subtitle}</p>
                </header>
                <footer className="flex gap-2.5 hero:justify-start justify-center">
                    <Button>
                        <IconBrandInstagram />
                    </Button>
                    <Button>
                        <IconBrandFacebookFilled />
                    </Button>
                    <Button>
                        <IconBrandTwitterFilled />
                    </Button>
                </footer>
            </aside>
            <figure className="relative hero:h-96 h-72 max-w-full aspect-video overflow-hidden border-dashed border-amarillo border-4 rounded-2xl">
                <Image fill className="object-cover rounded-2xl" src={price.hero_image_url} alt="Imagen promocional"></Image>
            </figure>
        </article>
    );
}