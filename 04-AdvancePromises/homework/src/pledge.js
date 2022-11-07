"use strict";
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/

function $Promise (executor) {
if (typeof executor !== "function") {
  throw new TypeError ("executor is not a function")
}
this._state = "pending";

this._handlerGroups = [];

executor (this._internalResolve.bind(this), 
this._internalReject.bind(this));
}

$Promise.prototype._internalResolve = function (value) {
if (this._state === "pending") {
  this._state = "fulfilled";
  this._value = value;
  this._callHandlers();
    }
};

$Promise.prototype._internalReject = function (value) {
  if (this._state === "pending") {
    this._state = "rejected";
    this._value = value;
    this._callHandlers();
  }
};

$Promise.prototype.then = function (successCb, errorCb) {
  if(typeof successCb !== "function") successCb = false;
  if(typeof errorCb !== "function") errorCb = false;
  const downstreamPromise = new $Promise (function () {})
this._handlerGroups.push ({successCb, errorCb, downstreamPromise});
if(this._state !== "pending") this._callHandlers();
return downstreamPromise;
}

$Promise.prototype.callHandlers = function () {
while (this._handlerGroups.length > 0) {
let current = this._handlerGroups.shift();
if (this._state === "fulfilled") {
  if(!current.successCb) {
    current.downstreamPromise._internalResolve (this._value);
  } else {
    try {
    const result = current.successCb (this._value)
if (result instanceof $Promise) {
result.then (value => current.downstreamPromise._internalResolve(value),
err => current.downstreamPromise._internalReject (err));
} else {
current.downstreamPromise._internalResolve (result)
}
}
catch (e) {
current.downstreamPromise._internalReject (e)
}
  }
  //current.successCb && current.successCb (this._value)

} else if (this._state === "rejected") {
//current.errorCb && current.errorCb (this._value)
if(!current.errorCb) {
  current.downstreamPromise._internalReject (this._value);
} else {
  try {
  const result = current.errorCb (this._value)
if (result instanceof $Promise) {
result.then (value => current.downstreamPromise._internalResolve(value),
err => current.downstreamPromise._internalReject (err));
} else {
current.downstreamPromise._internalResolve (result)
}
}
catch (e) {
current.downstreamPromise._internalReject (e)
}
}
}
}
};

$Promise.prototype.catch = function (errorCb)  {
  return this.then (null, errorCb)
}




module.exports = $Promise