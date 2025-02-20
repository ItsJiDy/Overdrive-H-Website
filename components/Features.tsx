import { Zap, Palette, Sliders, Flag, Key, Layout } from "lucide-react"
import { FadeInSection } from "@/utils/fadeInSection"

const features = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Speed & Performance",
    description: "Optimized for lightning-fast execution.",
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: "Modern Design",
    description: "A sleek, user-friendly interface.",
  },
  {
    icon: <Sliders className="h-6 w-6" />,
    title: "Customizable Theme",
    description: "Tailor it to your needs effortlessly.",
  },
  {
    icon: <Flag className="h-6 w-6" />,
    title: "Devices",
    description: "Enjoy a seamless experience across all your devices.",
  },
  {
    icon: <Key className="h-6 w-6" />,
    title: "Key System",
    description: "Simple and too easy to obtain.",
  },
  {
    icon: <Layout className="h-6 w-6" />,
    title: "Modern Interface",
    description: "Fresh and Clean Interface for user experience.",
  },
]

const Features = () => {
  return (
    <FadeInSection>
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-white">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800 bg-opacity-50 p-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:border-blue-500 border-5 border-transparent"
              >
                <div className="text-blue-500 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-white">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeInSection>
  )
}

export default Features

