import Script from 'next/script';
import { FadeInSection } from "@/utils/fadeInSection"

export default function Checkpoint() {
  let completedCaptcha

  return (
    <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
      ></script>
    <FadeInSection>
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-black bg-opacity-50 p-6 rounded-lg text-white max-w-md text-center">
        <h2 className="text-2xl font-bold mb-2">Title Here</h2>
        <p className="mb-4">
           Completed <b id="COMPLETED_CHECKPOINTS">0</b> of <b id="CHECKPOINTS">3</b> <br>Key Duration: <b id="KEY_DURATION">0 Hours</b><br> Target Service: <b id="TARGET_SERVICE">Linkvertise</b>
            <p style={{ wordWrap: "break-word" }} id="desc">Click <b>'Continue'</b> in order to proceed to the next checkpoint.</p>
        </p>
        <div
          className="cf-turnstile"
          data-sitekey="0x4AAAAAAA9l-KYvvzkYwsM8"
          data-callback={() => {
            completedCaptcha = true
            alert("you completed the captcha")
          }}
        ></div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md" style={{ borderRadius: '5px' }}>
          Please wait 0 seconds
        </button>
      </div>
    </div>
    </FadeInSection>
  );
}