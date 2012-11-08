var module
  , config = module.exports;

config["tests"] = {
  env: "browser" // or "node"
  , "rootPath": "../"
  , "sources": [ // Paths are relative to config file
    "src/ip.js"
  ]
  , "tests": [
    "test/ip-test.js"
  ]
};
