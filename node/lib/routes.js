/**
 * @file node/lib/routes.js
 * @author Christopher Oyler <christopher.oyler@gmail.com>
 * @date 9/23/2017
 * @desc routes and business logic for node backend
 */

'use strict';

const router = require('express').Router();
const request = require('request');
const is = require('is2');
const redis = require('./connect_redis');
const utils = require('./utils')


router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Autodesk Challenge',
  });
});

router.get('/index', (req, res, next) => {
  redis.keys('search:*', (err, keys) => {
    if (err) return next(err);
    if (!is.nonEmptyArr(keys)) return res.json([]);

    redis.mget(keys, (err, recs) => {
      if (err) return next(err);
      if (!recs || recs[0] === null) return res.json([])

      recs = recs.map(r => utils.safeParse(r));
      res.json(recs);
    });
  });
});

router.post('/search', (req, res, next) => {
  if (!is.nonEmptyStr(req.body.sequence)) {
    const err = new Error('No sequence data passed to request.');
    err.status = 400;
    return next(err);
  }
  const opts = {
    // url: 'http://localhost:5000/',
    url: 'http://python:5000/',
    method: 'POST',
    json: req.body
  }
  request(opts, (err, resp, body) => {
    if (err) return next(err);
    if (resp.statusCode === 400) {
      const err = new Error('No match was found');
      err.status = 400;
      return next(err);
    }

    const key = `search:${Date.now()}`;
    const str = utils.safeString(body);
    if (str) {
      redis.set(key, str, (err) => {
        if (err) return next(err);
        return res.status(205).json({ ok: true });
      });
    } else {
      const err = new Error('There was an issue saving your data');
      err.status = 500;
      return next(err);
    }
  });
});

module.exports = router;
