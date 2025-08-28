// ==UserScript==
// @name        com.google; toggle ublacklist blocked results
// @match       *://*.google.*/search*
// @version     1.0.3
// @description 2025/08/08, 5:33:45 AM
// @run-at      document-start
// @grant       none
// @homepageURL https://github.com/ericchase/browseruserscript--toggle-ublacklist-blocked-results
// ==/UserScript==

// src/floating-panel/panel.css
var panel_default = `div.floating-panel {
  align-items: center;
  background: #e2e2e2;
  border-radius: 0.25em;
  color: black;
  display: inline-flex;
  font-family: Arial, sans-serif;
  gap: 0.75em;
  margin-bottom: 1em;
  position: sticky;
  top: 4em;
  user-select: none;
  z-index: 10;
}
@media (prefers-color-scheme: dark) {
  div.floating-panel {
    background: #4d5156;
    color: #f2f2f2;
  }
}
div.floating-panel > label.panel-label {
  align-items: center;
  cursor: pointer;
  display: flex;
  font-size: 1em;
  gap: 0.5em;
  padding: 0.5em;
}
div.floating-panel > label > span.checkbox {
  background: white;
  border-radius: 0.25em;
  cursor: pointer;
  display: inline-grid;
  min-width: 1.125em;
  min-height: 1.125em;
  width: 1.125em;
  height: 1.125em;
  place-items: center;
}
div.floating-panel > label > span.checkbox > input {
  appearance: none;
  -webkit-appearance: none;
  border-radius: 0.25em;
  cursor: pointer;
  display: grid;
  font-size: 1em;
  margin: 0;
  outline: none;
  place-items: center;
  width: 100%;
  height: 100%;
}
div.floating-panel > label > span.checkbox > input:checked {
  background: dodgerblue;
}
/* forms the check */
div.floating-panel > label > span.checkbox > input:checked::after {
  border-bottom: 0.125em solid white;
  border-left: 0.125em solid white;
  content: '';
  display: block;
  transform: rotate(-45deg);
  width: 0.5em;
  height: 0.25em;
}
`;

// src/floating-panel/panel.html
var panel_default2 = `<div class="floating-panel" role="region" aria-label="Settings panel" tabindex="0">
  <label class="panel-label">
    <span class="checkbox" aria-hidden="true">
      <input id="panel-toggle" type="checkbox" aria-labelledby="panel-toggle-label" />
    </span>
    <span id="panel-toggle-label">show 0 blocked search results</span>
  </label>
</div>
`;

// src/lib/ericchase/WebPlatform_DOM_Element_Added_Observer_Class.ts
class Class_WebPlatform_DOM_Element_Added_Observer_Class {
  constructor(config) {
    config.options ??= {};
    this.mutationObserver = new MutationObserver((mutationRecords) => {
      for (const record of mutationRecords) {
        if (record.target instanceof Element && record.target.matches(config.selector)) {
          this.send(record.target);
        }
        const treeWalker = document.createTreeWalker(record.target, NodeFilter.SHOW_ELEMENT);
        while (treeWalker.nextNode()) {
          if (treeWalker.currentNode.matches(config.selector)) {
            this.send(treeWalker.currentNode);
          }
        }
      }
    });
    this.mutationObserver.observe(config.source ?? document.documentElement, {
      childList: true,
      subtree: config.options.subtree ?? true,
    });
    if ((config.include_existing_elements ?? true) === true) {
      const treeWalker = document.createTreeWalker(document, NodeFilter.SHOW_ELEMENT);
      while (treeWalker.nextNode()) {
        if (treeWalker.currentNode.matches(config.selector)) {
          this.send(treeWalker.currentNode);
        }
      }
    }
  }
  disconnect() {
    this.mutationObserver.disconnect();
    for (const callback of this.subscriptionSet) {
      this.subscriptionSet.delete(callback);
    }
  }
  subscribe(callback) {
    this.subscriptionSet.add(callback);
    let abort = false;
    for (const element of this.matchSet) {
      callback(element, () => {
        this.subscriptionSet.delete(callback);
        abort = true;
      });
      if (abort) return () => {};
    }
    return () => {
      this.subscriptionSet.delete(callback);
    };
  }
  mutationObserver;
  matchSet = new Set();
  subscriptionSet = new Set();
  send(element) {
    if (!this.matchSet.has(element)) {
      this.matchSet.add(element);
      for (const callback of this.subscriptionSet) {
        callback(element, () => {
          this.subscriptionSet.delete(callback);
        });
      }
    }
  }
}
function WebPlatform_DOM_Element_Added_Observer_Class(config) {
  return new Class_WebPlatform_DOM_Element_Added_Observer_Class(config);
}

// src/lib/ericchase/WebPlatform_DOM_Inject_CSS.ts
function WebPlatform_DOM_Inject_CSS(styles) {
  const stylesheet = new CSSStyleSheet();
  stylesheet.replaceSync(styles);
  document.adoptedStyleSheets.push(stylesheet);
  return stylesheet;
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

// src/com.google; toggle ublacklist blocked results.user.ts
WebPlatform_DOM_Inject_CSS(panel_default);
var parser = new DOMParser();
var panel = WebPlatform_Node_Reference_Class(parser.parseFromString(panel_default2, 'text/html').querySelector('.floating-panel')).as(HTMLDivElement);
var panel_checkbox = WebPlatform_Node_Reference_Class(panel.querySelector('#panel-toggle')).as(HTMLInputElement);
var panel_toggle_label = WebPlatform_Node_Reference_Class(panel.querySelector('#panel-toggle-label')).as(HTMLSpanElement);
var blocked_results = new Set();
var storage_key = 'ublacklist-show-blocked-search-results';
panel_checkbox.checked = localStorage.getItem(storage_key) ? true : false;
panel_checkbox.addEventListener('input', () => {
  if (panel_checkbox.checked === true) {
    localStorage.setItem(storage_key, 'true');
    for (const result of blocked_results) {
      result.style.setProperty('display', 'block', 'important');
    }
  } else {
    localStorage.removeItem(storage_key);
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
    if (panel_checkbox.checked === true) {
      element.style.setProperty('display', 'block', 'important');
    } else {
      element.style.removeProperty('display');
    }
    panel_toggle_label.textContent = `show ${blocked_results.size} blocked search results`;
  }
});
