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