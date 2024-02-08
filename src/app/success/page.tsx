import { NavBar } from "@/components"
import Link from "next/link"
import { bungee } from "@/lib"
import { BackendProvider } from "@/context"

export default function Page() {

    return (
        <BackendProvider>
            <header className="bg-negro px-5 py-2.5">
                <NavBar />
            </header>
            <main className="bg-amarillo grow flex flex-col gap-5 items-center justify-center text-center">
                <p className={`${bungee.className} text-3xl text-negro`}>Muchas gracias</p>
                <p className="text-negro max-w-80">Recibirás un correo con tu/s códigos y contraseñas</p>
                <Link href={"/"} className="px-5 py-2 bg-white rounded-2xl text-sm hover:scale-105 transition-all">
                    Volver al inicio
                </Link>
            </main>
            <footer className="font-medium bg-white h-16 flex items-center justify-center">
                <p>tourcitygames.com © 2024</p>
            </footer>
        </BackendProvider>
    )
}