import { Button } from "@/components";
import { IconBrandInstagram, IconBrandFacebookFilled, IconBrandTwitterFilled } from "@tabler/icons-react";
import { bungee } from "@/lib";

export function Hero() {
    return (
        <article className="flex max-w-screen-xl w-full flex-wrap mx-auto pt-12 items-center justify-center gap-10">
            <aside className="flex flex-col gap-10">
                <header className="max-w-96 w-full flex flex-col gap-2.5 text-white">
                    <p className={`${bungee.className} text-3xl `}>Lorem ipsum dolor sit amet</p>
                    <p>Lorem ipsum <span className="font-semibold text-amarillo">dolor</span> sit amet consectetur adipisicing elit. Provident maxime <span className="font-semibold text-amarillo">possimus</span> id veritat</p>
                </header>
                <footer className="flex gap-2.5">
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
            <aside className="h-96 max-w-full aspect-video border-dashed border-amarillo border-4 rounded-2xl">

            </aside>
        </article>
    );
}