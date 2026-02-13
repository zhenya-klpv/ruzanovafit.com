import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Philosophy } from "@/components/Philosophy";
import { ProblemSolution } from "@/components/ProblemSolution";
import { InputTypes } from "@/components/InputTypes";
import { Testimonials } from "@/components/Testimonials";
import { Security } from "@/components/Security";
import { TrustAnchors } from "@/components/TrustAnchors";
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
        <InputTypes />
        <Testimonials />
        <CTABlock />
        <Security />
        <TrustAnchors />
      </main>
      <Footer />
    </>
  );
}
