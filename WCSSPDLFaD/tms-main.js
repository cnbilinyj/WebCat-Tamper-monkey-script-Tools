// ==UserScript==
// @name			WebCat共享空间项目直链获取与下载器	WebCat Shared Space Project Direct Link Finder and Downloader
// @namespace		cnbilinyj-WebCat
// @version			2024-10-05
// @description		从外部获取WebCat共享空间项目下载链接并通过下载链接直接进行下载。	Obtain the download link for the WebCat shared space project from external sources and download it directly through the download link.
// @author			cnbilinyj
// @match			http://space.webcat.top/page/detail.html*
// @icon			http://x.webcat.top/img/icon.png
// @grant			none
// ==/UserScript==
(function() {
	'use strict';
	let localStorage_keys = {
		"cache": "cnbilinyj-WebCat-WCSSPDLF&D--cache",
		"ghdata": "cnbilinyj-WebCat-WCSSPDLF&D--ghdata"
	};
	if (window.location.pathname === "/page/detail.html") {
		let element_td = document.querySelector("button[class=\"mdui-btn mdui-btn-icon mdui-color-pink-400 mdui-ripple\"").parentNode;
		document.querySelector("button[class=\"mdui-btn mdui-btn-icon mdui-color-pink-400 mdui-ripple\"").remove();
		let element = document.createElement("a");
		element.setAttribute("class", "mdui-btn mdui-btn-icon mdui-color-blue-400 mdui-ripple");
		let no_free_get_url = function no_free_get_url () {
			vue.download(vue.detailInfo.id, vue.detailInfo.name);

			$.ajax({
				url: "http://source.webcat.top/source/querySourceUrlById",
				type: "GET",
				data: {
					"id": id,
					"token": token
				},
				async: true,
				success(data) {
					if (data.success) {
						var info = data.data;
						var fileUrl = info.fileUrl;
						/* $.ajax({
							url: ""
						}); */
						window.location.href = fileUrl;
					} else {
						mdui.alert(data.message);
					}
				}
			});
		}
		let to_free_download = function to_free_download () {
			window.location.href = download_url;
		}
		element.addEventListener("click", no_free_get_url);
		element.appendChild((() => {
			let e = document.createElement("i");
			e.setAttribute("class", "mdui-icon material-icons");
			e.innerHTML = "more_horiz";
			return e;
		})());
		element_td.appendChild(element);
		let id = window.location.search.split("?")[1].split("&")[window.location.search.split("?")[1].split("&").map(i => {
			return i.split("=")[0].toLowerCase()
		}).indexOf("id")].split("=")[1].padStart(5, "0");
		let urls = [
			"https://cnbilinyj.github.io/WebCat-Tamper-monkey-script-Tools/WCSSPDLFaD/data/",
			"https://jsd.cdn.zzko.cn/gh/cnbilinyj/WebCat-Tamper-monkey-script-Tools@main/WCSSPDLFaD/data/"
		];
		let no_get = function no_get () {
			element.classList.remove("mdui-color-blue-400");
			element.classList.add("mdui-color-red-500");
			element.children[0].innerHTML = "file_download";
			localStorage.setItem(localStorage_keys.cache, JSON.stringify(cache));
		}
		let get_ok = function get_ok (download_url) {
			element.classList.remove("mdui-color-blue-400");
			element.classList.add("mdui-color-green-500");
			element.children[0].innerHTML = "file_download";
			element.removeEventListener("click", no_free_get_url)
			element.addEventListener("click", to_free_download)
			localStorage.setItem(localStorage_keys.cache, JSON.stringify(cache));
		}
		let cache = JSON.parse(localStorage.getItem(localStorage_keys.cache)) || [];
		let get_5 = function get_5 (urln) {
			if (urln >= urls.length) {
				no_get();
				return;
			}
			let idn = parseInt(id.slice(0, -4));
			if (cache[idn]) {
				/*
				如果本地存在这一等级的记录则直接使用本地的
				原本可以直接存储是否有当前ID的项目的下载链接
				但是考虑到这种情况出现率较低，所以才做成查找本地同等级记录的形式
				这样可以使得比如当前项目ID是45678，曾经从网络记录得到过46789
				即可节省从网络请求万级(4)的数据
				从而节省下这一部分的网络请求时间和次数以及网络请求所消耗的流量
				*/
				get_34(urln, true);
				return;
			} else {
				let url_ = urls[urln];
				let get_5_xhr = new XMLHttpRequest();
				get_5_xhr.open("GET", `${url_}index.json?timestamp=${new Date().getTime()}`, true);
				get_5_xhr.addEventListener("load", event => {
					let net_data = JSON.parse(event.target.responseText);
					net_data.forEach((v, i) => {
						cache[i] = cache[i] || (v?[]:v);
					});
					if (net_data[idn]) {
						get_34(urln, false);
					} else {
						no_get();
						return;
					}
				});
				get_5_xhr.addEventListener("error", event => {
					get_5(urln + 1);
				});
				get_5_xhr.send();
			}
		}
		let get_34 = function get_34 (urln, get_local) {
			let idn5 = parseInt(id.slice(0, -4));
			let idn34 = parseInt(id.slice(-4, -2));
			if (urln >= urls.length) {
				no_get();
				return;
			}
			if (get_local && cache[idn5][idn34]) {
				get_12(urln, true);
				return;
			} else {
				let url_ = urls[urln];
				let get_34_xhr = new XMLHttpRequest();
				get_34_xhr.open("GET", `${url_}${idn5}/index.json?timestamp=${new Date().getTime()}`, true);
				get_34_xhr.addEventListener("load", event => {
					let net_data = JSON.parse(event.target.responseText);
					net_data.forEach((v, i) => {
						cache[idn5][i] = cache[idn5][i] || (v?[]:v);
					});
					if (net_data[idn34]) {
						get_12(urln, false);
					} else {
						no_get();
					}
				});
				get_34_xhr.addEventListener("error", event => {
					get_34(urln + 1);
				});
				get_34_xhr.send();
			}
		}
		let get_12 = function get_12 (urln, get_local) {
			let idn5 = parseInt(id.slice(0, -4));
			let idn34 = parseInt(id.slice(-4, -2));
			let idn12 = parseInt(id.slice(-2));
			if (urln >= urls.length) {
				no_get();
				return;
			}
			if (get_local && cache[idn5][idn34][idn12]) {
				get_ok(cache[idn5][idn34][idn12]);
				return;
			} else {
				let url_ = urls[urln];
				let get_12_xhr = new XMLHttpRequest();
				get_12_xhr.open("GET", `${url_}${idn5}/${idn34}.json?timestamp=${new Date().getTime()}`, true);
				get_12_xhr.addEventListener("load", event => {
					let net_data = JSON.parse(event.target.responseText);
					net_data.forEach((v, i) => {
						cache[idn5][idn34][i] = v;
					});
					if (net_data[idn12]) {
						get_ok(net_data[idn12]);
					} else {
						no_get();
					}
				});
				get_12_xhr.addEventListener("error", event => {
					get_12(urln + 1, false);
				});
				get_12_xhr.send();
			}
		}
		get_5(0);
		mdui.mutation();
	} else if ((["/", "/index.html"]).indexOf(window.location.pathname) !== -1) {
		let ghdata = JSON.parse(localStorage.getItem(localStorage_keys.ghdata) || "{}");
		let e = document.getElementById("left-drawer").getElementsByClassName("mdui-list")[0];
		if(Array.from(e.children).map(i => {
			return i.getAttribute("cnbilinyj-webcat-element");
		}).indexOf("WCSSPDLFaD") === -1){
			let settingsElement = document.createElement("li");
			settingsElement.appendChild((() => {
				let e = document.createElement("i");
				e.classList.add("mdui-list-item-avatar", "mdui-icon", "material-icons", "mdui-color-deep-purple-400", "mdui-text-color-white");
				e.appendChild(document.createTextNode("file_download"));
				return e;
			})());
			settingsElement.appendChild((() => {
				let e = document.createElement("div");
				e.classList.add("mdui-list-item-content");
				e.appendChild((() => {
					let e = document.createElement("div");
					e.classList.add("mdui-list-item-title");
					e.appendChild(document.createTextNode("免费下载工具设置"));
					return e;
				})());
				e.appendChild((() => {
					let e = document.createElement("div");
					e.classList.add("mdui-list-item-text");
					e.appendChild(document.createTextNode("登录、清理缓存"));
					return e;
				})());
				return e;
			})());
			settingsElement.classList.add("mdui-list-item", "mdui-ripple");
			settingsElement.setAttribute("cnbilinyj-webcat-element", "WCSSPDLFaD");
			settingsElement.setAttribute("mdui-dialog", "{target: 'div.mdui-dialog[cnbilinyj-webcat-element=\\'cnbilinyj-WebCat-WCSSPDLFaD--settings-dialog\\']'}");
			e.appendChild(settingsElement);
		}
		if(Array.from(document.body.children).map(i => {
			return i.getAttribute("cnbilinyj-WebCat-WCSSPDLFaD--settings-dialog");
		}).indexOf("WCSSPDLFaD") === -1){
			document.body.appendChild((() => {
				let e = document.createElement("div");
				e.classList.add("mdui-dialog");
				e.setAttribute("cnbilinyj-webcat-element", "cnbilinyj-WebCat-WCSSPDLFaD--settings-dialog");
				e.appendChild((() => {
					let e = document.createElement("div");
					e.classList.add("mdui-dialog-title");
					e.appendChild(document.createTextNode("设置"));
					return e;
				})());
				e.appendChild((() => {
					let e = document.createElement("div");
					e.classList.add("mdui-dialog-content");
					e.appendChild((() => {
						let e = document.createElement("div");
						e.appendChild((() => {
							let e = document.createElement("div");
							e.appendChild((() => {
								let e = document.createElement("h4");
								e.appendChild(document.createTextNode("链接共享"));
								return e;
							})());
							e.appendChild((() => {
								let e = document.createElement("div");
								let es = [];
								e.appendChild(document.createTextNode("公开获取到的链接"));
								e.appendChild(document.createElement("br"));
								e.appendChild((() => {
									let e = document.createElement("label");
									e.classList.add("mdui-switch");
									e.appendChild((() => {
										let e = document.createElement("input");
										es[0] = e;
										e.setAttribute("type", "checkbox");
										return e;
									})());
									e.appendChild((() => {
										let e = document.createElement("i");
										e.classList.add("mdui-switch-icon");
										return e;
									})());
									return e;
								})());
								e.appendChild((() => {
									let e = document.createElement("span");
									es[1] = e;
									e.style.fontSize = "13px";
									e.style.paddingLeft = "4px";
									e.classList.add("mdui-text-color-theme-icon-disabled");
									return e;
								})());
								e.appendChild((() => {
									let e = document.createElement("button");
									e.classList.add("mdui-text-color-theme-icon-disabled", "mdui-ripple");
									e.setAttribute("style", "user-select: none ; background-color: #0d1117 ; align-items: center ; color: #e6edf3 ; border: none ; padding: 8px ; display: flex ; border-radius: 24px ; color: #e6edf3 !important;");
									e.appendChild((() => {
										let e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
										e.setAttribute("aria-hidden", "true");
										e.setAttribute("focusable", "false");
										e.setAttribute("viewBox", "0 0 24 24");
										e.setAttribute("width", "32");
										e.setAttribute("height", "32");
										e.setAttribute("fill", "#e6edf3");
										e.style.display = "inline-block";
										e.style.verticalAlign = "text-bottom";
										e.style.overflow = "visible";
										e.appendChild((() => {
											let e = document.createElementNS("http://www.w3.org/2000/svg", "path");
											e.setAttribute("d", "M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z");
											return e;
										})());
										return e;
									})());
									e.appendChild((() => {
										let e = document.createElement("span");
										e.style.paddingLeft = "8px";
										e.style.fontWeight = "500";
										e.style.alignItems = "center";
										e.style.borderRadius = "24px";
										e.appendChild(document.createTextNode("使用GitHub登录"));
										return e;
									})());
									e.addEventListener("click", () => {
										window.location.href = "https://github.com/login/oauth/authorize?client_id=Iv23liEF9J3QYAIhKy5W&redirect_uri=http%3A%2F%2Fspace.webcat.top%2FGitHubOAuth";
									});
									return e;
								})());
								if (!ghdata.ght) {
									es[0].setAttribute("disabled", "");
									es[1].appendChild(document.createTextNode("需要登录GitHub才能共享链接"));
								}
								return e;
							})());
							return e;
						})());
						return e;
					})());
					e.appendChild((() => {
						let e = document.createElement("div");
						e.classList.add("mdui-dialog-actions");
						return e;
					})());
					return e;
				})());
				return e;
			})());
		}
		mdui.mutation();
	} else if (window.location.pathname === "/GitHubOAuth") {
		let searchs = window.location.search.slice(1).split("&").map(i => i.split("="));
		let search_keys = searchs.map(i => i[0]);
		let code = searchs[search_keys.indexOf("code")][1];
		let data = {};
		let client_id = "Iv23liEF9J3QYAIhKy5W";
		let client_secret = "45d03041a8c8668d3dc8368818997a66bd77acfd";
		let get_token_xhr = new XMLHttpRequest();
		get_token_xhr.open("POST", `https://github.com/login/oauth/access_token?client_id=${client_id}&redirect_uri=http%3A%2F%2Fspace.webcat.top%2FGitHubOAuth&client_secret=${client_secret}&code=${code}`, true);
		get_token_xhr.setRequestHeader("Accept", "application/json");
		get_token_xhr.addEventListener("load", event => {
			let token = JSON.parse(event.target.responseText).access_token;
			let get_user_info_xhr = new XMLHttpRequest();
			get_user_info_xhr.open("GET", "https://api.github.com/user", true);
			get_user_info_xhr.setRequestHeader("Accept", "application/json");
			get_user_info_xhr.setRequestHeader("Authorization", `Bearer ${token}`);
			get_user_info_xhr.addEventListener("load", event => {
				JSON.parse(event.target.responseText);
			});
			get_user_info_xhr.send();
		});
		get_token_xhr.send(JSON.stringify({
			"client_id": client_id,
			"code": code,
			"client_secret": client_secret
		}));
	}
})();
