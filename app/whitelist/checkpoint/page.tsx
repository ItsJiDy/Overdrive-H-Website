import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import WhitelistCheckpoint from "@/components/WhitelistCheckpoint"

export default function Home() {
  return (
    <main
      className="min-h-screen bg-fixed bg-cover bg-center"
      style={{ backgroundImage: "url('https://i.pinimg.com/originals/55/01/60/5501609ee45d514d1f2c4a63502045e2.gif')" }}
    >
      <div className="bg-black bg-opacity-50 min-h-screen">
        <Navbar />
        <WhitelistCheckpoint />
        <Footer />
      </div>
    </main>
  )
}

