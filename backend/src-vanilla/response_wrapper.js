"use strict";

function ResponseWrapperWithLimits(response, initializerObject) {
  this.response = response;
  this.initializerObject = initializerObject;
  this.initializerObject.numberRequestsRunning ++;
}

ResponseWrapperWithLimits.prototype.end = function(input) {
  this.response.end(input);
  this.initializerObject.numberRequestsRunning --;
}

ResponseWrapperWithLimits.prototype.writeHead = function(input) {
  this.response.writeHead(input);
}

module.exports = {
  ResponseWrapperWithLimits,
}