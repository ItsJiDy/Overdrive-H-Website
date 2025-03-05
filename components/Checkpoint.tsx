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
  const [isBypassed, setBypassed] = useState(false)
  const [sanitizedKey, setSanitizedKey] = useState("")
  const [specialKey, setSpecialKey] = useState("")

  const hexEncode = useCallback(
    (str) => [...str].map((c) => (c.charCodeAt(0) * 2).toString(16)).join(""),
    []);
  const hexDecode = useCallback(
    (hex) =>
      hex
        .match(/.{1,2}/g)
        .map((byte) => String.fromCharCode(Number.parseInt(byte, 16) / 2))
        .join(""),
    []
  )

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const HWID = searchParams.get("HWID")
    const hash = searchParams.get("hash")
    const localstorage = localStorage
    let can_create_key = false
    let total_streaks = 0

    setTimeout(() => {
      const container = document.getElementById("hcaptcha-container");
      if (!container) return;
      const captcha = document.createElement("div");
      captcha.id = "hcaptcha-widget";
      container.appendChild(captcha);
      window.hcaptcha.render("hcaptcha-widget", {
        sitekey: "7c404cc6-eef8-438c-ae44-442649bc36fe",
        callback: function(token) {
          if (token && token.length > 1295) {
            setCompletedCaptcha(true)
            if (!can_create_key) {
              setContinueIcon(true)
              const proceedTextElement = document.getElementById("Proceed-Text")
              if (proceedTextElement) proceedTextElement.textContent = "Continue"
            } else {
              const proceedTextElement = document.getElementById("Proceed-Text")
              if (proceedTextElement) proceedTextElement.textContent = "Create Key"
              setCreateKeyIcon(true)
              setKeyComplete(true)
            }
          }
        }
      });
    }, 1000);

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

    const last_hash = localstorage.getItem("r_si_v")
    if (hash && hash !== "" && hash !== last_hash) {
      if (!revoked) {
        if (document.referrer === "https://linkvertise.com/") {
          localstorage.setItem("r_si_v", hash)
          const n_st_e = localstorage.getItem("n_st_e") || special_key
          localstorage.setItem("n_st_e", ((Number(n_st_e) / Number(special_key) + 1) * Number(special_key)).toString())
        } else {
          localstorage.setItem("gfy_h", "AH")
        }
      }
      setTimeout(() => {
        window.location.href = "/checkpoint"
      }, 100)
      return
    }

    if (special_key) {
      const hardware = localstorage.getItem("rt_b")
      if (hardware) {
        let streak = parseInt(localstorage.getItem(hexEncode(hardware) + "_uznop")) || 0
        if (Math.floor(streak) !== streak) {
          streak = 0
        }
        total_streaks = (streak / parseInt(hexDecode(hardware))) / 50
        if (Math.floor(total_streaks) !== total_streaks) {
          streak = 0
          total_streaks = 0
        }
        localstorage.setItem(hexEncode(hardware) + "_uznop", streak)
        const streaksElement = document.getElementById("streaks")
        if (streaksElement) streaksElement.textContent = total_streaks.toString()
      }
    }

    if (localstorage.getItem("gfy_h") == "AH") {
      localstorage.removeItem("gfy_h")
      setBypassed(true)
    }

    const t_key = localstorage.getItem("sgh_s")
    const d_key = localstorage.getItem("dp_xnm")
    const checkpoints = document.getElementById("COMPLETED_CHECKPOINTS")
    const durationElement = document.getElementById("key-duration")
    if (t_key && t_key !== "") {
      const b = Math.floor(Date.now() / 1000)
      const c = (parseInt(d_key) || 1) / special_key
      if (c && c > b) {
        const descriptionElement = document.getElementById("description")
        if (descriptionElement) descriptionElement.innerHTML = "Your Key: <b>" + t_key + "</b>"
        if (checkpoints) checkpoints.textContent = "3"
        setIsCopy(true)
        setSanitizedKey(t_key)
        setCopyIcon(true)
        const proceedTextElement = document.getElementById("Proceed-Text")
        if (proceedTextElement) proceedTextElement.textContent = "Copy"
        if (durationElement || total_streaks > 0) durationElement.textContent = (24 + ((total_streaks - 1) / 2)) + " Hours"
      } else {
        localstorage.removeItem("dp_xnm")
        localstorage.removeItem("sgh_s")
        localstorage.removeItem("n_st_e")
        localstorage.removeItem("d_shg")
        window.location.reload()
        return
      }
    } else {
      const total_checkpoints =
        (Number.parseInt(localstorage.getItem("n_st_e") || "0") || Number(special_key)) / Number(special_key)
      if (durationElement) durationElement.textContent = (24 + (total_streaks / 2)) + " Hours"
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
        can_create_key = true
        setSanitizedKey(hardware)
        setSpecialKey(special_key.toString())
      }
      setCaptchaIcon(true)
    }
  }, [hexDecode, hexEncode])

  const handleProceedClick = useCallback(() => {
    const localstorage = localStorage
    if (isCopy) {
      navigator.clipboard.writeText(sanitizedKey)
      const proceedTextElement = document.getElementById("Proceed-Text")
      if (proceedTextElement) proceedTextElement.textContent = "Copied"
      setCopyIcon(false)
      setCheckIcon(true)
      setTimeout(() => {
        if (proceedTextElement) proceedTextElement.textContent = "Copy"
        setCopyIcon(true)
        setCheckIcon(false)
      }, 1000)
    } else {
      if (completedCaptcha) {
        if (keyComplete) {
          const proceedTextElement = document.getElementById("Proceed-Text")
          if (proceedTextElement) proceedTextElement.textContent = "..."
          setCreateKeyIcon(false)
          setTimeout(() => {
            const sK = parseInt(specialKey)
            const K = sanitizedKey.toString()
            const j = parseInt(K)
            const m = hexEncode(hexEncode(K))
            const streak = parseInt(localstorage.getItem(m + "_uznop")) || 0
            const exp = Math.floor(Date.now() / 1000) + (86400 + (1800 * ((streak / j) / 50)))
            localstorage.setItem("dp_xnm", exp * sK)
            localstorage.setItem("sgh_s", hexEncode(K + "_" + exp.toString()))
            localstorage.removeItem("n_st_e")
            localstorage.setItem(m + "_uznop", ((streak / j) + 50) * j)
            window.location.href = "/checkpoint"
          }, 1500)
        } else {
          window.location.href = sLink
        }
      }
    }
  }, [isCopy, sanitizedKey, keyComplete, completedCaptcha, sLink, hexEncode])

  return (
    <>
      <Script src="https://js.hcaptcha.com/1/api.js" async defer></Script>

      <div className="min-h-screen flex items-center justify-center bg-black/50">
        <div className="max-w-md w-full bg-transparent border-2 rounded-lg transition-all duration-300 ease-in-out scale-90 transform hover:border-blue-500 hover:scale-100 border-2 border-transparent text-white">
          <br />
          <h1 className="text-2xl font-bold text-center mb-4">Key System</h1>
          <div className="mb-6 text-center">
            <p>
              Completed <b id="COMPLETED_CHECKPOINTS">0</b> out of <b>3</b>
              <br />
              Key Duration: <b id="key-duration">24 Hours</b>
              <br />
              Streaks: <b id="streaks">0</b>
            </p>
            <br />
            <p id="description">
              Each streak will guarantee you <b>+ 30 Minutes</b> Key Duration.
              <br />
              <br />
              Click '<b>Continue</b>' in order to proceed to the next checkpoint.
            </p>
          </div>
          {captcha && (<div id="hcaptcha-container"></div>)}
          <div className="flex justify-center">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 ease-in-out transform hover:scale-105"
              id="Proceed"
              onClick={handleProceedClick}
            >
              <span className="flex items-center space-x-1">
                {createKeyIcon && <ChevronRight className="h-6 w-6" />}
                {copyIcon && <Copy className="h-6 w-6" />}
                {checkIcon && <Check className="h-6 w-6" />}
                <p id="Proceed-Text">Please complete the captcha first!</p>
                {continueIcon && <ArrowRightFromLine className="h-6 w-6 ml-auto" />}
              </span>
            </button>
          </div>
          <br />
          <div className="mb-6 text-center">
            <p>
              Thank you for using <b>Overdrive H</b>
            </p>
            {isBypassed && (
              <>
                <br />
                <p className="text-red-600">
                  Seems like you just bypassed the checkpoint, don't do that again.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}