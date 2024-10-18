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
	let localStorage_key = "cnbilinyj-WebCat-WCSSMAMaS--authInfos";
	let e = document.body;
	if(Array.from(e.children).map(i => {
		return i.getAttribute("cnbilinyj-webcat-element");
	}).indexOf("account-settings-dialog") === -1){
		let settingsDialogElement = document.createElement("div");
		settingsDialogElement.setAttribute("cnbilinyj-webcat-element", "account-settings-dialog");
		settingsDialogElement.dialog = mdui.Dialog(settingsDialogElement);
		settingsDialogElement.classList.add("mdui-dialog")
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
