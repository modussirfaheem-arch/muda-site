import Hero from "@/components/sections/Hero";
import Navbar from "@/components/ui/Navbar";

export default function Home() {
  return (
    <main className="relative bg-muda-black min-h-screen selection:bg-muda-gold selection:text-muda-black">
      <Navbar />
      <Hero />
    </main>
  );
}