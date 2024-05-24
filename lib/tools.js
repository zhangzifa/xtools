'use strict';

const https = require('https');

const rangeCheck = function(number, min, max) {
  if (number < min) {
    return false;
  }

  if (number > max) {
    return false;
  }

  return true;
}

const validateIP = function(ip) {
  if (!ip) {
    return false;
  }
  if (typeof ip !== 'string') {
    return false;
  }

  if (ip.length < 7) {
    return false;
  }

  let ips = ip.split('.');
  if (ips.length !== 4) {
    return false;
  }
  if (!rangeCheck(Number(ips[0]), 0, 223)) {
    return false
  }
  if (!rangeCheck(Number(ips[1]), 0, 255)) {
    return false;
  }
  if (!rangeCheck(Number(ips[2]), 0, 255)) {
    return false;
  }
  if (!rangeCheck(Number(ips[3]), 0, 255)) {
    return false;
  }
  return true;
}


function asyncSleepMs(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function asyncHttpsRequest(opts) {
  return new Promise((resolve, reject) => {

    const option = {
      hostname: opts.host,
      path: opts.path,
      port: opts.port,
      method: opts.method,
      headers: opts.headers,
    };

    if (opts.logger && (typeof opts.logger === 'function')) {
      logger('https request options:', option, 'with data:', opts.data);
    }

    let req = https.request(option, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve(data);
      });

      res.on('error', (err) => {
        reject(err);
      });
    });

    req.on('error', (e) => {
      if (opts.logger && (typeof opts.logger === 'function')) {
        logger(`请求遇到问题: ${e.message}`);
      }
    });

    req.write(JSON.stringify(opts.data));
    if (option.method === 'POST') {
      // if method is POST, req.end is a must.
      req.end();
    }
  });
}


exports.validateIP = validateIP;
exports.asyncSleepMs = asyncSleepMs;
exports.asyncHttpsRequest = asyncHttpsRequest;
