"use client"

import Script from "next/script"
import { useEffect, useState, useCallback } from "react"
import { ArrowRightFromLine, Copy, Check, ChevronRight } from "lucide-react"

export default function Checkpoint() {
  const [captcha, setCaptchaIcon] = useState(false)
  const [completedCaptcha, setCompletedCaptcha] = useState(false)
  const [keyComplete, setKeyComplete] = useState(false)
  const [sLink, setSLink] = useState("")
  const [isCopy, setIsCopy] = useState(false)
  const [sanitizedKey, setSanitizedKey] = useState("")

  const hexEncode = useCallback((str) => [...str].map((c) => c.charCodeAt(0).toString(16) * 2).join(""), [])
  const hexDecode = useCallback(
    (hex) =>
      hex
        .match(/.{1,2}/g)
        .map((byte) => {
            return String.fromCharCode(Number.parseInt(byte, 16) / 2)
         })
        .join(""),
    [],
  )

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const HWID = searchParams.get("HWID")
    const hash = searchParams.get("hash")
    const localstorage = localStorage

    window.onCaptchaSuccess = () => {
      setCompletedCaptcha(true)
      const proceedButton = document.getElementById("Proceed")
      if (proceedButton) proceedButton.innerHTML = 'Continue <ArrowRightFromLine className="h-6 w-6" />';
    }

    let special_key = localstorage.getItem("d_shg")
    let revoked = false

    if (HWID && HWID !== "") {
        const rHWID = Number.parseInt(hexDecode(HWID))
        if (rHWID) {
          localstorage.setItem("rt_b", HWID)
          special_key = ""
        } else {
          window.location.href = "/"
          return
        }
    }

    if (!special_key || special_key === "") {
      if (HWID && HWID !== "") {
        special_key = Number.parseInt(Math.random() * 999999).toString()
        localstorage.setItem("d_shg", special_key)
        localstorage.setItem("n_st_e", (1 * Number(special_key)).toString())
        revoked = true
      } else {
        window.location.href = "/"
        return
      }
      window.location.href = "/checkpoint"
      return
    }

    if (document.referrer === "https://linkvertise.com/" && !revoked) {
      const last_hash = localstorage.getItem("r_si_v")
      if (hash && hash !== "" && hash !== last_hash) {
        localstorage.setItem("r_si_v", hash)
        const n_st_e = localstorage.getItem("n_st_e") || special_key
        localstorage.setItem("n_st_e", ((Number(n_st_e) / Number(special_key) + 1) * Number(special_key)).toString())
      }
      setTimeout(() => {
        window.location.href = "/checkpoint"
      }, 100)
      return
    }

    const t_key = localstorage.getItem("sgh_s")
    const checkpoints = document.getElementById("COMPLETED_CHECKPOINTS")
    if (t_key && t_key !== "") {
      const descriptionElement = document.getElementById("description")
      if (descriptionElement) descriptionElement.textContent = t_key
      const proceedButton = document.getElementById("Proceed")
      if (proceedButton) proceedButton.innerHTML = '<Copy className="h-6 w-6" /> Copy';
      if (checkpoints) checkpoints.textContent = "3"
      setIsCopy(true)
      setSanitizedKey(t_key)
    } else {
      const total_checkpoints =
        (Number.parseInt(localstorage.getItem("n_st_e") || "0") || Number(special_key)) / Number(special_key)
      if (total_checkpoints === 1) {
        setSLink("https://link-hub.net/978899/overdrive-h-key-system")
      } else if (total_checkpoints === 2) {
        if (checkpoints) checkpoints.textContent = "1"
        setSLink("https://link-hub.net/978899/overdrive-h-checkpoint-2")
      } else if (total_checkpoints === 3) {
        if (checkpoints) checkpoints.textContent = "2"
        setSLink("https://direct-link.net/978899/overdrive-h-checkpoint-3")
      } else if (total_checkpoints === 4) {
        const proceedButton = document.getElementById("Proceed")
        const hardware = Number.parseInt(hexDecode(localStorage.getItem("rt_b") || "0")) || 0
        if (checkpoints) checkpoints.textContent = "3"
        const descriptionElement = document.getElementById("description")
        if (proceedButton) proceedButton.innerHTML = '<ChevronRight className="h-6 w-6" /> Create Key';
        if (descriptionElement) descriptionElement.innerHTML = "Click '<p>Create Key</p>' to create your key.";
        setKeyComplete(true)
        setSanitizedKey(hexEncode(hardware.toString() + "_" + (Math.floor(Date.now() / 1000) + 108000).toString()))
      }
      setCaptchaIcon((prev) => !prev)
    }
  }, [hexDecode, hexEncode])

  const handleProceedClick = useCallback(() => {
    if (isCopy) {
      navigator.clipboard.writeText(sanitizedKey)
      const proceedButton = document.getElementById("Proceed")
      if (proceedButton) proceedButton.textContent = '<Check className="h-6 w-6" /> Copied to Clipboard!';
      setTimeout(() => {
        if (proceedButton) proceedButton.innerHTML = '<Copy className="h-6 w-6" /> Copy';
      }, 1000)
    } else {
      if (completedCaptcha) {
        if (keyComplete) {
          const descriptionElement = document.getElementById("description")
          if (descriptionElement) descriptionElement.textContent = "...";
          setTimeout(() => {
            localStorage.setItem("sgh_s", sanitizedKey)
            localStorage.removeItem("n_st_e")
            window.location.reload()
          }, 1500)
        } else {
          window.location.href = sLink
        }
      }
    }
  }, [isCopy, sanitizedKey, completedCaptcha, keyComplete, sLink])

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></Script>

      <div className="min-h-screen flex items-center justify-center bg-black/50">
        <div className="max-w-md w-full bg-transparent border-2 rounded-lg transition-all duration-300 ease-in-out scale-90 transform hover:border-blue-500 hover:scale-100 border-2 border-transparent text-white">
          <h1 className="text-2xl font-bold text-center mb-4">Key System</h1>
          <div className="text-gray-600 mb-6 text-center">
            <p>
              Completed <b id="COMPLETED_CHECKPOINTS">0</b> of <b>3</b>
              <br />
              Key Duration: <b>30 Hours</b>
            </p>
            <p id="description">
              Click '<b>Continue</b>' in order to proceed to the next checkpoint.
            </p>
          </div>
          <div className="flex justify-center">
            {captcha && (
            <div
              className="cf-turnstile"
              data-sitekey="0x4AAAAAAA9l-KYvvzkYwsM8"
              data-callback="onCaptchaSuccess"
            ></div>
          )}
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              id="Proceed"
              onClick={handleProceedClick}
            >
              Please complete the captcha first!
            </button>
          </div>
        </div>
      </div>
    </>
  )
}