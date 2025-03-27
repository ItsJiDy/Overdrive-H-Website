import Link from "next/link"

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
          <p>
            Welcome to Overdrive H ("Overdrive H," "we," "us," or "our"). We are a limited liability corporation, and these Terms of Service ("Terms") govern your access to and use of our free software, Overdrive H (the "Software"). By accessing or using the Software, you ("User" or "you") agree to comply with these Terms. If you do not agree to these Terms, you must refrain from using the Software.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Does Overdrive H log user activity?</h2>
          <p>We do not maintain user records; however, we store your hardware ID upon completing the key system. Rest assured, we do not share this information with any third parties.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Can we still get a refund from the Premium/Exclusive gamepass?</h2>
          <p>No, we do not offer refunds.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">
            Will I be banned if I bypass Overdrive H Premium or Exclusive?
          </h2>
          <p>Yes, your account will be permanently banned if you attempt to bypass any of our products.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">User's Liability</h2>
          <p>
            By using Overdrive H, you acknowledge that you are solely responsible for any damages, expenses, or legal consequences resulting from your actions or any misuse of the software.
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

