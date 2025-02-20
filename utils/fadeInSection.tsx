"use client"

import type React from "react"

import { useEffect, useRef, type ReactNode } from "react"

interface FadeInSectionProps {
  children: ReactNode
}

export const FadeInSection: React.FC<FadeInSectionProps> = ({ children }) => {
  const domRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible")
        }
      })
    })

    if (domRef.current) {
      observer.observe(domRef.current)
    }

    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current)
      }
    }
  }, [])

  return (
    <div ref={domRef} className="fade-in-section">
      {children}
    </div>
  )
}

