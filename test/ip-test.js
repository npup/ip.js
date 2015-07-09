/* linter, global declarations: */

var assert = buster.assert;

buster.testCase("setup", {
	"module exists": function () {
		assert.isObject(ip);
	}
	, "module API": function () {
		assert.isFunction(ip.create);
	}
});


buster.testCase("usage", {
  "setUp": function () {
      this.timeout = 2000; // raise busterjs async timeout
    }
  , "instantiation": function () {
      var o = ip.create();
      assert.isObject(o, "Instance should be an object");
    }
  , "instance properties": function () {
      var o = ip.create();
      assert.isFunction(o.start, "Instance should have a start method");
      assert.isFunction(o.stop, "Instance should have a stop method");
      assert.isFunction(o.pause, "Instance should have a pause method");
      assert.isFunction(o.resume, "Instance should have a resume method");
      assert.isFunction(o.getAllDataPoints, "Instance should have a getAllDataPoints method");
      assert.isFunction(o.getPercentDataPoints, "Instance should have a getPercentDataPoints method");
    }
  , "running interpolation": function (done) {
      var arr = []
        , min = 0, max = 100, duration = 1000
        , now = +new Date;
      ip.create(min, max, {
        "duration": duration
        , "update": function (value) {
            arr.push(value);
          }
        , "end": done(function () {
            assert.near((+new Date - now), duration, 50, "Effective duration should be around");
            assert.equals(arr[0], min);
            assert.equals(arr[arr.length-1], max);
          })
      }).start();
    }
  , "checking data points": function () {
      var percentagePoints = ip.create(0, 100, {"duration": 100}).getPercentDataPoints();
      assert.equals(percentagePoints.length, 101, "percentage data points should have length 101");
      assert.equals(percentagePoints[0], 0, "first percentage data point should be 0");
      assert.equals(percentagePoints[percentagePoints.length-1], 100, "last percentage point should be 100");

      var ipObj = ip.create(100, 500, {"duration": 1000})
        , allPoints = ipObj.getAllDataPoints();
      assert.equals(allPoints.length, ipObj.options.duration, "\"all data points\" should have length 1000");
      assert.equals(allPoints[0], 100, "first of \"all data points\" point should be 100");
      assert.equals(allPoints[allPoints.length-1], 500, "last of \"all data points\" should be 500");
    }
});
