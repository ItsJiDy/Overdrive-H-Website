import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRightFromLine } from "lucide-react"
import { FadeInSection } from "@/utils/fadeInSection"

export default function Home() {
  const durationOptions = [
    {
      title: "6 Hours",
      keyDuration: "6 Hours",
      checkpoints: "1",
    },
    {
      title: "12 Hours",
      keyDuration: "12 Hours",
      checkpoints: "2",
    },
    {
      title: "1 Day",
      keyDuration: "24 Hours",
      checkpoints: "3",
    },
    {
      title: "3 Days",
      keyDuration: "48 Hours",
      checkpoints: "5",
    },
    {
      title: "5 Days",
      keyDuration: "120 Hours",
      checkpoints: "8",
    },
    {
      title: "7 Days",
      keyDuration: "168 Hours",
      checkpoints: "10",
    },
  ]

  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center px-4">
    <main className="container mx-auto py-10 px-4">
      <br />
      <FadeInSection>
        <h1 className="text-3xl font-bold text-center mb-10">Select Key Duration</h1>
      </FadeInSection>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {durationOptions.map((option, index) => (
          <FadeInSection>
          <Card key={index} className="h-full flex flex-col bg-transparent border-2 rounded-lg transition-all duration-300 ease-in-out scale-90 transform hover:border-blue-500 hover:scale-100 border-2 border-transparent">
            <CardHeader>
              <CardTitle className="text-center">{option.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-2 text-center">
                <p>
                  Key Duration: <b>{option.keyDuration}</b>
                </p>
                <p>
                  Checkpoints: <b>{option.checkpoints}</b>
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 ease-in-out transform hover:scale-105 flex justify-center">
                  <span className="flex items-center space-x-2">
                      <p>Proceed</p>
                      <ArrowRightFromLine className="h-6 w-6 ml-auto" />
                  </span>
              </Button>
            </CardFooter>
          </Card>
          </FadeInSection>
        ))}
      </div>
    </main>
    </section>
  )
}

