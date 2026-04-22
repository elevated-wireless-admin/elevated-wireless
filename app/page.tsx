import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Category } from "@/components/Category";
import { Access } from "@/components/Access";
import { Engines } from "@/components/Engines";
import { Platform } from "@/components/Platform";
import { Team } from "@/components/Team";
import { TwoPaths } from "@/components/TwoPaths";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Category />
      <Access />
      <Engines />
      <Platform />
      <Team />
      <TwoPaths />
      <Footer />
    </>
  );
}
