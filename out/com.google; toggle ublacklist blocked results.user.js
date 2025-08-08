// ==UserScript==
// @name        com.google; toggle ublacklist blocked results
// @match       *://*.google.*/search*
// @version     1.0.0
// @description 2025/08/08, 5:33:45 AM
// @run-at      document-start
// @grant       none
// @homepageURL https://github.com/ericchase-library/ts-templates-browser-userscript
// ==/UserScript==

// src/floating-panel/panel.css
var panel_default = `div.floating-panel {
  align-items: center;
  background: #ffffff;
  border: 0.125em solid red;
  display: inline-flex;
  font-family: Arial, sans-serif;
  gap: 0.75em;
  margin-bottom: 1em;
  position: sticky;
  top: 4em;
  user-select: none;
  z-index: 999999;
}
div.floating-panel > label.panel-label {
  align-items: center;
  color: #111827;
  display: flex;
  font-size: 1em;
  gap: 0.5em;
  padding: 0.5em 0.625em;
}
div.floating-panel > label > span.checkbox {
  background: #fff;
  border-radius: 0.25em;
  border: 0.0625em solid #cfcfcf;
  cursor: pointer;
  display: inline-grid;
  min-width: 1.125em;
  min-height: 1.125em;
  width: 1.125em;
  height: 1.125em;
  place-items: center;
}
div.floating-panel > label > span.checkbox > input {
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
  display: grid;
  font-size: 1em;
  height: 100%;
  margin: 0;
  outline: none;
  place-items: center;
  width: 100%;
}
div.floating-panel > label > span.checkbox > input:checked {
  background: #0b66ff;
  border: 0.0625em solid #0b66ff;
}
div.floating-panel > label > span.checkbox > input:checked::after {
  border-bottom: 0.125em solid #fff;
  border-left: 0.125em solid #fff;
  content: '';
  display: block;
  height: 0.25em;
  transform: rotate(-45deg);
  width: 0.5em;
}
`;

// src/floating-panel/panel.html
var panel_default2 = `<div class="floating-panel" role="region" aria-label="Settings panel" tabindex="0">
  <label class="panel-label">
    <span class="checkbox" aria-hidden="true">
      <input id="panel-toggle" type="checkbox" aria-labelledby="panel-toggle-label" />
    </span>
    <span id="panel-toggle-label">show blocked search results</span>
  </label>
</div>
`;

// src/lib/ericchase/WebPlatform_DOM_Inject_CSS.ts
function WebPlatform_DOM_Inject_CSS(styles) {
  const stylesheet = new CSSStyleSheet;
  stylesheet.replaceSync(styles);
  document.adoptedStyleSheets.push(stylesheet);
  return stylesheet;
}

// src/lib/ericchase/WebPlatform_DOM_ReadyState_Callback.ts
async function Async_WebPlatform_DOM_ReadyState_Callback(config) {
  async function DOMContentLoaded() {
    removeEventListener("DOMContentLoaded", DOMContentLoaded);
    await config.DOMContentLoaded?.();
  }
  async function load() {
    removeEventListener("load", load);
    await config.load?.();
  }
  switch (document.readyState) {
    case "loading":
      if (config.DOMContentLoaded !== undefined) {
        addEventListener("DOMContentLoaded", DOMContentLoaded);
      }
      if (config.load !== undefined) {
        addEventListener("load", load);
      }
      break;
    case "interactive":
      await config.DOMContentLoaded?.();
      if (config.load !== undefined) {
        addEventListener("load", load);
      }
      break;
    case "complete":
      await config.DOMContentLoaded?.();
      await config.load?.();
      break;
  }
}

// src/lib/ericchase/WebPlatform_Node_Reference_Class.ts
class Class_WebPlatform_Node_Reference_Class {
  node;
  constructor(node) {
    this.node = node;
  }
  as(constructor_ref) {
    if (this.node instanceof constructor_ref) {
      return this.node;
    }
    throw new TypeError(`Reference node ${this.node} is not ${constructor_ref}`);
  }
  is(constructor_ref) {
    return this.node instanceof constructor_ref;
  }
  passAs(constructor_ref, fn) {
    if (this.node instanceof constructor_ref) {
      fn(this.node);
    }
  }
  tryAs(constructor_ref) {
    if (this.node instanceof constructor_ref) {
      return this.node;
    }
  }
  get classList() {
    return this.as(HTMLElement).classList;
  }
  get className() {
    return this.as(HTMLElement).className;
  }
  get style() {
    return this.as(HTMLElement).style;
  }
  getAttribute(qualifiedName) {
    return this.as(HTMLElement).getAttribute(qualifiedName);
  }
  setAttribute(qualifiedName, value) {
    this.as(HTMLElement).setAttribute(qualifiedName, value);
  }
  getStyleProperty(property) {
    return this.as(HTMLElement).style.getPropertyValue(property);
  }
  setStyleProperty(property, value, priority) {
    this.as(HTMLElement).style.setProperty(property, value, priority);
  }
}
function WebPlatform_Node_Reference_Class(node) {
  return new Class_WebPlatform_Node_Reference_Class(node);
}
function WebPlatform_Node_QuerySelector(selector) {
  return WebPlatform_Node_Reference_Class(document.querySelector(selector));
}

// src/lib/ericchase/WebPlatform_NodeList_Reference_Class.ts
class Class_WebPlatform_NodeList_Reference_Class extends Array {
  constructor(nodes) {
    super();
    for (const node of Array.from(nodes ?? [])) {
      try {
        this.push(WebPlatform_Node_Reference_Class(node));
      } catch (_) {}
    }
  }
  as(constructor_ref) {
    return this.filter((ref) => ref.is(constructor_ref)).map((ref) => ref.as(constructor_ref));
  }
  passEachAs(constructor_ref, fn) {
    for (const ref of this) {
      ref.passAs(constructor_ref, fn);
    }
  }
}
function WebPlatform_NodeList_Reference_Class(nodes) {
  return new Class_WebPlatform_NodeList_Reference_Class(nodes);
}
function WebPlatform_Node_QuerySelectorAll(...selectors) {
  return WebPlatform_NodeList_Reference_Class(document.querySelectorAll(selectors.join(",")));
}

// src/com.google; toggle ublacklist blocked results.user.ts
var parser = new DOMParser;
Async_WebPlatform_DOM_ReadyState_Callback({
  async DOMContentLoaded() {
    WebPlatform_DOM_Inject_CSS(panel_default);
    const blocked_results = WebPlatform_Node_QuerySelectorAll(`div[data-ub-result-block="1"]`).as(HTMLDivElement);
    const panel = WebPlatform_Node_Reference_Class(parser.parseFromString(panel_default2, "text/html").querySelector(".floating-panel")).as(HTMLDivElement);
    const panel_checkbox = WebPlatform_Node_Reference_Class(panel.querySelector("#panel-toggle")).as(HTMLInputElement);
    const panel_toggle_label = WebPlatform_Node_Reference_Class(panel.querySelector("#panel-toggle-label")).as(HTMLSpanElement);
    panel_toggle_label.textContent = `show ${blocked_results.length} blocked search results`;
    if (blocked_results.length === 0) {
      panel.style.setProperty("display", "none");
    } else {
      panel.style.removeProperty("display");
    }
    setInterval(() => {
      panel_toggle_label.textContent = `show ${blocked_results.length} blocked search results`;
      if (blocked_results.length === 0) {
        panel.style.setProperty("display", "none");
      } else {
        panel.style.removeProperty("display");
      }
    }, 1000);
    WebPlatform_Node_QuerySelector("#rso").as(HTMLDivElement).prepend(panel);
    panel_checkbox.addEventListener("input", () => {
      if (panel_checkbox.checked === true) {
        for (const result of blocked_results) {
          result.style.setProperty("display", "block", "important");
        }
      } else {
        for (const result of blocked_results) {
          result.style.removeProperty("display");
        }
      }
    });
  }
});
