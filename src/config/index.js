const configs = require("./config.js");

const env = process.env.NODE_ENV || "production";
const config = { ...configs[env], env };

module.exports = config;
