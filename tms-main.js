// ==UserScript==
// @name		WebCat共享空间总功能脚本	WebCat Shared Space Main Function Script
// @namespace	cnbilinyj-WebCat
// @version		2024-02-17
// @description	您可以管理多个WebCat共享空间的额外功能，并可以对这些功能进行开关	GitHub链接：https://github.com/cnbilinyj/WebCat-Tamper-monkey-script-Tools/
// @author		cnbilinyj
// @match		*://space.webcat.top/*
// @icon		http://x.webcat.top/img/icon.png
// @grant		none
// ==/UserScript==


(function() {
	'use strict';
	let use_settings = JSON.parse(localStorage.getItem("cnbilinyj-WebCat-settings")) || {};
		if((["/", "/index.html"]).indexOf(window.location.pathname) != -1){
			if (use_settings.WCSSPDLF_D){
				let WCSSPDLF_D = document.createElement("script");
				WCSSPDLF_D.setAttribute("src", "https://cnbilinyj.github.io/WebCat-Tamper-monkey-script-Tools/WCSSPDLFaD/tms-main.js");
				document.head.appendChild(WCSSPDLF_D);
			}
			if (use_settings.WCSSMAM_S) {
				let WCSSMAM_S = document.createElement("script");
				WCSSMAM_S.setAttribute("src", "./WCSSMAMaS/tms-main.js");
				document.head.appendChild(WCSSMAM_S);
			}
		}
	// Your code here...
})();