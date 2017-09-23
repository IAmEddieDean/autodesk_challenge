/**
 * @file node/lib/connect_redis.js
 * @author Christopher Oyler <christopher.oyler@gmail.com>
 * @date 9/23/2017
 * @desc segregation of connection management for redis
 */

'use strict';
const redis = require('redis').createClient({host: 'redis'});

module.exports = redis;
