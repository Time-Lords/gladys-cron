'use strict';

module.exports = {
  attributes: {
    name: {
      type : 'string',
      required : true,
      unique: true
    },
    second: {
      type : 'string',
      defaultsTo : '*'
    },
    minute : {
      type : 'string',
      defaultsTo : '*'
    },
    hour : {
      type : 'string',
      defaultsTo : '*'
    },
    dayOfMonth : {
      type : 'string',
      defaultsTo : '*'
    },
    month : {
      type : 'string',
      defaultsTo : '*'
    },
    dayOfWeek : {
      type : 'string',
      defaultsTo : '*'
    },
    user:{
      model: 'User',
      required:true
    }
  }
};
