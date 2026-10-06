import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { RevenueBand } from "@/components/RevenueBand";
import { Category } from "@/components/Category";
import { Access } from "@/components/Access";
import { Platform } from "@/components/Platform";
import { TwoPaths } from "@/components/TwoPaths";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <RevenueBand />
      <Category />
      <Access />
      <Platform />
      <TwoPaths />
      <Footer />
    </>
  );
}
