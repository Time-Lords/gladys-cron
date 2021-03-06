'use strict';

/**
 * Check if the user have rights for the rule
 * @method haveRights
 * @param userId
 * @param ruleId
 * @param callback
 */
var haveRights = function(userId, ruleId, callback){
	CronRule.findOne({user: userId, id: ruleId}, function(err, rule){
		if(!rule.id)return callback('userNotAllowed');

		callback();
	});
};


module.exports = {

	/**
	 * @method index
	 * @param req
	 * @param res
	 * @param next
	 */
	index : function(req, res, next){
		CronRule.find({user: req.session.User.id}, function(err, rules){
			if(err) return res.json(400, err);

			return res.json(rules);
		});
	},

	/**
	 * @method add
	 * @param req
	 * @param res
	 * @param next
	 */
	add : function(req, res, next){
		var rule = {
			user : req.session.User.id,
			name: req.param('name'),
			second: req.param('second'),
			minute: req.param('minute'),
			hour: req.param('hour'),
			dayOfMonth: req.param('dayOfMonth'),
			month: req.param('month'),
			dayOfWeek: req.param('dayOfWeek')
		};

		CronRule.create(rule, function(err, rule){
			if(err)return res.json(400, err);

			CronService.start(rule.id, function(err){
				if(err)return res.json(400, err);

				return res.json(rule);
			});
		});
	},

	/**
	 * @method update
	 * @param req
	 * @param res
	 * @param next
	 */
	update : function(req, res, next){
		var rule = {
			name: req.param('name'),
			second: req.param('second'),
			minute: req.param('minute'),
			hour: req.param('hour'),
			dayOfMonth: req.param('dayOfMonth'),
			month: req.param('month'),
			dayOfWeek: req.param('dayOfWeek')
		};
		haveRights(req.session.User.id, req.param('id'), function(err){
			if(err)return res.json(400, err);

			CronRule.update({id: req.param('id')}, rule, function(err, rules){
				if(err)return res.json(400, err);

				var rule = rules[0];
				CronService.destroy(rule.id, function(err){
					if(err)return res.json(400, err);

					CronService.start(rule.id, function(err){
						if(err)return res.json(400, err);

						return res.json(rule);
					});
				});
			});
		});
	},

	/**
	 * @method destroy
	 * @param req
	 * @param req
	 * @param next
	 */
	destroy : function(req, res, next){
		haveRights(req.session.User.id, req.param('id'), function(err){
			if(err)return res.json(400, err);
			
			CronRule.destroy(req.param('id'), function(err, rules){
				if(err)return res.json(400, err);

				var rule = rules[0];
				CronService.destroy(rule.id, function(err){
					if(err)return res.json(400, err);

					return res.json(rule);
				});
			});
		});
	}
};