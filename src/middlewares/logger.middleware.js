const logger = require("../utils/logger.util");
const routerMiddleware = (req, res, next) => {
    logger.info(req.originalUrl);
    next();
};

module.exports = routerMiddleware;