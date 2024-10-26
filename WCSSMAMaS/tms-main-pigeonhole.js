// ==UserScript==
// @name		WebCat共享空间多账户管理和切换	WebCat Shared Space Multi-account Management and Switching
// @namespace	cnbilinyj-wc
// @run-at		document-end
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
	// 对话框
	let settingsDialogElement = document.createElement("div");
	settingsDialogElement.classList.add("mdui-dialog");
	let authInfos = JSON.parse(localStorage.getItem(localStorage_key.authInfos) || "{}");
	settingsDialogElement.setAttribute("cnbilinyj-webcat-element", "cnbilinyj-WebCat-WCSSMAMaS--settings-dialog");
	// 标题
	settingsDialogElement.appendChild((() => {
		let e = document.createElement("div");
		e.classList.add("mdui-dialog-title");
		e.innerText = "切换账号";
		return e;
	})());
	// 内容
	settingsDialogElement.appendChild((() => {
		let e = document.createElement("div");
		e.classList.add("mdui-dialog-content");
		e.appendChild((() => {
			let e = document.createElement("p");
			e.innerText = "选择账号：";
			return e;
		})());
		e.appendChild((() => {
			let e = document.createElement("select");
			Object.keys(authInfos).forEach(i => {
				e.appendChild((() => {
					let e = document.createElement("option");
					e.innerText = `${i}: ${JSON.parse(authInfos[i]).user.username} (${JSON.parse(authInfos[i]).user.userId})`;
					e.value = i;
					return e;
				})());
			})
			e.appendChild((() => {
				let e = document.createElement("option");
				e.innerText = "退出登录";
				return e;
			})());
			e.example = new mdui.Select(e, {
				"position": "bottom"
			});
			e.example.handleUpdate();
			return e;
		})());
		return e;
	})());
	let accountSettingsDialog = new mdui.Dialog(settingsDialogElement);
	settingsDialogElement.example = accountSettingsDialog;
	if (Array.from(document.body.children).map(i => i.getAttribute("cnbilinyj-webcat-element")).indexOf("cnbilinyj-WebCat-WCSSMAMaS--settings-dialog") === -1) {
		document.body.appendChild(settingsDialogElement);
	}
	// 功能按钮
	let settingsButtonElement = document.createElement("li");
	settingsButtonElement.classList.add("mdui-list-item", "mdui-ripple");
	settingsButtonElement.appendChild((() => {
		let e = document.createElement("i");
		e.classList.add("mdui-list-item-avatar", "mdui-icon", "material-icons", "mdui-color-green-400", "mdui-text-color-white");
		e.innerText = "account_circle";
		return e;
	})());
	settingsButtonElement.appendChild((() => {
		let e = document.createElement("div");
		e.classList.add("mdui-list-item-content");
		e.appendChild((() => {
			let e = document.createElement("div");
			e.classList.add("mdui-list-item-title");
			e.innerText = "切换账号";
			return e;
		})());
		e.appendChild((() => {
			let e = document.createElement("div");
			e.classList.add("mdui-list-item-text");
			e.innerText = "切换账号，刷新生效";
			return e;
		})());
		return e;
	})());
	settingsButtonElement.addEventListener("click", () => {
		let WCSSMAMaSSettingsDialog = document.querySelector("[cnbilinyj-webcat-element=\"cnbilinyj-WebCat-WCSSMAMaS--settings-dialog\"]");
		WCSSMAMaSSettingsDialog.querySelector("select").example.handleUpdate();
		WCSSMAMaSSettingsDialog.example.open();
	});
	settingsButtonElement.setAttribute("cnbilinyj-webcat-element", "cnbilinyj-WebCat-WCSSMAMaS--settings");
	if (Array.from(document.querySelector("#left-drawer > .mdui-list").children).map(i => i.getAttribute("cnbilinyj-webcat-element")).indexOf("cnbilinyj-WebCat-WCSSMAMaS--settings") === -1) {
		document.querySelector("#left-drawer > .mdui-list").appendChild(settingsButtonElement);
	}
}