'use strict';

function safeString(obj) {
  let str;
  try {
    str = JSON.stringify(obj);
  } catch (e) {
    return false;
  }
  return str;
}

function safeParse(str) {
  let obj;
  try {
    obj = JSON.parse(str);
  } catch (e) {
    return false;
  }
  return obj;
}

function errHandler(err, req, res, next){
  console.error(err);
  res.status(err.status || 500).json(err.message);
}


module.exports = {
  safeParse: safeParse,
  safeString: safeString,
  errHandler: errHandler
}
