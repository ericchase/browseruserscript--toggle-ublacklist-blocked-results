// ==UserScript==
// @name        com.google; toggle ublacklist blocked results
// @match       *://*.google.*/search*
// @version     1.0.2
// @description 2025/08/08, 5:33:45 AM
// @run-at      document-start
// @grant       none
// @homepageURL https://github.com/ericchase/browseruserscript--toggle-ublacklist-blocked-results
// ==/UserScript==

/**
 * # Changelog
 * [2025-08-28] 1.0.2
 * - Cleaner and less distracting panel.
 * - Panel stays behind search area.
 */

import panelcss from './floating-panel/panel.css' assert { type: 'text' };
import panelhtml from './floating-panel/panel.html' assert { type: 'text' };
import { WebPlatform_DOM_Element_Added_Observer_Class } from './lib/ericchase/WebPlatform_DOM_Element_Added_Observer_Class.js';
import { WebPlatform_DOM_Inject_CSS } from './lib/ericchase/WebPlatform_DOM_Inject_CSS.js';
import { WebPlatform_Node_Reference_Class } from './lib/ericchase/WebPlatform_Node_Reference_Class.js';

WebPlatform_DOM_Inject_CSS(panelcss);

const parser = new DOMParser();

const panel = WebPlatform_Node_Reference_Class(parser.parseFromString(panelhtml as unknown as string, 'text/html').querySelector('.floating-panel')).as(HTMLDivElement);
const panel_checkbox = WebPlatform_Node_Reference_Class(panel.querySelector('#panel-toggle')).as(HTMLInputElement);
const panel_toggle_label = WebPlatform_Node_Reference_Class(panel.querySelector('#panel-toggle-label')).as(HTMLSpanElement);

const blocked_results = new Set<HTMLDivElement>();

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

WebPlatform_DOM_Element_Added_Observer_Class({
  selector: '#rso',
}).subscribe((element, unsubscribe) => {
  element.prepend(panel);
  unsubscribe();
});

WebPlatform_DOM_Element_Added_Observer_Class({
  selector: 'div[data-ub-result-block="1"]',
}).subscribe((element) => {
  if (element instanceof HTMLDivElement) {
    blocked_results.add(element);
    panel_toggle_label.textContent = `show ${blocked_results.size} blocked search results`;
  }
});
