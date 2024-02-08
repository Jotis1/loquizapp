"use client";

import { useRouter } from "next/navigation";
import config from "@/config/config";
import { useEffect } from "react";

export default function Page() {
    const router = useRouter();
    const page = Object.keys(config.pages)[0];


    useEffect(() => {
        if (typeof window !== "undefined") {
            router.push(page);
        }
    }, [page, router])

    return (
        <p></p>
    )

}