"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Home, MessageCircle, FileText } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  const navItems = [
    { name: "Home", icon: <Home className="w-5 h-5 mr-2" />, href: "/" },
    { name: "Discord", icon: <MessageCircle className="w-5 h-5 mr-2" />, href: "https://discord.gg/dudJwCefnQ" },
    { name: "Terms Of Service", icon: <FileText className="w-5 h-5 mr-2" />, href: "/tos" },
  ]

  useEffect(() => {
    if (navRef.current) {
      if (isOpen) {
        navRef.current.style.maxHeight = `${navRef.current.scrollHeight}px`
      } else {
        navRef.current.style.maxHeight = "0px"
      }
    }
  }, [isOpen])

  return (
    <nav className="fixed w-full bg-black bg-opacity-50 p-4 z-50">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <Image
            src="https://raw.githubusercontent.com/ItsJiDy/Overdrive-H/refs/heads/main/images/fav_icon.png"
            alt="Overdrive H Logo"
            width={32}
            height={32}
            className="mr-2"
          />
          <div className="text-2xl font-bold">Overdrive H</div>
        </div>
        <Menu className="h-20 w-20" />
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X /> : <Menu />}</button>
        </div>
        <div
          ref={navRef}
          className={`w-full md:w-auto md:flex transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-96" : "max-h-0 md:max-h-full"}`}
        >
          {navItems.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center md:inline-block md:ml-6 py-2 px-4 transition-all duration-300 ease-in-out ${
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 md:opacity-100 translate-y-full md:translate-y-0"
              } ${isOpen ? `delay-[${index * 100}ms]` : ""}`}
              style={{ transitionDelay: isOpen ? `${index * 100}ms` : "0ms" }}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

