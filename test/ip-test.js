var buster = require("buster");
var assert = buster.assert;
var ip = require("../build/ip.js").ip;

buster.testCase("setup", {
	"module exists": function () {
		assert.isObject(ip);
	}
	, "module API": function () {
		assert.isFunction(ip.create);
	}
});