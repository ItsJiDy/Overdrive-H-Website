"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { FadeInSection } from "@/utils/fadeInSection"

const faqs = [
  {
    question: "What is Overdrive H?",
    answer:
      "Overdrive H is a powerful semi-legit scripts provider, offering safe and verified scripts for various purposes.",
  },
  {
    question: "How do I use the script?",
    answer:
      "Simply copy the provided script and execute it on your executor.",
  },
  {
    question: "Are the scripts safe to use?",
    answer:
      "Yes, the script are verified and tested for safety. However, always use script responsibly and in accordance with the terms of service.",
  },
  {
    question: "Does Overdrive H requires a key to get access?",
    answer:
      "Yes, Overdrive H has key system to get access in order for the owner to earn some money.",
  },
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <FadeInSection>
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-800 bg-opacity-50 rounded-lg overflow-hidden transition-all duration-300 ease-in-out"
              >
                <button
                  className="flex justify-between items-center w-full p-4 text-left text-white"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-medium">{faq.question}</span>
                  <div
                    className={`transform transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
                  >
                    <ChevronDown />
                  </div>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  <p className="p-4 text-white">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeInSection>
  )
}

export default FAQ

