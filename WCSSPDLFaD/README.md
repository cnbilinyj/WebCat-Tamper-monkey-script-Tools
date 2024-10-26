# WebCat_Shared_Space_Publicizes_Project_Direct_Chain

WebCat Shared Space Publicizes Project Direct Chain

（懒得翻译了，我寻思着应该不会有哪个老外会用咱们国内的WebCat共享空间吧）

# WebCat共享空间项目直链获取与下载

事实上我没有办法通过其他任何前端方案获取，因为如果想要获取的话，那必须得要使用鉴权token，但是我并没有能够无限下载项目的token，所以只能说使用自动更新的油猴脚本（官方的名称叫**篡改猴**）在后续更新出下载逻辑重写功能

篡改猴脚本和关于这些直链的信息都在这个存储库中，因此自动更新功能的话是通过简短的动态执行网络脚本的方案获取到这个存储库里面的脚本，而获取直链信息也是同样在这个存储库里面获取

为了在节省请求次数和请求消耗（每次获取数据所造成的总流量消耗）之间取得平衡，我选择的方案是进行三次请求。第一次是万级，第二次是百千级，第三次是个十级。第一次和第二次是直链数据存在性，最后一次请求是获取直链。最后一次请求最多只能获取到100条直链。

比如项目ID是45123，则第一次会请求万级项目ID存在性，得到结果后解析数组下标为4的数组元素是否为true，如果为true则意味着至少有一个项目的ID处于从40000\~49999的区间内（包含40000和49999，下述同理，不再赘述）将会发起第二次请求，否则不再进行下一步操作（下述同理，不再赘述）。第二次请求会请求4万区间的百千级项目ID存在性，得到结果后解析数组下标为51的数组元素是否为true，如果为true，则意味着至少有一个项目的项目ID处于45100\~45199的区间内，将会发起第三次请求。第三次请求会请求45100的个十级项目直链信息，得到结果后解析数组下标为23的数组元素是否不为false，如果不为false，则它一定是一个url字符串，这个字符串就是项目的下载直链，而后会将这个链接设定为下载按钮的跳转链接，设定原理为重写下载按钮，原版下载按钮背景色为粉色如果篡改后脚本成功执行到此处下载按钮背景色将被设置为蓝色，否则意味着当前项目ID所对应的下载直链并未记录在本存储库中，亦将不进行下一步操作

后续我会增加无论如何都重写下载按钮的功能，如果没能从存储库中获取到下载直链，且篡改猴脚本使用者同意分享获取到的下载直链，则使用重写后的下载函数获取下载直链，并公开至本存储库