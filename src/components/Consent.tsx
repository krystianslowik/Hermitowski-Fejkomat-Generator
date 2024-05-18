import React, { useState, useEffect } from "react";
import { useI18n } from "./store/i18n";

const GA_TRACKING_ID = "G-HJFW3YRDJ8";

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    [key: string]: any;
  }
}

const CookieConsent: React.FC = () => {
  const { i18n } = useI18n();

  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const savedConsent = localStorage.getItem("fejkomatConsent");
    if (savedConsent !== null) {
      const consentValue = JSON.parse(savedConsent);
      setConsent(consentValue);
      if (consentValue === false) {
        window[`ga-disable-${GA_TRACKING_ID}`] = true;
      }
    }
  }, []);

  const handleAccept = () => {
    setConsent(true);
    localStorage.setItem("fejkomatConsent", JSON.stringify(true));
    window[`ga-disable-${GA_TRACKING_ID}`] = false;
    initializeGoogleAnalytics();
  };

  const handleReject = () => {
    setConsent(false);
    localStorage.setItem("fejkomatConsent", JSON.stringify(false));
    window[`ga-disable-${GA_TRACKING_ID}`] = true;
  };

  const initializeGoogleAnalytics = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_TRACKING_ID, {
      anonymize_ip: true,
      cookie_flags: "SameSite=None;Secure",
    });
  };

  if (consent !== null) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-stone-200 p-4 flex flex-col md:flex-row justify-between items-center shadow-lg border-t-2 border-stone-300 space-y-4 md:space-y-0 md:space-x-4">
      <p className="text-center md:text-left">{i18n("cookieContestText")}</p>
      <div className="flex flex-col w-full space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row sm:w-auto">
        <button
          className="bg-stone-500 hover:bg-stone-600 text-stone-100 font-semibold py-2 px-4 rounded w-full"
          onClick={handleAccept}
        >
          {i18n("accept")}
        </button>
        <button
          className="bg-stone-200 hover:bg-stone-300 border-stone-300 border-2 text-stone-500 py-2 px-4 rounded w-full"
          onClick={handleReject}
        >
          {i18n("reject")}
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
