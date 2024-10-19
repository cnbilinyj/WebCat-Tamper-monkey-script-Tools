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
	let accountSettingsDialog;
	let authInfos = JSON.parse(localStorage.getItem(localStorage_key.authInfos));
	let e = document.body;
	if(Array.from(e.children).map(i => {
		return i.getAttribute("cnbilinyj-webcat-element");
	}).indexOf("account-settings-dialog") === -1){
		let settingsDialogElement = document.createElement("div");
		accountSettingsDialog = new mdui.Dialog(settingsDialogElement);
		settingsDialogElement.setAttribute("cnbilinyj-webcat-element", "account-settings-dialog");
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
				e.example = new mdui.Select(e, {position: 'bottom'});
				e.setAttribute("mdui-select", "{position: 'bottom'}");
				e.classList.add("mdui-select");
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
				e.example.handleUpdate();
				e.example.$element[0].example = e.example;
				console.log(e);
				return e.example.$element[0];
			})());
			e.appendChild((() => {
				let e = document.createElement("div");
				e.classList.add("mdui-dialog-actions", "mdui-dialog-actions-stacked");
				e.appendChild((() => {
					let e = document.createElement("button");
					e.classList.add("mdui-btn", "mdui-ripple");
					e.appendChild(document.createTextNode("确认"));
					e.addEventListener("click", event => {
						let us = accountSettingsDialog.$element[0].children[1].children[1].example.$native.value;
						if (us != ""){
							localStorage.setItem("authInfo", authInfos[us]);
						} else {
							localStorage.removeItem("authInfo");
						}
						accountSettingsDialog.close();
					});
					return e;
				})());
				e.appendChild((() => {
					let e = document.createElement("button");
					e.classList.add("mdui-btn", "mdui-ripple");
					e.appendChild(document.createTextNode("取消"));
					e.addEventListener("click", event => {
						accountSettingsDialog.close();
					});
					return e;
				})());
				e.appendChild((() => {
					let e = document.createElement("button");
					e.classList.add("mdui-btn", "mdui-ripple");
					e.appendChild(document.createTextNode("记录当前登录账号"));
					e.addEventListener("click", event => {
						accountSettingsDialog.close();
						if(localStorage.getItem("authInfo")){
							mdui.prompt("请输入账号标签", null, (text, example) => {
								if (text === ""){
									mdui.alert("账号标签不能为空", null, dialog.open);
								} else {
									if(Object.keys(authInfos).indexOf(text) != -1){
										mdui.confirm("已有重复的账号标签，是否覆盖？", "账号标签冲突", (confirm_dialog) => {
											dialog.destroy();
											authInfos[text] = localStorage.getItem("authInfo");
											localStorage.setItem(localStorage_key.authInfos, JSON.stringify(authInfos));
										});
									} else {
										authInfos[text] = localStorage.getItem("authInfo");
										localStorage.setItem(localStorage_key.authInfos, JSON.stringify(authInfos));
									}
								}
							});
						} else {
							mdui.alert("未登录，无法记录账号数据", "未登录");
						}
						accountSettingsDialog.open();
					});
					return e;
				})());
				e.appendChild((() => {
					let e = document.createElement("button");
					e.classList.add("mdui-btn", "mdui-ripple");
					e.appendChild(document.createTextNode("删除当前选中账号"));
					e.addEventListener("click", event => {
						let select_element = accountSettingsDialog.$element[0].children[1].children[1].example.$native;
						let us = select_element.value;
						if (us != ""){
							Reflect.deleteProperty(authInfos, us);
							Array.from(select_element.children).forEach((i) => {
								i.remove();
							});
							Object.keys(authInfos).forEach(item => {
								let option = document.createElement("option");
								option.setAttribute("value", item);
								option.innerText = `${item}: ${JSON.parse(authInfos[item]).user.username} (${JSON.parse(authInfos[item]).user.userId})`;
								select_element.appendChild(option);
							});
							select_element.appendChild((() => {
								let option = document.createElement("option");
								option.setAttribute("value", "");
								option.innerText = `退出登录`;
								return option;
							})());
							accountSettingsDialog.$element[0].children[1].children[1].example.handleUpdate();
							localStorage.setItem(localStorage_key.authInfos, JSON.stringify(authInfos));
						} else {
							accountSettingsDialog.close();
							mdui.alert("请选择正确的账号！", "选择错误", () => {
								accountSettingsDialog.open();
							});
						}
					});
					return e;
				})());
				e.appendChild((() => {
					let e = document.createElement("button");
					e.classList.add("mdui-btn", "mdui-ripple");
					e.appendChild(document.createTextNode("记录其他账号"));
					e.addEventListener("click", event => {
						accountSettingsDialog.close();
						let add_data = function (auth_data_index) {
							mdui.prompt("请输入账号内容", null, (account_data, example) => {
								if (account_data === ""){
									mdui.alert("账号内容不能为空", null, accountSettingsDialog.open);
								} else {
									authInfos[auth_data_index] = account_data;
									localStorage.setItem(localStorage_key.authInfos, JSON.stringify(authInfos));
								}
							});
						};
						mdui.prompt("请输入账号标签", null, (auth_data_index, example) => {
							if (auth_data_index === ""){
								mdui.alert("账号标签不能为空", null, accountSettingsDialog.open);
							} else {
								if(Object.keys(authInfos).indexOf(auth_data_index) != -1){
									mdui.confirm("已有重复的账号标签，是否覆盖？", "账号标签冲突", (confirm_dialog) => {
										add_data(auth_data_index);
									});
								} else {
									add_data(auth_data_index);
								}
							}
						});
						accountSettingsDialog.open();
					});
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
		settingsElement.addEventListener("click", () => {
			let accountsSelector = accountSettingsDialog.$element[0].children[1].children[1].example.$native;
			Array.from(accountsSelector.children).forEach((i, n, a) => {
				i.remove();
			});
			authInfos = JSON.parse(localStorage.getItem(localStorage_key.authInfos));
			Object.keys(authInfos).forEach(item => {
				accountsSelector.appendChild((() => {
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
			accountSettingsDialog.open();
			console.log(accountSettingsDialog);
		});
		e.appendChild(settingsElement);
	}
	mdui.mutation();
}
