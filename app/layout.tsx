import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Overdrive H",
  description: "Your #1 powerful semi-legit scripts provider, Safe & Verified.",
  icons: {
    icon: [
      {
        url: "https://raw.githubusercontent.com/ItsJiDy/Overdrive-H/refs/heads/main/images/fav_icon.png",
        href: "https://raw.githubusercontent.com/ItsJiDy/Overdrive-H/refs/heads/main/images/fav_icon.png",
      },
    ],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}



import './globals.css'