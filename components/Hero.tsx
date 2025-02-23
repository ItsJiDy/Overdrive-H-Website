"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { FadeInSection } from "@/utils/fadeInSection"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Copy, Code } from "lucide-react"

const Hero = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard
      .writeText('ODH_KEY = "" -- if you are a free user, enter your key here to auto validate.\n\nloadstring(game:HttpGet("https://api.overdrivehub.xyz/v1/auth"))()')
      .then(() => {
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
      })
      .catch((err) => console.error("Failed to copy: ", err))
  }, [])

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
          <Code className="h-6 w-6" />
          Get Script
        </Button>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-black/50 bg-opacity-50 text-white p-6 rounded-lg">
            <DialogTitle className="text-xl font-bold mb-4 text-white w-70">
              <Code className="h-6 w-6 text-blue-500 mb-4" />
              Script:
            </DialogTitle>
            <div className="relative w-[100%]">
              <p className="bg-gray-800 p-4 rounded break-all">
                <code className="text-white-400">
                  ODH_KEY = <code className="text-orange-400">""</code>
                  <code className="text-gray-400"> -- if you are a free user, enter your key here to auto validate.</code>
                  <br></br>
                  <br></br>
                  <code className="text-blue-400">loadstring</code>
                    (game:
                  <code className="text-blue-400">HttpGet</code>
                    (<code className="text-orange-400">"https://api.overdrivehub.xyz/v1/auth"</code>
                    ))()
                  </code>
              </p>
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors duration-200"
                aria-label="Copy to clipboard"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            {isCopied && <p className="text-green-400 mt-2 text-sm">Copied to clipboard!</p>}
          </DialogContent>
        </Dialog>
      </section>
    </FadeInSection>
  )
}

export default Hero

