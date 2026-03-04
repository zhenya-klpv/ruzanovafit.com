import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Philosophy } from "@/components/Philosophy";
import { ProblemSolution } from "@/components/ProblemSolution";
import { Testimonials } from "@/components/Testimonials";
import { CTABlock } from "@/components/CTABlock";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Philosophy />
        <ProblemSolution />
        <Testimonials />
        <CTABlock />
      </main>
      <Footer />
    </>
  );
}
