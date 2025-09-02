// ==UserScript==
// @name        @dev--com.google; toggle ublacklist blocked results
// @match       *://*.google.*/search*
// @version     1.0.1
// @description 2025/08/08, 5:33:45 AM
// @run-at      document-start
// @grant       GM_addElement
// @homepageURL https://github.com/ericchase/browseruserscript--toggle-ublacklist-blocked-results
// ==/UserScript==

// src/lib/ericchase/WebPlatform_DOM_ReadyState_Callback.ts
async function Async_WebPlatform_DOM_ReadyState_Callback(config) {
  async function DOMContentLoaded() {
    removeEventListener('DOMContentLoaded', DOMContentLoaded);
    await config.DOMContentLoaded?.();
  }
  async function load() {
    removeEventListener('load', load);
    await config.load?.();
  }
  switch (document.readyState) {
    case 'loading':
      if (config.DOMContentLoaded !== undefined) {
        addEventListener('DOMContentLoaded', DOMContentLoaded);
      }
      if (config.load !== undefined) {
        addEventListener('load', load);
      }
      break;
    case 'interactive':
      await config.DOMContentLoaded?.();
      if (config.load !== undefined) {
        addEventListener('load', load);
      }
      break;
    case 'complete':
      await config.DOMContentLoaded?.();
      await config.load?.();
      break;
  }
}

// src/lib/server/info.ts
function SERVERHOST() {
  const CheckENV = () => {
    try {
      return;
    } catch {}
  };
  const CheckCurrentScript = () => {
    try {
      return new URL(document.currentScript.src).host;
    } catch {}
  };
  const CheckMetaUrl = () => {
    try {
      return new URL(undefined).host;
    } catch {}
  };
  const CheckError = () => {
    try {
      return new URL(new Error().fileName).host;
    } catch {}
  };
  return CheckENV() ?? CheckCurrentScript() ?? CheckMetaUrl() ?? CheckError() ?? window.location.host;
}

// src/@dev--com.google; toggle ublacklist blocked results.user.ts
Async_WebPlatform_DOM_ReadyState_Callback({
  async DOMContentLoaded() {
    GM_addElement('script', { src: `http://${SERVERHOST()}/com.google; toggle ublacklist blocked results.user.js` });
    GM_addElement('script', { src: `http://${SERVERHOST()}/lib/server/hot-reload.iife.js` });
  },
});
