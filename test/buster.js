var module
  , config = module.exports;

config["tests"] = {
  "environment": "browser" // or "node"
  , "rootPath": "../"
  , "sources": [ // Paths are relative to config file
    "build/ip.dev.js"
  ]
  , "tests": [
    "test/ip-test.js"
  ]
};
