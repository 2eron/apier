# apier
为其它开发项目提供模拟数据的API服务器

# 用法
在app/routes文件夹下添加接口路由定义文件，一个项目对应一个路由文件，每个文件返回http方法及接口地址定义。

# 示例
```javascript
var Mock = require('mockjs');
module.exports = {
	get: {
		'/list': function(req, res){
			var data = Mock.mock({
				'list|1-10': [{
					'id|+1': 1,
					'name|1-5': 'zeron'
				}]
			});
			res.json(data);
		},
        '/prods': function(req, res){
            res.json({});
        }
	}
}
```
