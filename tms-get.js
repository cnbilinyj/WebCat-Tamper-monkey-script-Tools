// ==UserScript==
// @name         WebCat共享空间篡改猴脚本工具
// @namespace    cnbilinyj-webcat
// @version      2024-10-10
// @description  WebCat的外接脚本工具
// @author       cnbilinyj
// @match        *://space.webcat.top/*
// @icon         http://x.webcat.top/img/icon.png
// @grant        GM_xmlhttpRequest
// @connect      api.github.com
// @run-at       document-end
// @downloadURL  https://cnbilinyj.github.io/WebCat-Tamper-monkey-script-Tools/tms-get.js
// @updateURL    https://cnbilinyj.github.io/WebCat-Tamper-monkey-script-Tools/tms-get.js
// ==/UserScript==

(function() {
    'use strict';
    let script = document.createElement("script");
    script.setAttribute("src", `https://cnbilinyj.github.io/WebCat-Tamper-monkey-script-Tools/tms-main.js?timestamp=${new Date().valueOf()}`);
    document.documentElement.appendChild(script);
    document.GM_xmlhttpRequest = GM_xmlhttpRequest;
    // document.write(document.documentElement.outerHTML);
    // Your code here...
})();