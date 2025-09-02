// ==UserScript==
// @name        @dev--com.google; toggle ublacklist blocked results
// @match       *://*.google.*/search*
// @version     1.0.1
// @description 2025/08/08, 5:33:45 AM
// @run-at      document-start
// @grant       GM_addElement
// @homepageURL https://github.com/ericchase/browseruserscript--toggle-ublacklist-blocked-results
// ==/UserScript==

import { Async_WebPlatform_DOM_ReadyState_Callback } from './lib/ericchase/WebPlatform_DOM_ReadyState_Callback.js';
import { SERVERHOST } from './lib/server/info.js';

Async_WebPlatform_DOM_ReadyState_Callback({
  async DOMContentLoaded() {
    GM_addElement('script', { src: `http://${SERVERHOST()}/com.google; toggle ublacklist blocked results.user.js` });
    GM_addElement('script', { src: `http://${SERVERHOST()}/lib/server/hot-reload.iife.js` });
  },
});
