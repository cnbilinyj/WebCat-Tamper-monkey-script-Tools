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
	let e = document.getElementById("left-drawer").getElementsByClassName("mdui-list")[0];
	if(Array.from(e.children).map(i => {
		return i.getAttribute("cnbilinyj-webcat-element");
	}).indexOf("account") === -1){
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
		settingsElement.setAttribute("cnbilinyj-webcat-element", "account");
		settingsElement.setAttribute("mdui-dialog", "{target: 'div.mdui-dialog[cnbilinyj-webcat-element=\\'account-settings-dialog\\']'}");
		e.appendChild(settingsElement);
	}
	e = document.body;
	if(Array.from(e.children).map(i => {
		return i.getAttribute("cnbilinyj-webcat-element");
	}).indexOf("account-settings-dialog") === -1){
		let settingsDialogElement = document.createElement("div");
		settingsDialogElement.
		e.appendChild(settingsDialogElement);
	}
	mdui.mutation();
}
