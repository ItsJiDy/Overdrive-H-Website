"use client";

import Script from 'next/script';
import { FadeInSection } from "@/utils/fadeInSection"
import { useEffect, useState } from "react";
import { ArrowRightFromLine, Copy } from "lucide-react"

export default function Checkpoint() {
  const [showIcon, setShowIcon] = useState(false)
  const [copyIcon, setCopyIcon] = useState(false)
  const [captcha, setCaptchaIcon] = useState(false)
  let completedCaptcha
  let key_complete
  let s_link
  let is_copy
  let sanitized_key

  useEffect(() => {
      const searchParams = new URLSearchParams(window.location.search);
      const hexEncode = (str) => [...str].map(c => c.charCodeAt(0).toString(16) * 2).join('');
      const hexDecode = (hex) => hex.match(/.{1,2}/g).map(byte => String.fromCharCode(parseInt(byte, 16) / 2)).join('');
      const HWID = searchParams.get('HWID')
      const hash = searchParams.get('hash')
      window.onCaptchaSuccess = () => {
          completedCaptcha = true
          document.getElementById("Proceed").textContent = "Continue"
          setShowIcon(!showIcon)
      }
      let special_key = localstorage.getItem("d_shg")
      let revoked
      if (!special_key || special_key == "") {
          if (HWID) {
              special_key = parseInt(Math.Random() * 999999)
              localstorage.setItem("d_shg", special_key)
              localstorage.setItem("n_st_e", 1 * special_key)
              revoked = true
              let rHWID = parseInt(hexDecode(HWID))
              if (rHWID) {
                  localstorage.setItem("rt_b", HWID)
              } else {
                  window.location.href = "/"
                  return;
              }
          } else {
              window.location.href = "/"
              return;
          }
          window.location.href = "/checkpoint"
          return;
      }
      if (document.referrer == "https://linkvertise.com/" && !revoked) {
          const last_hast = localstorage.getItem("r_si_v")
          if (hash && hash !== "" && hash !== last_hash) {
              localstorage.setItem("r_si_v", hash)
              localstorage.setItem("n_st_e", (((localstorage.getItem("n_st_e") || special_key) / special_key) + 1) * special_key)
          }
          setTimeout(function() {
              window.location.href = "/checkpoint"
          }, 100)
          return;
      }
      const t_key = localstorage.getItem("sgh_s")
      if (t_key && t_key !== "") {
          document.getElementById("description").textContent = t_key
          document.getElementById("Proceed").textContent = "Copy"
          is_copy = true
          sanitized_key = t_key
          setCopyIcon(!copyIcon)
      } else {
          const total_checkpoints = (parseInt(localstorage.getItem("n_st_e")) || special_key) / special_key
          const checkpoints = document.getElementById("COMPLETED_CHECKPOINTS")
          if (total_checkpoints == 1) {
              s_link = "https://link-hub.net/978899/overdrive-h-key-system"
          } else if (total_checkpoints == 2) {
              checkpoints.textContent = "1"
              s_link = "https://link-hub.net/978899/overdrive-h-checkpoint-2"
          } else if (total_checkpoints == 3) {
              checkpoints.textContent = "2"
              s_link = "https://direct-link.net/978899/overdrive-h-checkpoint-3"
          } else if (total_checkpoints == 4) {
              const hardware = parseInt(hexDecode(localstorage.getItem("rt_b"))) || 0
              checkpoints.textContent = "3"
              document.getElementById("description").innerHTML = "Click '<p>Create Key</p>' to create your key."
              key_complete = true
              sanitized_key = hexEncode(hardware.toString() + "_" + (Math.floor(Date.now() / 1000) + 108000).toString())
          }
          setCaptchaIcon(!captcha)
      }
  }, [])

  return (
    <>
    <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
      ></Script>
    <FadeInSection>
    <div className="min-h-screen flex items-center justify-center bg-black/50">
      <div className="max-w-md w-full bg-transparent border-2 rounded-lg transition-colors scale-90 transform hover:border-blue-500 hover:scale-100 border-2 border-transparent">
        <h1 className="text-2xl font-bold text-center mb-4">Key System</h1>
        <p className="text-gray-600 mb-6 text-center">
          Completed <b id="COMPLETED_CHECKPOINTS">0</b> of <b>3</b>
          <br></br>
          Key Duration: <b>30 Hours</b>
          <br></br>
          <p id="description">Click '<b>Continue</b>' in order to proceed to the next checkpoint.</p>
        </p>
        {captcha && <div
          className="cf-turnstile"
          data-sitekey="0x4AAAAAAA9l-KYvvzkYwsM8"
          data-callback="onCaptchaSuccess"
        ></div>}
        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" id="Proceed" onClick={() => {
              if (is_copy) {
                  navigator.clipboard.writeText(sanitized_key)
                  document.getElementById("Proceed").textContent = "Copied to Clipboard!"
                  setTimeout(function() {
                      document.getElementById("Proceed").textContent = "Copy"
                  }, 1000)
              } else {
                  if (completedCaptcha) {
                      if (key_complete) {
                          document.getElementById("description").textContent = "..."
                          setTimeout(function() {
                              localstorage.setItem("sgh_s", sanitized_key)
                              localstorage.removeItem("n_st_e")
                              window.location.reload()
                          }, 1500)
                      } else {
                          window.location.href = s_link
                      }
                  }
              }
          }}>
            Please complete the captcha first!
            { showIcon && <ArrowRightFromLine className="h-6 w-6" /> }
            { copyIcon && <Copy /> }
          </button>
        </div>
      </div>
      </div>
    </FadeInSection>
    </>
  );
}