"use client";

import { FadeInSection } from "@/utils/fadeInSection"
import Image from 'next/image';
import { useEffect } from "react"

const Dev = () => {
  useEffect(() => {
    async function init() {
        let a = await fetch("https://discord.com/api/v9/invites/dudJwCefnQ")
        a = await a.json()
        document.getElementById("main_coder_name").textContent = a.inviter.global_name;
        document.getElementById("main_coder_image").src = "https://cdn.discordapp.com/avatars/" + a.inviter.id + "/" + a.inviter.avatar + ".png"
    }
    init()
  }, [])

  return (
    <FadeInSection>
      <section className="py-16 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-white">Developer</h2>
              <div
                key="_"
                className="bg-gray-800 bg-opacity-50 p-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:border-blue-500 border-2 border-transparent flex flex-col items-center"
              >
                <Image 
                  id="main_coder_image"
                  alt="MAIN CODER"
                  width={45} 
                  height={45} 
                  style={{ borderRadius: "50px" }}
                />
                <h3 className="text-xl font-bold mb-2 text-white" id="main_coder_name"></h3>
                <p className="text-white">Main Coder</p>
              </div>
          </div>
        </section>
    </FadeInSection>
  )
}

export default Dev