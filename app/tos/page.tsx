import Link from "next/link"

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
          <p>
            Welcome to Overdrive H ("Overdrive H," "we," "us," or "our"). We are a limited liability corporation, and
            these Terms of Service ("Terms") govern your access to and use of our free software, Overdrive H (the
            "Software"). By accessing, or using the Software, you ("User" or "you") agree to be bound by these Terms. If
            you do not agree to these Terms, you must not use the Software.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Is Overdrive H logging users?</h2>
          <p>No, but Luarmor logs every user's information such as Username, Executor Name, and Job Id (that's all).</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">
            Will I get banned once I cracked Overdrive H Premium or Exclusive?
          </h2>
          <p>Yes, we will completely ban your account once you crack one of our products.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">User's Liability</h2>
          <p>
            By obtaining and using Overdrive from any source, you agree that you are responsible for any damages, costs,
            or legal issues that arise from your actions or from any misuse of the Software.
          </p>
        </section>

        <Link href="/" className="text-blue-400 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default TermsOfService

