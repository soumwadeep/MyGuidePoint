"use client";

import { useState, useEffect } from "react";
const InstallApp = () => {
  // PWA Install
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);
  const handleInstall = async () => {
    if (deferredPrompt && deferredPrompt.prompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
          setDeferredPrompt(null);
        }
      } catch (error) {
        console.error("Error during app installation:", error);
      }
    }
  };
  return (
    <button className="btn btn-success m-1 shadow-lg" onClick={handleInstall}>
      <i className="bi bi-cloud-download-fill"></i> Install Our App
    </button>
  );
};

export default InstallApp;
