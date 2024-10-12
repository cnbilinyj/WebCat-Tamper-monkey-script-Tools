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
						$.ajax({
							url: ""
						});
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
			localStorage.setItem("cnbilinyj-WebCat-WCSSPDLF&D", JSON.stringify(data));
		}
		let get_ok = function get_ok (download_url) {
			element.classList.remove("mdui-color-blue-400");
			element.classList.add("mdui-color-green-500");
			element.children[0].innerHTML = "file_download";
			element.removeEventListener("click", no_free_get_url)
			element.addEventListener("click", to_free_download)
			localStorage.setItem("cnbilinyj-WebCat-WCSSPDLF&D", JSON.stringify(data));
		}
		let data = JSON.parse(localStorage.getItem("cnbilinyj-WebCat-WCSSPDLF&D--cache")) || [];
		let get_5 = function get_5 (urln) {
			if (urln >= urls.length) {
				no_get();
				return;
			}
			let idn = parseInt(id.slice(0, -4));
			if (data[idn]) {
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
						data[i] = data[i] || (v?[]:v);
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
			if (get_local && data[idn5][idn34]) {
				get_12(urln, true);
				return;
			} else {
				let url_ = urls[urln];
				let get_34_xhr = new XMLHttpRequest();
				get_34_xhr.open("GET", `${url_}${idn5}/index.json?timestamp=${new Date().getTime()}`, true);
				get_34_xhr.addEventListener("load", event => {
					let net_data = JSON.parse(event.target.responseText);
					net_data.forEach((v, i) => {
						data[idn5][i] = data[idn5][i] || (v?[]:v);
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
			if (get_local && data[idn5][idn34][idn12]) {
				get_ok(data[idn5][idn34][idn12]);
				return;
			} else {
				let url_ = urls[urln];
				let get_12_xhr = new XMLHttpRequest();
				get_12_xhr.open("GET", `${url_}${idn5}/${idn34}.json?timestamp=${new Date().getTime()}`, true);
				get_12_xhr.addEventListener("load", event => {
					let net_data = JSON.parse(event.target.responseText);
					net_data.forEach((v, i) => {
						data[idn5][idn34][i] = v;
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
	} else if ((["/", "/index.html"]).indexOf(window.location.pathname) !== -1) {
		if(Array.from(e.children).map(i => {
			return i.getAttribute("cnbilinyj-webcat-element");
		}).indexOf("WCSSPDLFaD") === -1){
			let settingsElement = document.createElement("li");
			settingsElement.appendChild((() => {
				let e = document.createElement("i");
				e.classList.add("mdui-list-item-avatar", "mdui-icon", "material-icons", "mdui-color-deep-purple-400", "mdui-text-color-white");
				e.innerText = "";
				return e;
			})());
			settingsElement.appendChild((() => {
				let e = document.createElement("div");
				e.classList.add("mdui-list-item-content");
				e.appendChild((() => {
					let e = document.createElement("div");
					e.classList.add("mdui-list-item-title");
					e.innerText = "免费下载工具设置";
					return e;
				})());
				e.appendChild((() => {
					let e = document.createElement("div");
					e.classList.add("mdui-list-item-text");
					e.innerText = "登录、清理缓存，样样都能干";
					return e;
				})());
				return e;
			})());
			settingsElement.classList.add("mdui-list-item", "mdui-ripple");
			settingsElement.setAttribute("cnbilinyj-webcat-element", "WCSSPDLFaD");
			settingsElement.setAttribute("mdui-dialog", "{target: 'div.mdui-dialog[cnbilinyj-webcat-element=\\'settings-dialog\\']'}");
			e.appendChild(settingsElement);
		}
	}
	mdui.mutation();
})();
