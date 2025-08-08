// ==UserScript==
// @name        @dev--com.google; toggle ublacklist blocked results
// @match       *://*.google.*/search*
// @version     1.0.1
// @description 2025/08/08, 5:33:45 AM
// @run-at      document-start
// @grant       none
// @homepageURL https://github.com/ericchase/browseruserscript--toggle-ublacklist-blocked-results
// ==/UserScript==

import { WebPlatform_DOM_Inject_Script } from './lib/ericchase/WebPlatform_DOM_Inject_Script.js';
import { Async_WebPlatform_DOM_ReadyState_Callback } from './lib/ericchase/WebPlatform_DOM_ReadyState_Callback.js';
import { SERVER_HOST } from './lib/server/constants.js';

Async_WebPlatform_DOM_ReadyState_Callback({
  async DOMContentLoaded() {
    WebPlatform_DOM_Inject_Script(await fetch(`http://${SERVER_HOST}/com.google; toggle ublacklist blocked results.user.js`).then((response) => response.text()));
    WebPlatform_DOM_Inject_Script(await fetch(`http://${SERVER_HOST}/lib/server/hotrefresh.iife.js`).then((response) => response.text()));
  },
});
