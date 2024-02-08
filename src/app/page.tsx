"use client";

import { useRouter } from "next/navigation";
import config from "@/config/config";

export default function Page() {
    const router = useRouter();
    const page = Object.keys(config.pages)[0];

    return router.push(page);
}