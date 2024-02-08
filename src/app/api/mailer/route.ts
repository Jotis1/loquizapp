const nodemailer = require("nodemailer");
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {

        const formData = await req.formData();
        const email = formData.get('email') as string;

        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: process.env.MAIL_SECURE === "true",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const loquizTicket = await fetch("https://api.loquiz.com/v3/tickets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "ApiKey-v1 4f94819872405957d5e391d79a47726e55a9b2346bfe9da6d730070798350e70",
            },
            body: JSON.stringify({
                "gameId": "P32SVFYD4",
                "email": email,
                "username": email!.split("@")[0]
            })
        })

        const loquizJson = await loquizTicket.json();
        const loquizPassword = loquizJson.password;
        const loquizUsername = loquizJson.username;
        const loquizScope = loquizJson.scope;

        await transporter.sendMail({
            from: `Tour City Games <${process.env.MAIL_USER}>`,
            to: email,
            subject: 'Compra realizada',
            text: 'Gracias por tu compra. Aquí tienes tus credenciales para acceder a tu juego: \n\nUsuario: ' + loquizUsername + '\nContraseña: ' + loquizPassword + '\n\nScope: ' + loquizScope + '\n\n¡Disfruta del juego!'
        });

        return NextResponse.json({ ok: true });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ ok: false });
    }

}