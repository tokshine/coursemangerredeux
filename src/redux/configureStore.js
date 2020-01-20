// Use CommonJS require below so we can dynamically import during build-time.
//commonjs was popularized by node 
if (process.env.NODE_ENV === "production") {
  module.exports = require("./configureStore.prod");
} else {
  module.exports = require("./configureStore.dev");
}
