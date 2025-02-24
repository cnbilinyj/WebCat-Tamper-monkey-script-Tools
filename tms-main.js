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
	if (use_settings.WCSSMAM_S && (["/", "/index.html"]).indexOf(window.location.pathname) != -1) {
		let WCSSMAM_S = document.createElement("script");
		WCSSMAM_S.setAttribute("src", `https://cnbilinyj.github.io/WebCat-Tamper-monkey-script-Tools/WCSSMAMaS/tms-main${use_settings.WCSSMAM_S_pigeonhole?"-pigeonhole":""}.js?timestamp=${new Date().valueOf()}`);
		document.documentElement.appendChild(WCSSMAM_S);
	}
	if (use_settings.WCSSPDLF_D && (["/", "/index.html", "/page/detail.html", "/GitHubOAuth"]).indexOf(window.location.pathname) != -1){
		let WCSSPDLF_D = document.createElement("script");
		WCSSPDLF_D.setAttribute("src", `https://cnbilinyj.github.io/WebCat-Tamper-monkey-script-Tools/WCSSPDLFaD/tms-main${use_settings.WCSSPDLF_D_pigeonhole?"-pigeonhole":""}.js?timestamp=${new Date().valueOf()}`);
		document.documentElement.appendChild(WCSSPDLF_D);
	}
	if((["/", "/index.html"]).indexOf(window.location.pathname) != -1){
		let drawer = document.getElementById("left-drawer");
		let e = drawer.getElementsByClassName("mdui-list")[0];
		if(Array.from(e.children).map(i => {
			return i.getAttribute("cnbilinyj-webcat-element");
		}).indexOf("settings") === -1){
			let settingsElement = document.createElement("li");
			settingsElement.appendChild((() => {
				let e = document.createElement("i");
				e.classList.add("mdui-list-item-avatar", "mdui-icon", "material-icons", "mdui-color-deep-purple-400", "mdui-text-color-white");
				e.appendChild(document.createTextNode("settings"));
				return e;
			})());
			settingsElement.appendChild((() => {
				let e = document.createElement("div");
				e.classList.add("mdui-list-item-content");
				e.appendChild((() => {
					let e = document.createElement("div");
					e.classList.add("mdui-list-item-title");
					e.appendChild(document.createTextNode("工具设置"));
					return e;
				})());
				e.appendChild((() => {
					let e = document.createElement("div");
					e.classList.add("mdui-list-item-text");
					e.appendChild(document.createTextNode("农药君WebCat工具设置"));
					return e;
				})());
				return e;
			})());
			settingsElement.classList.add("mdui-list-item", "mdui-ripple");
			settingsElement.setAttribute("cnbilinyj-webcat-element", "settings");
			settingsElement.setAttribute("mdui-dialog", "{target: 'div.mdui-dialog[cnbilinyj-webcat-element=\\'settings-dialog\\']'}");
			e.appendChild(settingsElement);
		}
		if(Array.from(document.body.children).map(i => {
			return i.getAttribute("cnbilinyj-webcat-element");
		}).indexOf("settings-dialog") === -1){
			let settingsDialogElement = document.createElement("div");
			settingsDialogElement.setAttribute("cnbilinyj-webcat-element", "settings-dialog");
			settingsDialogElement.classList.add("mdui-dialog");
			settingsDialogElement.appendChild((() => {
				let e = document.createElement("div");
				e.classList.add("mdui-dialog-content");
				e.appendChild((() => {
					let e = document.createElement("p");
					e.appendChild((() => {
						let e = document.createElement("div");
						e.classList.add("mdui-dialog-title");
						e.appendChild(document.createTextNode("WebCat共享空间总功能脚本设置"));
						return e;
					})());
					e.appendChild(document.createTextNode("作者：农药君（GitHub："));
					e.appendChild((() => {
						let e = document.createElement("a");
						e.href = "https://github.com/cnbilinyj";
						e.classList.add("mdui-text-color-green-400");
						e.target = "_blank";
						e.appendChild(document.createTextNode("cnbilinyj"));
						return e;
					})());
					e.appendChild(document.createTextNode("）"));
					return e;
				})());
				e.appendChild((() => {
					let e = document.createElement("div");
					e.appendChild((() => {
						let e = document.createElement("div");
						e.appendChild((() => {
							let e = document.createElement("div");
							e.appendChild((() => {
								let e = document.createElement("h4");
								e.appendChild(document.createTextNode("多账户管理与切换功能"));
								return e;
							})());
							e.appendChild((() => {
								let e = document.createElement("lable");
								e.appendChild(document.createTextNode("启用"));
								return e;
							})());
							e.appendChild(document.createElement("br"));
							e.appendChild((() => {
								let e = document.createElement("lable");
								let e2 = document.createElement("input");
								e2.type = "checkbox";
								e2.checked = use_settings.WCSSMAM_S;
								e.addEventListener("click", () => {
									e2.checked = !e2.checked;
									use_settings.WCSSMAM_S = e2.checked;
								});
								e.appendChild(e2);
								e.appendChild((() => {
									let e = document.createElement("i");
									e.classList.add("mdui-switch-icon")
									return e;
								})());
								e.classList.add("mdui-switch");
								return e;
							})());
							e.appendChild(document.createElement("br"));
							e.appendChild(document.createElement("br"));
							e.appendChild((() => {
								let e = document.createElement("lable");
								e.appendChild(document.createTextNode("测试版"));
								return e;
							})());
							e.appendChild(document.createElement("br"));
							e.appendChild((() => {
								let e = document.createElement("lable");
								let e2 = document.createElement("input");
								e2.type = "checkbox";
								e2.checked = use_settings.WCSSMAM_S_pigeonhole;
								e.addEventListener("click", () => {
									e2.checked = !e2.checked;
									use_settings.WCSSMAM_S_pigeonhole = e2.checked;
								});
								e.appendChild(e2);
								e.appendChild((() => {
									let e = document.createElement("i");
									e.classList.add("mdui-switch-icon")
									return e;
								})());
								e.classList.add("mdui-switch");
								return e;
							})());
							e.appendChild(document.createElement("br"));
							e.appendChild(document.createElement("br"));
							e.appendChild((() => {
								let e = document.createElement("button");
								e.appendChild(document.createTextNode("清空数据"));
								e.classList.add("mdui-btn");
								e.addEventListener("click", () => {
									(["cnbilinyj-WebCat-WCSSMAMaS--authInfos"]).forEach(i => {
										localStorage.removeItem(i);
									});
								});
								return e;
							})());
							return e;
						})());
						e.appendChild(document.createElement("hr"));
						e.appendChild((() => {
							let e = document.createElement("div");
							e.appendChild((() => {
								let e = document.createElement("h4");
								e.appendChild(document.createTextNode("免费下载工具"));
								return e;
							})());
							e.appendChild((() => {
								let e = document.createElement("lable");
								e.appendChild(document.createTextNode("启用"));
								return e;
							})());
							e.appendChild(document.createElement("br"));
							e.appendChild((() => {
								let e = document.createElement("lable");
								let e2 = document.createElement("input");
								e2.type = "checkbox";
								e2.checked = use_settings.WCSSPDLF_D;
								e.addEventListener("click", () => {
									e2.checked = !e2.checked;
									use_settings.WCSSPDLF_D = e2.checked;
								});
								e.appendChild(e2);
								e.appendChild((() => {
									let e = document.createElement("i");
									e.classList.add("mdui-switch-icon")
									return e;
								})());
								e.classList.add("mdui-switch");
								return e;
							})());
							e.appendChild(document.createElement("br"));
							e.appendChild(document.createElement("br"));
							e.appendChild((() => {
								let e = document.createElement("lable");
								e.appendChild(document.createTextNode("测试版"));
								return e;
							})());
							e.appendChild(document.createElement("br"));
							e.appendChild((() => {
								let e = document.createElement("lable");
								let e2 = document.createElement("input");
								e2.type = "checkbox";
								e2.checked = use_settings.WCSSPDLF_D_pigeonhole;
								e.addEventListener("click", () => {
									e2.checked = !e2.checked;
									use_settings.WCSSPDLF_D_pigeonhole = e2.checked;
								});
								e.appendChild(e2);
								e.appendChild((() => {
									let e = document.createElement("i");
									e.classList.add("mdui-switch-icon")
									return e;
								})());
								e.classList.add("mdui-switch");
								return e;
							})());
							e.appendChild(document.createElement("br"));
							e.appendChild(document.createElement("br"));
							e.appendChild((() => {
								let e = document.createElement("button");
								e.appendChild(document.createTextNode("清空缓存"));
								e.classList.add("mdui-btn");
								e.addEventListener("click", () => {
									(["cnbilinyj-WebCat-WCSSPDLF&D--cache"]).forEach(i => {
										localStorage.removeItem(i);
									});
								});
								return e;
							})());
							return e;
						})());
						return e;
					})());
					return e;
				})());
				e.appendChild((() => {
					let e = document.createElement("div");
					e.classList.add("mdui-dialog-actions");
					e.appendChild((() => {
						let e = document.createElement("button");
						e.classList.add("mdui-btn", "mdui-color-theme-accent", "mdui-ripple");
						e.appendChild(document.createTextNode("保存"));
						e.setAttribute("mdui-dialog-confirm", "{target: 'div.mdui-dialog[cnbilinyj-webcat-element=\\'settings-dialog\\']'}");
						e.setAttribute("mdui-dialog-close", "{target: 'div.mdui-dialog[cnbilinyj-webcat-element=\\'settings-dialog\\']'}");
						e.addEventListener("click", () => {
							console.log(use_settings);
							localStorage.setItem("cnbilinyj-WebCat-settings", JSON.stringify(use_settings));
							mdui.alert("需要刷新才能应用设置", "需要刷新", function () {
								location.reload();
							});
						});
						return e;
					})());
					return e;
				})());
				return e;
			})());
			document.body.appendChild(settingsDialogElement);
			mdui.mutation();
		}
		if(getQueryVariable("isDark") === "true"){
			document.getElementById("left-drawer").classList.remove("mdui-color-white");
			document.getElementById("left-drawer").classList.add("mdui-theme-layout-dark");
		}
	}
	// Your code here...
})();