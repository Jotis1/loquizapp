import { Bungee, Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });
const bungee = Bungee({ subsets: ["latin"], weight: ["400"] });

export { bungee, poppins }