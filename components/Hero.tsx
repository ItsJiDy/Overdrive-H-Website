"use client"

import { useState } from "react"
import Image from "next/image"
import { FadeInSection } from "@/utils/fadeInSection"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const Hero = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <FadeInSection>
      <section className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <Image
          src="https://raw.githubusercontent.com/ItsJiDy/Overdrive-H/refs/heads/main/images/fav_icon.png"
          alt="Overdrive H Logo"
          width={100}
          height={100}
          className="mb-4"
        />
        <h1 className="text-5xl font-bold mb-4 text-white">Overdrive H</h1>
        <p className="text-xl mb-8 text-white">Your #1 powerful semi-legit scripts provider, Safe & Verified.</p>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Get Script
        </Button>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-black bg-opacity-90 text-white p-6 rounded-lg">
            <DialogTitle className="text-xl font-bold mb-4 text-white">Script:</DialogTitle>
            <pre className="bg-gray-800 p-4 rounded">
              <code className="text-green-400 break-all">loadstring(game:HttpGet("https://overdrivehub.xyz/v1/auth"))()</code>
            </pre>
          </DialogContent>
        </Dialog>
      </section>
    </FadeInSection>
  )
}

export default Hero

