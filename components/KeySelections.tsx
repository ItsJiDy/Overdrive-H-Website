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
      title: "7 Days",
      keyDuration: "168 Hours",
      checkpoints: "8",
    },
  ]

  return (
    <main className="container mx-auto py-10 px-4">
      <FadeInSection>
      <h1 className="text-3xl font-bold text-center mb-10">Select Duration</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {durationOptions.map((option, index) => (
          <Card key={index} className="h-full flex flex-col">
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
              <Button className="w-full">
                  Proceed
                  <ArrowRightFromLine className="h-6 w-6 ml-auto" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div> </FadeInSection>
    </main>
  )
}

