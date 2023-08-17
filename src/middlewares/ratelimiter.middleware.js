const rateLimit = require("express-rate-limit");

const generalLimiter = rateLimit({
  windowMs: (process.env.RATE_LIMIT_SECOND || 1) * 1000, // default 1 second
  max: process.env.RATE_LIMIT_MAX || 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false // Disable the `X-RateLimit-*` headers
});

const apiLimiter = rateLimit({
  windowMs: (process.env.API_RATE_LIMIT_SECOND || 60) * 1000, // default 1 minutes
  max: process.env.API_RATE_LIMIT_MAX || 10000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false // Disable the `X-RateLimit-*` headers
});

module.exports.apiLimiter = apiLimiter;
module.exports.generalLimiter = generalLimiter;
