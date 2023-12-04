import { Body, Footer, Hero } from "@/components";
import Image from "next/image";

export default function Home() {
  return (
    <main className="overflow-hidden flex flex-col justify-between min-h-screen bg-white">
      <div>
        <Hero />
        <Body />
      </div>
      <Footer />
    </main>
  );
}
