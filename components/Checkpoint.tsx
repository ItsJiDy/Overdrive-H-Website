"use client";

import Script from 'next/script';
import { FadeInSection } from "@/utils/fadeInSection"

export default function Checkpoint() {
  let completedCaptcha

  return (
    <>
    <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
      ></Script>
    <FadeInSection>
      <div className="max-w-md w-full p-6 bg-transparent border-2 border-gray-300 rounded-lg transition-colors hover:border-blue-500">
        <h1 className="text-2xl font-bold text-center mb-4">Overdrive H</h1>
        <p className="text-gray-600 mb-6 text-center">
          Completed <b>0</b> of <b>1</b>
        </p>
        <div
          className="cf-turnstile"
          data-sitekey="0x4AAAAAAA9l-KYvvzkYwsM8"
          data-callback={() => {
              completedCaptcha = true
              document.getElementById("Proceed").textContent = "Proceed"
          }}
        ></div>
        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" id="Proceed" onClick={() => {
              if (!completedCaptcha) {
                  alert("Please complete the captcha first!")
              } else {
                  alert("OK!")
              }
          }}>Please complete the captcha first!</button>
        </div>
      </div>
    </FadeInSection>
    </>
  );
}