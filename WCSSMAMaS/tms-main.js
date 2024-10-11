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
	let e = document.getElementById("left-drawer").getElementsByClassName("mdui-list")[0];
	if(Array.from(e.children).map(i => {
		return i.getAttribute("cnbilinyj-webcat-element");
	}).indexOf("account") === -1){
		e.appendChild((() => {
			let item = document.createElement("li");
			item.innerHTML = `	<i class="mdui-list-item-avatar mdui-icon material-icons mdui-color-orange-400 mdui-text-color-white">account_circle</i>\n	<div class="mdui-list-item-content">\n		<div class="mdui-list-item-title">切换账号</div>\n		<div class="mdui-list-item-text">切换账号，刷新生效</div>\n	</div>`;
			item.classList.add("mdui-list-item", "mdui-ripple");
			item.setAttribute("cnbilinyj-webcat-element", "account");
			item.addEventListener("click", event => {
				let authInfos = JSON.parse(localStorage.getItem("authInfos") || "{}");
				let dialog = mdui.dialog({
					"title": "切换账号",
					"content": `<p>选择账号：</p>
					<select mdui-select>
						` +
					(() => {
						let options = "";
						Object.keys(authInfos).forEach(item => {
							options += `<option value="${item}">${item}: ${JSON.parse(authInfos[item]).user.username} (${JSON.parse(authInfos[item]).user.userId})</option>`;
						});
						options += `<option value="">退出登录</option>`;
						return options;
					})()
					+ `
					</select><br /><br /><br /><br /><br />`,
					"destroyOnClosed": false,
					"stackedButtons": true,
					"buttons": [
						{
							"text": "删除当前选中账号",
							"close": false,
							"onClick": function(dialog){
								let select_element = dialog.$element[0].children[1].children[1];
								let us = select_element.value;
								if (us != ""){
									Reflect.deleteProperty(authInfos, us);
									select_element.innerHTML = "";
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
									dialog.$element[0].children[1].children[1].example.handleUpdate();
									localStorage.setItem("authInfos", JSON.stringify(authInfos));
								}else{
									dialog.close();
									mdui.alert("请选择正确的账号！", "选择错误", () => {
										dialog.open();
									});
								}
							}
						},
						{
							"text": "记录当前登录账号",
							"onClick": function(dialog){
								dialog.close();
								if(localStorage.getItem("authInfo")){
									mdui.prompt("请输入账号标签", null, (text, example) => {
										if (text === ""){
											mdui.alert("账号标签不能为空", null, dialog.open);
										}else{
											if(Object.keys(authInfos).indexOf(text) != -1){
												mdui.confirm("已有重复的账号标签，是否覆盖？", "账号标签冲突", (confirm_dialog) => {
													dialog.destroy();
													authInfos[text] = localStorage.getItem("authInfo");
													localStorage.setItem("authInfos", JSON.stringify(authInfos));
												});
											}else{
												authInfos[text] = localStorage.getItem("authInfo");
												localStorage.setItem("authInfos", JSON.stringify(authInfos));
											}
										}
									});
								}else{
									mdui.alert("未登录，无法记录账号数据", "未登录");
								}
								dialog.open();
							}
						},
						{
							"text": "记录其他账号",
							"onClick": function(dialog){
								dialog.close();
								let add_data = function (auth_data_index) {
									mdui.prompt("请输入账号内容", null, (account_data, example) => {
										if (account_data === ""){
											mdui.alert("账号内容不能为空", null, dialog.open);
										}else{
											authInfos[auth_data_index] = account_data;
											localStorage.setItem("authInfos", JSON.stringify(authInfos));
										}
									});
								};
								mdui.prompt("请输入账号标签", null, (auth_data_index, example) => {
									if (auth_data_index === ""){
										mdui.alert("账号标签不能为空", null, dialog.open);
									}else{
										if(Object.keys(authInfos).indexOf(auth_data_index) != -1){
											mdui.confirm("已有重复的账号标签，是否覆盖？", "账号标签冲突", (confirm_dialog) => {
												dialog.destroy();
												add_data(auth_data_index);
											});
										}else{
											add_data(auth_data_index);
										}
									}
								});
								dialog.open();
							}
						},
						{
							"text": "获取当前登录账号数据",
							"onClick": function(dialog){
								dialog.close();
								if(!!localStorage.getItem("authInfo")){
									mdui.prompt("", "账号数据", function (text, auth_data_dialog) {
										(function (content) {
											let copy = (e) => {
												e.preventDefault();
												e.clipboardData.setData('text/plain', content);
												document.removeEventListener('copy', copy);
											}
											document.addEventListener('copy', copy);
											document.execCommand("Copy");
										})(localStorage.getItem("authInfo"));
										dialog.open();
									}, function (text, auth_data_dialog) {
										auth_data_dialog.destroy();
										dialog.open();
									}, {
										"confirmText": "复制",
										"cancelText": "返回",
										// "defaultValue": localStorage.getItem("authInfo")
										"defaultValue": (function(input, to16) {
											var result = "";
											for (var i = 0; i < input.length; i++) {
												result += "&#" + function(){if(to16){return "x";}else{return "";}}() + input.charCodeAt(i).toString(function(){if(to16){return 16;}else{return 10;}}()) + ";";
											}
											return result;
										})(localStorage.getItem("authInfo"))
									});
									// auth_data_dialog.$element[0].children[1].children[0].children[0].value = localStorage.getItem("authInfo");
								}else{
									mdui.alert("未登录，无法获取账号数据", "未登录");
								}
								dialog.open();
							},
							"close": false
						},
						{
							"text": "数据导出",
							"onClick": function(dialog){
								dialog.close();
								mdui.prompt("", "数据导出", function (text, auth_data_dialog) {
									(function (content) {
										let copy = (e) => {
											e.preventDefault();
											e.clipboardData.setData('text/plain', content);
											document.removeEventListener('copy', copy);
										}
										document.addEventListener('copy', copy);
										document.execCommand("Copy");
									})(localStorage.getItem("authInfos"));
									dialog.open();
								}, function (text, auth_data_dialog) {
									auth_data_dialog.destroy();
									dialog.open();
								}, {
									"confirmText": "复制",
									"cancelText": "返回",
									"defaultValue": (function(input, to16) {
										var result = "";
										for (var i = 0; i < input.length; i++) {
											result += "&#" + function(){if(to16){return "x";}else{return "";}}() + input.charCodeAt(i).toString(function(){if(to16){return 16;}else{return 10;}}()) + ";";
										}
										return result;
									})(localStorage.getItem("authInfos"))
								});
								dialog.open();
							},
							"close": false
						},
						{
							"text": "数据导入",
							"onClick": function(dialog){
								dialog.close();
								let import_data = function () {
									mdui.prompt("请输入数据字符串<br />导入数据会覆盖旧数据！！！<br />导入数据会覆盖旧数据！！！", null, (account_data, example) => {
										if (account_data === ""){
											mdui.alert("数据不能为空", null, dialog.open);
											import_data();
										}else{
											try{
												if (!(typeof JSON.parse(account_data) === "object")){
													alert("数据格式错误\n不是JSON");
												}else{
													authInfos = account_data;
													localStorage.setItem("authInfos", authInfos);
												}
											}catch(e){
												alert(`数据格式错误
${e}`);
												import_data();
											}
										}
									});
								}
								import_data();
								dialog.open();
							}
						},
						{
							"text": "取消",
							"onClick": dialog => dialog.destroy()
						},
						{
							"text": "确认",
							"onClick": function(dialog){
								let us = dialog.$element[0].children[1].children[1].value;
								if (us != ""){
									localStorage.setItem("authInfo", authInfos[us]);
								}else{
									localStorage.removeItem("authInfo");
								}
								dialog.destroy();
							}
						}
					]
				});
				dialog.$element[0].children[2].style.height = "160px";
				dialog.$element[0].children[2].style.overflowY = "auto";
				let select_element = dialog.$element[0].children[1].children[1];
				select_element.example = new mdui.Select(dialog.$element[0].children[1].children[1], {
					"position": "bottom"
				});
				select_element.addEventListener("opened.mdui.select", s => {
					dialog.handleUpdate();
				});
				dialog.handleUpdate();
			});
			return item;
		})());
	}
}
