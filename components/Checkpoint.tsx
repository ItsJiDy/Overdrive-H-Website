"use client"

import Script from "next/script"
import { useEffect, useState, useCallback } from "react"
import { ArrowRightFromLine, Copy, Check, ChevronRight } from "lucide-react"

export default function Checkpoint() {
  const [continueIcon, setContinueIcon] = useState(false)
  const [copyIcon, setCopyIcon] = useState(false)
  const [createKeyIcon, setCreateKeyIcon] = useState(false)
  const [checkIcon, setCheckIcon] = useState(false)
  const [captcha, setCaptchaIcon] = useState(false)
  const [completedCaptcha, setCompletedCaptcha] = useState(false)
  const [keyComplete, setKeyComplete] = useState(false)
  const [sLink, setSLink] = useState("")
  const [isCopy, setIsCopy] = useState(false)
  const [sanitizedKey, setSanitizedKey] = useState("")

  const hexEncode = ((str) => [...str].map((c) => c.charCodeAt(0).toString(16) * 2).join(""))
  const hexDecode = (
    (hex) =>
      hex
        .match(/.{1,2}/g)
        .map((byte) => {
            return String.fromCharCode(Number.parseInt(byte, 16) / 2)
         })
        .join("")
  )

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const HWID = searchParams.get("HWID")
    const hash = searchParams.get("hash")
    const localstorage = localStorage
    let can_create_key = false

    window.onCaptchaSuccess = () => {
      setCompletedCaptcha(true)
      const proceedButton = document.getElementById("Proceed")
      if (!can_create_key) {
        setContinueIcon(true)
        if (proceedButton) proceedButton.textContent = "Continue"
      } else {
        setCreateKeyIcon(true)
        if (proceedButton) proceedButton.textContent = "Create Key"
      }
    }

    let special_key = localstorage.getItem("d_shg")
    let revoked = false

    if (HWID && HWID !== "") {
        const rHWID = Number.parseInt(hexDecode(HWID))
        if (rHWID) {
          if (localstorage.getItem("rt_b") !== HWID) {
            localstorage.removeItem("sgh_s")
            localstorage.setItem("rt_b", HWID)
            special_key = ""
          }
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
      if (descriptionElement) descriptionElement.innerHTML = "Your Key: <b>" + t_key + "</b>"
      const proceedButton = document.getElementById("Proceed")
      if (proceedButton) proceedButton.textContent = "Copy";
      if (checkpoints) checkpoints.textContent = "3"
      setIsCopy(true)
      setSanitizedKey(t_key)
      setCopyIcon(true)
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
        const hardware = Number.parseInt(hexDecode(localstorage.getItem("rt_b") || "0")) || 0
        if (checkpoints) checkpoints.textContent = "3"
        const descriptionElement = document.getElementById("description")
        if (descriptionElement) descriptionElement.innerHTML = "Click '<b>Create Key</b>' to create your key.";
        setKeyComplete(true)
        can_create_key = true
        setSanitizedKey(hexEncode(hardware.toString() + "_" + (Math.floor(Date.now() / 1000) + 108000).toString()))
      }
      setCaptchaIcon(true)
    }
  }, [hexDecode, hexEncode])

  const handleProceedClick = useCallback(() => {
    const localstorage = localStorage
    if (isCopy) {
      navigator.clipboard.writeText(sanitizedKey)
      const proceedButton = document.getElementById("Proceed")
      if (proceedButton) proceedButton.textContent = "Copied to Clipboard!";
      setCopyIcon(false)
      setCheckIcon(true)
      setTimeout(() => {
        if (proceedButton) proceedButton.textContent = "Copy";
        setCopyIcon(true)
        setCheckIcon(false)
      }, 1000)
    } else {
      if (completedCaptcha) {
        if (keyComplete) {
          const descriptionElement = document.getElementById("description")
          if (descriptionElement) descriptionElement.textContent = "...";
          setCreateKeyIcon(false)
          setTimeout(() => {
            localstorage.setItem("sgh_s", sanitizedKey)
            localstorage.removeItem("n_st_e")
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
          <br />
          <h1 className="text-2xl font-bold text-center mb-4">Key System</h1>
          <div className="mb-6 text-center">
            <p>
              Completed <b id="COMPLETED_CHECKPOINTS">0</b> of <b>3</b>
              <br />
              Key Duration: <b>30 Hours</b>
            </p>
            <br />
            <p id="description">
              Click '<b>Continue</b>' in order to proceed to the next checkpoint.
            </p>
            <br />
          </div>
          <div className="flex justify-center">
            {captcha && (
            <div
              className="cf-turnstile"
              data-sitekey="0x4AAAAAAA9l-KYvvzkYwsM8"
              data-callback="onCaptchaSuccess"
            ></div>
          )}
          </div>
          <br />
          <div className="flex justify-center">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 ease-in-out transform hover:scale-105"
              id="Proceed"
              onClick={handleProceedClick}
            >
              {createKeyIcon && <ChevronRight className="h-6 w-6" />}
              {copyIcon && <Copy className="h-6 w-6" />}
              {checkIcon && <Check className="h-6 w-6" />}
              Please complete the captcha first!
              {continueIcon && <ArrowRightFromLine className="h-6 w-6" />}
            </button>
          </div>
          <br />
        </div>
      </div>
    </>
  )
}