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
    document.GM_xmlhttpRequest = GM_xmlhttpReques || function(options) {
		// 备份原始回调
		const { onload, onerror, ...restOptions } = options;

		// 构建传给 $.ajax 的配置
		const ajaxOptions = {
			...restOptions, // 保留 method, url, headers, data, timeout 等
			success: function(data, textStatus, xhr) {
				if (onload) {
					// 构造 GM_xmlhttpRequest 风格的响应对象
					const resp = {
						responseText: xhr.responseText,
						status: xhr.status,
						statusText: xhr.statusText,
						responseHeaders: xhr.getAllResponseHeaders(), // 字符串形式
						finalUrl: xhr.responseURL,
					};
					onload(resp);
				}
			},
			error: function(xhr, textStatus, errorThrown) {
				if (onerror) {
					const errorMsg = errorThrown || textStatus || 'Request failed';
					onerror(errorMsg);
				}
			}
		};

		// 调用 MDUI 的 $.ajax
		$.ajax(ajaxOptions);
	};
    // document.write(document.documentElement.outerHTML);
    // Your code here...
})();