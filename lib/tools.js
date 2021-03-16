'use strict';

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

exports.validateIP = validateIP;


