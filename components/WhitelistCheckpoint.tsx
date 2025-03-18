"use client";

import Script from "next/script";
import { useEffect, useState, useCallback, useRef } from "react";
import { ArrowRightFromLine, Check } from "lucide-react";
import { FadeInSection } from "@/utils/fadeInSection";

export default function Checkpoint() {
  const [continueIcon, setContinueIcon] = useState(false);
  const [checkIcon, setCheckIcon] = useState(false);
  const [captchaVisible, setCaptchaVisible] = useState(true);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [completedCaptcha, setCompletedCaptcha] = useState(false);
  const [isBypassed, setBypassed] = useState(false);
  const [link, setLink] = useState("");
  const [proceedText, setProceedText] = useState("Please complete the captcha first!");
  const captchaRef = useRef(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const hash = searchParams.get("hash");
    const localstorage = localStorage;

    let special_key = parseInt(localstorage.getItem("seiVi"));
    let decryption_key = parseInt(localstorage.getItem("bfvgiO_kPe"));
    let selected_duration = parseInt(localstorage.getItem("vKoeldnIw"));
    let hwid = localstorage.getItem("JdokSbox");

    if (!hwid) {
      window.location.href = "/whitelist/selections";
      return;
    }

    const whitelist_duration = [
      { Text: "6 Hours", Checkpoints: 1, Unix: 21600 },
      { Text: "12 Hours", Checkpoints: 2, Unix: 43200 },
      { Text: "1 Day", Checkpoints: 3, Unix: 86400 },
      { Text: "3 Days", Checkpoints: 5, Unix: 259200 },
      { Text: "5 Days", Checkpoints: 8, Unix: 432000 },
      { Text: "7 Days", Checkpoints: 10, Unix: 604800 },
    ];

    let unix, total_checkpoints;
    if (selected_duration >= 0 && selected_duration < whitelist_duration.length) {
      const durationData = whitelist_duration[selected_duration];
      unix = durationData.Unix;
      total_checkpoints = durationData.Checkpoints;
      document.getElementById("key-duration").textContent = durationData.Text;
      document.getElementById("total_checkpoints").textContent = durationData.Checkpoints;
    } else {
      window.location.href = "/whitelist/selections";
      return;
    }

    const last_hash = localstorage.getItem("ehcopahskdnHe");
    if (hash && hash !== last_hash) {
      if (document.referrer === "https://linkvertise.com/") {
        localstorage.setItem("ehcopahskdnHe", hash);
        localstorage.setItem("hdocnoOe", ((parseInt(((parseInt(localstorage.getItem("hdocnoOe")) || 0) / special_key) / special_key) + 1) * special_key) * special_key);
        window.location.href = "/whitelist/checkpoint";
        return;
      } else {
        setBypassed(true);
      }
    }

    if (!special_key || !decryption_key) {
      special_key = Math.floor(Math.random() * 9999999);
      localstorage.setItem("seiVi", special_key);
      localstorage.setItem("bfvgiO_kPe", (64000 * special_key) * special_key);
      window.location.href = "/whitelist/checkpoint";
      return;
    } else if (((decryption_key / special_key) / special_key) === 64000) {
      let current_checkpoint = parseInt(localstorage.getItem("hdocnoOe"));
      if (!current_checkpoint) {
        current_checkpoint = 0;
        localstorage.setItem("hdocnoOe", (3 * special_key) * special_key);
      } else {
        current_checkpoint = ((current_checkpoint / special_key) / special_key) - 3;
      }

      document.getElementById("completed_checkpoints").textContent = current_checkpoint.toString();
      if (current_checkpoint === total_checkpoints) {
        setButtonVisible(false);
        document.getElementById("description").textContent = "You have been authenticated!";
      } else {
        setLink(["https://link-hub.net/978899/overdrive-h-key-system", "https://link-hub.net/978899/overdrive-h-checkpoint-2", "https://direct-link.net/978899/overdrive-h-checkpoint-3"][current_checkpoint] || "");
      }
    }

    setTimeout(() => {
      if (!captchaRef.current) return;
      const captcha = document.createElement("div");
      captcha.id = "hcaptcha-widget";
      captchaRef.current.appendChild(captcha);
      window.hcaptcha.render("hcaptcha-widget", {
        sitekey: "7c404cc6-eef8-438c-ae44-442649bc36fe",
        callback: function(token) {
          if (token.length > 1295) {
            setCompletedCaptcha(true);
            setContinueIcon(true);
            setProceedText("Continue");
          }
        }
      });
    }, 1000);

  }, []);

  const handleProceedClick = useCallback(() => {
    if (completedCaptcha) {
      window.location.href = link;
    }
  }, [completedCaptcha, link]);

  return (
    <> 
      <FadeInSection>
        <Script src="https://js.hcaptcha.com/1/api.js" async defer></Script>

        <div className="min-h-screen flex items-center justify-center bg-black/50">
          <div className="max-w-md w-full bg-transparent border-2 rounded-lg text-white">
            <h1 className="text-2xl font-bold text-center mb-4">Whitelist System</h1>
            <p id="description">Click '<b>Continue</b>' to proceed to the next checkpoint.</p>

            {captchaVisible && <div className="flex justify-center" ref={captchaRef}></div>}
            
            {buttonVisible && (
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleProceedClick}>
                <span className="flex items-center space-x-1">
                  {checkIcon && <Check className="h-6 w-6" />}
                  <p>{proceedText}</p>
                  {continueIcon && <ArrowRightFromLine className="h-6 w-6 ml-auto" />}
                </span>
              </button>
            )}
          </div>
        </div>
      </FadeInSection>
    </>
  );
}
