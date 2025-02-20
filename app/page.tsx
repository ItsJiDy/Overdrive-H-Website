import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import FAQ from "@/components/FAQ"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main
      className="min-h-screen bg-fixed bg-cover bg-center"
      style={{ backgroundImage: "url('https://i.pinimg.com/originals/55/01/60/5501609ee45d514d1f2c4a63502045e2.gif')" }}
    >
      <div className="bg-black bg-opacity-60 min-h-screen">
        <Navbar />
        <Hero />
        <Features />
        <FAQ />
        <Footer />
      </div>
    </main>
  )
}

