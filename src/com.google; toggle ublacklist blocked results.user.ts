// ==UserScript==
// @name        com.google; toggle ublacklist blocked results
// @match       *://*.google.*/search*
// @version     1.0.0
// @description 2025/08/08, 5:33:45 AM
// @run-at      document-start
// @grant       none
// @homepageURL https://github.com/ericchase-library/ts-templates-browser-userscript
// ==/UserScript==

import panelcss from './floating-panel/panel.css' assert { type: 'text' };
import panelhtml from './floating-panel/panel.html' assert { type: 'text' };
import { WebPlatform_DOM_Inject_CSS } from './lib/ericchase/WebPlatform_DOM_Inject_CSS.js';
import { Async_WebPlatform_DOM_ReadyState_Callback } from './lib/ericchase/WebPlatform_DOM_ReadyState_Callback.js';
import { WebPlatform_Node_QuerySelector, WebPlatform_Node_Reference_Class } from './lib/ericchase/WebPlatform_Node_Reference_Class.js';
import { WebPlatform_Node_QuerySelectorAll } from './lib/ericchase/WebPlatform_NodeList_Reference_Class.js';

const parser = new DOMParser();

Async_WebPlatform_DOM_ReadyState_Callback({
  async DOMContentLoaded() {
    WebPlatform_DOM_Inject_CSS(panelcss);

    const blocked_results = WebPlatform_Node_QuerySelectorAll(`div[data-ub-result-block="1"]`).as(HTMLDivElement);

    const panel = WebPlatform_Node_Reference_Class(parser.parseFromString(panelhtml as unknown as string, 'text/html').querySelector('.floating-panel')).as(HTMLDivElement);
    const panel_checkbox = WebPlatform_Node_Reference_Class(panel.querySelector('#panel-toggle')).as(HTMLInputElement);
    const panel_toggle_label = WebPlatform_Node_Reference_Class(panel.querySelector('#panel-toggle-label')).as(HTMLSpanElement);
    panel_toggle_label.textContent = `show ${blocked_results.length} blocked search results`;
    setInterval(() => {
      panel_toggle_label.textContent = `show ${blocked_results.length} blocked search results`;
    }, 1000);

    WebPlatform_Node_QuerySelector('#rso').as(HTMLDivElement).prepend(panel);

    panel_checkbox.addEventListener('input', () => {
      if (panel_checkbox.checked === true) {
        for (const result of blocked_results) {
          result.style.setProperty('display', 'block', 'important');
        }
      } else {
        for (const result of blocked_results) {
          result.style.removeProperty('display');
        }
      }
    });
  },
});
