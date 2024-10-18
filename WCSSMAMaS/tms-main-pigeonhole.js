// ==UserScript==
// @name		WebCat共享空间多账户管理和切换	WebCat Shared Space Multi-account Management and Switching
// @namespace	cnbilinyj-
// @version		2024-02-17
// @description	您可以管理多个WebCat空间帐户，并在这些账户之间互相切换。	You can manage multiple WebCat space accounts and switch accounts between them.	GitHub Gists链接：https://gist.github.com/cnbilinyj/374b7e2832474ba6ca4e3b2d100bbae0	x浏览器用户ID：wjrbilibilinyj@163.com	邮箱：wjrbilibilinyj@163.com	GitHub用户名：cnbilinyj
// @author		cnbilinyj
// @match		*://space.webcat.top/*
// @icon		http://x.webcat.top/img/icon.png
// @grant		none
// ==/UserScript==

if((["/", "/index.html"]).indexOf(window.location.pathname) != -1){
	let localStorage_key = {
		"authInfos": "cnbilinyj-WebCat-WCSSMAMaS--authInfos"
	};
	let authInfos = JSON.parse(localStorage.getItem(localStorage_key.authInfos));
	let e = document.body;
	if(Array.from(e.children).map(i => {
		return i.getAttribute("cnbilinyj-webcat-element");
	}).indexOf("account-settings-dialog") === -1){
		let settingsDialogElement = document.createElement("div");
		settingsDialogElement.setAttribute("cnbilinyj-webcat-element", "account-settings-dialog");
		settingsDialogElement.dialog = new mdui.Dialog(settingsDialogElement);
		settingsDialogElement.classList.add("mdui-dialog");
		settingsDialogElement.appendChild((() => {
			let e = document.createElement("div");
			e.classList.add("mdui-dialog-title");
			e.appendChild(document.createTextNode("切换账户"));
			return e;
		})());
		settingsDialogElement.appendChild((() => {
			let e = document.createElement("div");
			e.classList.add("mdui-dialog-content");
			e.appendChild((() => {
				let e = document.createElement("p");
				e.appendChild(document.createTextNode("选择账号："));
				return e;
			})());
			e.appendChild((() => {
				let e = document.createElement("select");
				e.setAttribute("mdui-select", "");
				Object.keys(authInfos).forEach(item => {
					e.appendChild((() => {
						let e = document.createElement("option");
						e.setAttribute("value", item);
						e.appendChild(document.createTextNode(item));
						e.appendChild(document.createTextNode(": "));
						e.appendChild(document.createTextNode(JSON.parse(authInfos[item]).user.username));
						e.appendChild(document.createTextNode(" ("));
						e.appendChild(document.createTextNode(JSON.parse(authInfos[item]).user.userId));
						e.appendChild(document.createTextNode(")"));
						return e;
					})());
				});
				e.appendChild((() => {
					let e = document.createElement("option");
					e.setAttribute("value", "");
					e.appendChild(document.createTextNode("退出登录"));
					return e;
				})());
				return e;
			})());
			e.appendChild((() => {
				let e = document.createElement("div");
				e.classList.add("mdui-dialog-actions", "mdui-dialog-actions-stacked");
				e.appendChild((() => {
					let e = document.createElement("button");
					e.classList.add("mdui-btn", "mdui-ripple");
					e.appendChild(document.createTextNode("确认"));
					e.addEventListener("click", event => {
						let dialog = event.target.dialog;
						let us = dialog.$element[0].children[1].children[1].value;
						if (us != ""){
							localStorage.setItem("authInfo", authInfos[us]);
						}else{
							localStorage.removeItem("authInfo");
						}
						dialog.close();
					})
					return e;
				})());
				return e;
			})());
			return e;
		})());
		e.appendChild(settingsDialogElement);
	}
	e = document.getElementById("left-drawer").getElementsByClassName("mdui-list")[0];
	if(Array.from(e.children).map(i => {
		return i.getAttribute("cnbilinyj-webcat-element");
	}).indexOf("account") === -1){
		let settingsElement = document.createElement("li");
		settingsElement.appendChild((() => {
			let e = document.createElement("i");
			e.classList.add("mdui-list-item-avatar", "mdui-icon", "material-icons", "mdui-color-orange-400", "mdui-text-color-white");
			e.appendChild(document.createTextNode("account_circle"));
			return e;
		})());
		settingsElement.appendChild((() => {
			let e = document.createElement("div");
			e.classList.add("mdui-list-item-content");
			e.appendChild((() => {
				let e = document.createElement("div");
				e.classList.add("mdui-list-item-title");
				e.appendChild(document.createTextNode("切换账号"));
				return e;
			})());
			e.appendChild((() => {
				let e = document.createElement("div");
				e.classList.add("mdui-list-item-text");
				e.appendChild(document.createTextNode("切换账号，刷新生效"));
				return e;
			})());
			return e;
		})());
		settingsElement.classList.add("mdui-list-item", "mdui-ripple");
		settingsElement.setAttribute("cnbilinyj-webcat-element", "account");
		settingsElement.setAttribute("mdui-dialog", "{target: 'div.mdui-dialog[cnbilinyj-webcat-element=\\'account-settings-dialog\\']'}");
		e.appendChild(settingsElement);
	}
	mdui.mutation();
}
