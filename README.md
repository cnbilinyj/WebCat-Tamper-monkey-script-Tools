<style>
	.markdown-body blockquote {
		border-left: 0.25em solid #0366d6;
	}

	.markdown-alert-title, .markdown-alert-title * {
		color: #0366d6;
		fill: #0366d6;
	}
</style>

# WebCat-Tamper-monkey-script-Tools

（懒得翻译了，我寻思着应该不会有哪个老外会用咱们国内的WebCat共享空间吧）

# WebCat篡改猴工具

## WebCat共享空间项目直链获取与下载

事实上我没有办法通过其他任何前端方案获取，因为如果想要获取的话，那必须得要使用鉴权token，但是我并没有能够无限下载项目的token，所以只能说使用自动更新的油猴脚本（官方的名称叫**篡改猴**）在后续更新出下载逻辑重写功能

篡改猴脚本和关于这些直链的信息都在这个存储库中，因此自动更新功能的话是通过简短的动态执行网络脚本的方案获取到这个存储库里面的脚本，而获取直链信息也是同样在这个存储库里面获取

为了在节省请求次数和请求消耗（每次获取数据所造成的总流量消耗）之间取得平衡，我选择的方案是进行三次请求。第一次是万级，第二次是百千级，第三次是个十级。第一次和第二次是直链数据存在性，最后一次请求是获取直链。最后一次请求最多只能获取到100条直链。

比如项目ID是45123，则第一次会请求万级项目ID存在性，得到结果后解析数组下标为4的数组元素是否为true，如果为true则意味着至少有一个项目的ID处于从40000\~49999的区间内（包含40000和49999，下述同理，不再赘述）将会发起第二次请求，否则不再进行下一步操作（下述同理，不再赘述）。第二次请求会请求4万区间的百千级项目ID存在性，得到结果后解析数组下标为51的数组元素是否为true，如果为true，则意味着至少有一个项目的项目ID处于45100\~45199的区间内，将会发起第三次请求。第三次请求会请求45100的个十级项目直链信息，得到结果后解析数组下标为23的数组元素是否不为false，如果不为false，则它一定是一个url字符串，这个字符串就是项目的下载直链，而后会将这个链接设定为下载按钮的跳转链接，设定原理为重写下载按钮。

原版下载按钮背景色为粉色。当篡改猴脚本成功执行到此处时，下载按钮背景色将被设置为蓝色，否则意味着篡改猴脚本未能成功执行到此处

如果下载按钮背景色被设置为绿色，则意味着当前项目ID所对应的下载直链记录在本存储库中，且已成功获取。否则意味着当前项目ID所对应的下载直链并未记录在本存储库中，亦将不进行下一步操作。

后续会增加无论如何都重写下载按钮的功能，如果没能从存储库中获取到下载直链，且篡改猴脚本使用者同意分享获取到的下载直链，则使用重写后的下载函数获取下载直链，并公开至本存储库

### 更新日志

1. **2024-10-18** `v1.0.0`：

	开始记录
	
	无论如何都重写下载按钮，如果没能从存储库中获取到下载直链，且篡改猴脚本用户同意分享获取到的下载直链，则使用重写后的下载函数获取下载直链，并公开至本存储库
> <p class="markdown-alert-title" dir="auto" style="color: #0366d6"><svg class="octicon octicon-info mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" fill="#0366d6"></path></svg>Note</p>
> 功能异常，后续修复

## WebCat共享空间多账户管理和切换

### 脚本功能

**多账户管理**：用户可以在脚本中存储多个WebCat空间账户的登录信息。
**快速切换**：通过下拉菜单，用户可以在已存储的账户之间快速切换。
**直观显示**：每个账户的用户名和用户ID将在下拉菜单中显示，方便用户识别。
**退出登录**：用户可以选择退出当前登录的账户。

---

- 你可以在脚本中添加账户信息。
- 点击左侧抽屉菜单中的“切换账号”选项。
- 在弹出的对话框中，选择你要切换到的账户。
- 点击“确认”按钮，脚本将自动更新登录信息，以切换至当前选中的账户。
- 刷新页面，使更改生效。
- 在账户切换对话框中，选择“退出登录”选项，器会在账号列表的最后一项。
- 刷新页面，以清除当前登录状态。

### 关于测试版

测试版版本：v2.0.0

1. 重构对话框结构
2. 正在重新添加功能
3. 目前只有基础的切换账户功能，包括记录功能均未重加入

### 更新日志

[到达日志底部](#2024-10-18_v2.0.0_beta)

1. **2024-10-18** `v1.0.0`：

	开始记录

	基础功能

	<div id="2024-10-18_v2.0.0_beta"></div>
2. **2024-10-18** `v2.0.0` `beta`：

	重构对话框结构

# 联系作者

- 邮箱：[wjrbilibilinyj@163.com](mailto:wjrbilibilinyj@163.com)
- GitHub用户名：[cnbilinyj](https://github.com/cnbilinyj)
