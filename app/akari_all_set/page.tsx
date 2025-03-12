import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Check } from "lucide-react"
import { FadeInSection } from "@/utils/fadeInSection"

export default function Home() {
  return (
    <main
      className="min-h-screen bg-fixed bg-cover bg-center"
      style={{ backgroundImage: "url('https://i.pinimg.com/originals/55/01/60/5501609ee45d514d1f2c4a63502045e2.gif')" }}
    >
      <div className="bg-black bg-opacity-50 min-h-screen">
          <Navbar />
          <div className="flex min-h-screen flex-col items-center justify-center bg-black bg-opacity-50 p-4">
            <FadeInSection>
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                  <Check className="h-12 w-12 text-green-600" strokeWidth={3} />
                </div>
                <h1 className="text-2xl font-medium text-white-900">You are all set!</h1>
                <p className="mt-2 text-white-600">You may now close this window.</p>
              </div> </FadeInSection>
          </div>
          <Footer />
      </div>
    </main>
  )
}