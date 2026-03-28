import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Process from "@/components/sections/Process";
import Portfolio from "@/components/sections/Portfolio";
import Reviews from "@/components/sections/Reviews";
import Contact from "@/components/sections/Contact";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function Home() {
  return (
    <>
      <Navbar />
      <ScrollProgress />
      <main>
        <Hero />
        <About />
        <Process />
        <Portfolio />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
