
if (process.env.NODE_ENV === "production") {
  module.exports = require("./iconfont-es.prod");
} else {
  module.exports = require("./iconfont-es.dev");
}
